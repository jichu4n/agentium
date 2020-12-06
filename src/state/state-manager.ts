import _ from 'lodash';
import {
  action,
  computed,
  IObservableArray,
  makeObservable,
  observable,
  reaction,
  runInAction,
  toJS,
} from 'mobx';
import UaSpec from 'src/lib/ua-spec';
import {v4 as uuidv4} from 'uuid';
import {browser} from 'webextension-polyfill-ts';
import BrowserStorage from './browser-storage';
import DEFAULT_UA_SPEC_LIST from './default-ua-spec-list';

// Deprecated - index-based storage scheme, no IDs.
const V1_UA_SPEC_LIST = 'v1/uaSpecList';
const V1_SELECTED_UA_SPEC_IDX = 'v1/selectedUaSpecIdx';

// Current - ID-based storage scheme.
const V2_UA_SPEC_LIST = 'v2/uaSpecList';
const V2_SELECTED_UA_SPEC_ID = 'v2/selectedUaSpecId';

const IS_ENABLED = 'v1/isEnabled';
const STORAGE_KEYS = {
  sync: [
    V1_UA_SPEC_LIST,
    V1_SELECTED_UA_SPEC_IDX,
    V2_UA_SPEC_LIST,
    V2_SELECTED_UA_SPEC_ID,
  ],
  local: [IS_ENABLED],
};
const DEFAULT_UA_SPEC_LIST_STRING = JSON.stringify(DEFAULT_UA_SPEC_LIST);

class StateManager {
  @observable
  public uaSpecList: IObservableArray<UaSpec> = observable([]);
  @observable
  public selectedUaSpecId: string | null = null;
  @observable
  public isEnabled = false;

  @action
  public toggleEnabled() {
    if (!this.isEnabled && this.selectedUaSpec == null) {
      return;
    }
    this.isEnabled = !this.isEnabled;
  }

  @action
  public setSelectedUaSpecId(id: string) {
    if (_.has(this.uaSpecListById, id)) {
      this.selectedUaSpecId = id;
    }
  }

  @computed
  public get selectedUaSpec() {
    if (this.selectedUaSpecId === null) {
      return null;
    }
    return this.uaSpecListById[this.selectedUaSpecId] ?? null;
  }

  public getUaSpec(id: string): UaSpec | null {
    return this.uaSpecListById[id] ?? null;
  }

  public isEnabledAndHasValidUaSpec() {
    return this.isEnabled && this.selectedUaSpec != null;
  }

  @action
  public moveUaSpecDown(id: string) {
    const idx = this.getUaSpecListIdx(id);
    if (idx < 0 || idx >= this.uaSpecList.length - 1) {
      return;
    }
    this.uaSpecList.splice(
      idx,
      2,
      this.uaSpecList[idx + 1],
      this.uaSpecList[idx]
    );
  }

  @action
  public moveUaSpecUp(id: string) {
    const idx = this.getUaSpecListIdx(id);
    if (idx <= 0) {
      return;
    }
    this.uaSpecList.splice(
      idx - 1,
      2,
      this.uaSpecList[idx],
      this.uaSpecList[idx - 1]
    );
  }

  @action
  public addUaSpec(uaSpec: UaSpec) {
    this.uaSpecList.push(uaSpec);
  }

  @action
  public deleteUaSpec(id: string) {
    const idx = this.getUaSpecListIdx(id);
    if (idx < 0) {
      return;
    }
    this.uaSpecList.splice(idx, 1);
    if (this.uaSpecList.length === 0) {
      this.resetUaSpecListToDefault();
    } else if (this.selectedUaSpecId === id) {
      this.selectedUaSpecId = this.uaSpecList[0].id;
    }
  }

  @action
  public updateUaSpec(id: string, uaSpec: UaSpec) {
    const idx = this.getUaSpecListIdx(id);
    if (idx < 0 || idx >= this.uaSpecList.length) {
      return;
    }
    this.uaSpecList.splice(idx, 1, uaSpec);
  }

  @action
  public resetUaSpecListToDefault() {
    this.uaSpecList.replace(DEFAULT_UA_SPEC_LIST);
    this.selectedUaSpecId = DEFAULT_UA_SPEC_LIST[0].id;
    this.isEnabled = false;
  }

  public isUaSpecListSameAsDefault() {
    return _.isEqual(toJS(this.uaSpecList), DEFAULT_UA_SPEC_LIST);
  }

  isLoading = false;
  isStoring = false;

  constructor() {
    makeObservable(this);
    (window as {[key: string]: any})['STATE'] = this;
    this.initialLoad();
  }

  @action
  async load() {
    this.isLoading = true;
    console.info('LOAD START');
    let result = Object.assign(
      {},
      await BrowserStorage.syncGet([V2_UA_SPEC_LIST, V2_SELECTED_UA_SPEC_ID]),
      await BrowserStorage.localGet([IS_ENABLED])
    );
    runInAction(() => {
      // Load uaSpecList.
      this.uaSpecList.clear();
      if (_.has(result, V2_UA_SPEC_LIST)) {
        console.log(`${V2_UA_SPEC_LIST}: ${result[V2_UA_SPEC_LIST]}`);
        try {
          this.uaSpecList.replace(JSON.parse(result[V2_UA_SPEC_LIST]));
        } catch (e) {}
      }
      if (this.uaSpecList.length === 0) {
        this.uaSpecList.replace(DEFAULT_UA_SPEC_LIST);
      }

      // Load selectedUaSpecId.
      if (_.has(result, V2_SELECTED_UA_SPEC_ID)) {
        console.log(
          `${V2_SELECTED_UA_SPEC_ID}: ${result[V2_SELECTED_UA_SPEC_ID]}`
        );
        this.selectedUaSpecId = result[V2_SELECTED_UA_SPEC_ID];
      }
      if (
        !this.selectedUaSpecId ||
        !_.find(this.uaSpecList, ['id', this.selectedUaSpecId])
      ) {
        this.selectedUaSpecId = this.uaSpecList[0].id;
      }

      // Load isEnabled.
      if (_.has(result, IS_ENABLED)) {
        this.isEnabled = result[IS_ENABLED];
      }
    });
    console.info('LOAD END');
    this.isLoading = false;
  }

  async initialLoad() {
    await this.migrateFromV1UaSpecList();
    await this.load();
    browser.storage.onChanged.addListener(this.onStorageChanged.bind(this));
    reaction(
      () => [toJS(this.uaSpecList), this.selectedUaSpecId, this.isEnabled],
      () => this.onStateChanged()
    );
  }

  async store() {
    this.isStoring = true;
    console.info('STORE START');
    let uaSpecListString = JSON.stringify(toJS(this.uaSpecList));
    await BrowserStorage.syncSet({
      [V2_UA_SPEC_LIST]:
        uaSpecListString === DEFAULT_UA_SPEC_LIST_STRING
          ? '[]'
          : uaSpecListString,
      [V2_SELECTED_UA_SPEC_ID]: this.selectedUaSpecId,
    });
    await BrowserStorage.localSet({
      [IS_ENABLED]: this.isEnabled,
    });
    console.info('STORE END');
    this.isStoring = false;
  }

  onStorageChanged(changes: {[key: string]: any}, area: string) {
    if (
      !this.isStoring &&
      _.intersection(Object.keys(changes), _.get(STORAGE_KEYS, area, []))
    ) {
      this.load();
    }
  }

  onStateChanged() {
    if (!this.isLoading) {
      this.store();
    }
  }

  async migrateFromV1UaSpecList() {
    const result = await BrowserStorage.syncGet([
      V1_UA_SPEC_LIST,
      V1_SELECTED_UA_SPEC_IDX,
      V2_UA_SPEC_LIST,
      V2_SELECTED_UA_SPEC_ID,
    ]);
    if (
      _.has(result, V2_UA_SPEC_LIST) ||
      _.has(result, V2_SELECTED_UA_SPEC_ID) ||
      !_.has(result, V1_UA_SPEC_LIST) ||
      !_.has(result, V1_SELECTED_UA_SPEC_IDX)
    ) {
      return;
    }

    // Migrate V1_UA_SPEC_LIST to V2_UA_SPEC_LIST.
    let v2UaSpecList: Array<UaSpec> = [];
    if (_.has(result, V1_UA_SPEC_LIST)) {
      let v1UaSpecList: Array<Omit<UaSpec, 'id'>> = [];
      try {
        v1UaSpecList = JSON.parse(result[V1_UA_SPEC_LIST]);
      } catch (e) {}
      if (Array.isArray(v1UaSpecList) && v1UaSpecList.length > 0) {
        v2UaSpecList = v1UaSpecList.map((uaSpec) => ({
          id: uuidv4(),
          ...uaSpec,
        }));
      }
      await BrowserStorage.syncRemove([V1_UA_SPEC_LIST]);
      await BrowserStorage.syncSet({
        [V2_UA_SPEC_LIST]: JSON.stringify(v2UaSpecList),
      });
    }

    // Migrate V1_SELECTED_UA_SPEC_IDX to V2_SELECTED_UA_SPEC_ID.
    if (v2UaSpecList.length === 0) {
      v2UaSpecList = DEFAULT_UA_SPEC_LIST;
    }
    if (_.has(result, V1_SELECTED_UA_SPEC_IDX)) {
      await BrowserStorage.syncRemove([V1_SELECTED_UA_SPEC_IDX]);
      if (
        _.isFinite(result[V1_SELECTED_UA_SPEC_IDX]) &&
        result[V1_SELECTED_UA_SPEC_IDX] >= 0 &&
        result[V1_SELECTED_UA_SPEC_IDX] < v2UaSpecList.length
      ) {
        const v2SelectedUaSpecId =
          v2UaSpecList[result[V1_SELECTED_UA_SPEC_IDX]].id;
        await BrowserStorage.syncSet({
          [V2_SELECTED_UA_SPEC_ID]: v2SelectedUaSpecId,
        });
      }
    }
  }

  @computed
  get uaSpecListById() {
    return _.keyBy(this.uaSpecList, 'id');
  }

  @computed
  get uaSpecListIdxById() {
    return _(this.uaSpecList)
      .map(({id}, idx) => [id, idx] as [string, number])
      .fromPairs()
      .value();
  }

  getUaSpecListIdx(id: string) {
    return this.uaSpecListIdxById[id] ?? -1;
  }
}

const stateManager = new StateManager();
export default stateManager;
