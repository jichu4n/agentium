import * as _ from 'lodash';
import {
  action,
  IObservableArray,
  observable,
  reaction,
  runInAction,
  toJS,
  computed,
} from 'mobx';
import {browser} from 'webextension-polyfill-ts';
import DEFAULT_UA_SPEC_LIST from './default-ua-spec-list';
import UaSpec from './ua-spec';

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
  uaSpecList: IObservableArray<UaSpec> = observable([]);
  @observable
  selectedUaSpecIdx = 0;
  @observable
  isEnabled = false;

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
      await browser.storage.sync.get([UA_SPEC_LIST, SELECTED_UA_SPEC_IDX]),
      await browser.storage.local.get([IS_ENABLED])
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

  @computed
  get selectedUaSpec() {
    if (
      this.selectedUaSpecIdx < 0 ||
      this.selectedUaSpecIdx >= this.uaSpecList.length
    ) {
      return null;
    }
    return this.uaSpecList[this.selectedUaSpecIdx];
  }

  async initialLoad() {
    await this.load();
    browser.storage.onChanged.addListener(this.onStorageChanged.bind(this));
    reaction(
      () => [toJS(this.uaSpecList), this.selectedUaSpecIdx, this.isEnabled],
      () => this.onStateChanged()
    );
  }

  @action
  toggleEnabled() {
    if (!this.isEnabled && this.selectedUaSpec == null) {
      return;
    }
    this.isEnabled = !this.isEnabled;
  }

  @action
  setSelectedUaSpecIdx(idx: number) {
    if (idx >= 0 && idx < this.uaSpecList.length) {
      this.selectedUaSpecIdx = idx;
    }
  }

  async store() {
    this.isStoring = true;
    console.info('STORE START');
    let uaSpecListString = JSON.stringify(toJS(this.uaSpecList));
    await browser.storage.sync.set({
      [UA_SPEC_LIST]:
        uaSpecListString == DEFAULT_UA_SPEC_LIST_STRING
          ? '[]'
          : uaSpecListString,
      [SELECTED_UA_SPEC_IDX]: this.selectedUaSpecIdx,
    });
    await browser.storage.local.set({
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