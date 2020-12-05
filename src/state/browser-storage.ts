import {detect} from 'detect-browser';
import * as webextensionPolyfill from 'webextension-polyfill-ts';

declare var browser: any;

interface EdgeStorageArea {
  get: (keys: Array<string>, cb: (result: {[s: string]: any}) => any) => void;
  set: (data: {[s: string]: any}, cb: () => void) => void;
  remove: (keys: Array<string>, cb: () => void) => void;
}

/**
 * Polyfill for WebExtensions browser API.
 *
 * Unfortunately, the
 */
class BrowserStorage {
  public localGet(keys: Array<string>) {
    return this.getFn(this.localStore, keys);
  }

  public syncGet(keys: Array<string>) {
    return this.getFn(this.syncStore, keys);
  }

  public localSet(data: {[s: string]: any}) {
    return this.setFn(this.localStore, data);
  }

  public syncSet(data: {[s: string]: any}) {
    return this.setFn(this.syncStore, data);
  }

  public localRemove(keys: Array<string>) {
    return this.removeFn(this.localStore, keys);
  }

  public syncRemove(keys: Array<string>) {
    return this.removeFn(this.syncStore, keys);
  }

  browserName = '';
  getFn: (store: any, keys: Array<string>) => Promise<{[key: string]: any}>;
  setFn: (store: any, data: {[key: string]: any}) => Promise<void>;
  removeFn: (store: any, keys: Array<string>) => Promise<void>;
  localStore: any;
  syncStore: any;

  constructor() {
    let detectedBrowser = detect();
    if (detectedBrowser && detectedBrowser.name) {
      this.browserName = detectedBrowser.name;
    }
    if (this.browserName === 'edge') {
      console.info('Using Edge polyfill for browser storage');
      this.getFn = this.edgeGet.bind(this);
      this.setFn = this.edgeSet.bind(this);
      this.removeFn = this.edgeRemove.bind(this);
      this.localStore = browser.storage.local;
      this.syncStore = browser.storage.sync;
    } else {
      console.info('Using Chrome / Firefox polyfill for browser storage');
      this.getFn = this.polyfillGet.bind(this);
      this.setFn = this.polyfillSet.bind(this);
      this.removeFn = this.polyfillRemove.bind(this);
      this.localStore = webextensionPolyfill.browser.storage.local;
      this.syncStore = webextensionPolyfill.browser.storage.sync;
    }
  }

  polyfillGet(
    store: webextensionPolyfill.Storage.StorageArea,
    keys: Array<string>
  ) {
    return store.get(keys);
  }

  polyfillSet(
    store: webextensionPolyfill.Storage.StorageArea,
    data: {[key: string]: any}
  ) {
    return store.set(data);
  }

  polyfillRemove(
    store: webextensionPolyfill.Storage.StorageArea,
    keys: Array<string>
  ) {
    return store.remove(keys);
  }

  edgeGet(store: EdgeStorageArea, keys: Array<string>) {
    return new Promise<{[key: string]: any}>((resolve) => {
      store.get(keys, resolve);
    });
  }

  edgeSet(store: EdgeStorageArea, data: {[key: string]: any}) {
    return new Promise<void>((resolve) => {
      store.set(data, resolve);
    });
  }

  edgeRemove(store: EdgeStorageArea, keys: Array<string>) {
    return new Promise<void>((resolve) => {
      store.remove(keys, resolve);
    });
  }
}

export default new BrowserStorage();
