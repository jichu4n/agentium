import * as _ from 'lodash';
import {
  action,
  computed,
  IObservableArray,
  observable,
  reaction,
  runInAction,
  toJS,
} from 'mobx';
import UaSpec from 'src/lib/ua-spec';
import {browser} from 'webextension-polyfill-ts';
import BrowserStorage from './browser-storage';
import DEFAULT_UA_SPEC_LIST from './default-ua-spec-list';

const UA_SPEC_LIST = 'v1/uaSpecList';
const SELECTED_UA_SPEC_IDX = 'v1/selectedUaSpecIdx';
const IS_ENABLED = 'v1/isEnabled';
const STORAGE_KEYS = {
  sync: [UA_SPEC_LIST, SELECTED_UA_SPEC_IDX],
  local: [IS_ENABLED],
};
const DEFAULT_UA_SPEC_LIST_STRING = JSON.stringify(DEFAULT_UA_SPEC_LIST);

class State {
  @observable
  public uaSpecList: IObservableArray<UaSpec> = observable([]);
  @observable
  public selectedUaSpecIdx = 0;
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
  public setSelectedUaSpecIdx(idx: number) {
    if (idx >= 0 && idx < this.uaSpecList.length) {
      this.selectedUaSpecIdx = idx;
    }
  }

  @computed
  public get selectedUaSpec() {
    if (
      this.selectedUaSpecIdx < 0 ||
      this.selectedUaSpecIdx >= this.uaSpecList.length
    ) {
      return null;
    }
    return this.uaSpecList[this.selectedUaSpecIdx];
  }

  public isEnabledAndHasValidUaSpec() {
    return this.isEnabled && this.selectedUaSpec != null;
  }

  isLoading = false;
  isStoring = false;

  constructor() {
    window['STATE'] = this;
    this.initialLoad();
  }

  @action
  async load() {
    this.isLoading = true;
    console.info('LOAD START');
    let result = Object.assign(
      {},
      await BrowserStorage.syncGet([UA_SPEC_LIST, SELECTED_UA_SPEC_IDX]),
      await BrowserStorage.localGet([IS_ENABLED])
    );
    runInAction(() => {
      if (_.has(result, UA_SPEC_LIST)) {
        try {
          this.uaSpecList.replace(JSON.parse(result[UA_SPEC_LIST]));
        } catch (e) {}
      }
      if (this.uaSpecList.length == 0) {
        this.uaSpecList.replace(DEFAULT_UA_SPEC_LIST);
      }
      if (_.has(result, SELECTED_UA_SPEC_IDX)) {
        this.selectedUaSpecIdx = result[SELECTED_UA_SPEC_IDX];
      }
      this.selectedUaSpecIdx = Math.min(
        Math.max(this.selectedUaSpecIdx, 0),
        this.uaSpecList.length - 1
      );
      if (_.has(result, IS_ENABLED)) {
        this.isEnabled = result[IS_ENABLED];
      }
      if (this.isEnabled && this.selectedUaSpec == null) {
        this.isEnabled = false;
      }
    });
    console.info('LOAD END');
    this.isLoading = false;
  }

  async initialLoad() {
    await this.load();
    browser.storage.onChanged.addListener(this.onStorageChanged.bind(this));
    reaction(
      () => [toJS(this.uaSpecList), this.selectedUaSpecIdx, this.isEnabled],
      () => this.onStateChanged()
    );
  }

  async store() {
    this.isStoring = true;
    console.info('STORE START');
    let uaSpecListString = JSON.stringify(toJS(this.uaSpecList));
    await BrowserStorage.syncSet({
      [UA_SPEC_LIST]:
        uaSpecListString == DEFAULT_UA_SPEC_LIST_STRING
          ? '[]'
          : uaSpecListString,
      [SELECTED_UA_SPEC_IDX]: this.selectedUaSpecIdx,
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
}

export default new State();
