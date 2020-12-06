import stateManager from 'src/state/state-manager';
import {browser, WebRequest} from 'webextension-polyfill-ts';

class UaHeaderManager {
  public start() {
    browser.webRequest.onBeforeSendHeaders.addListener(
      this.onBeforeSendHeaders.bind(this),
      {urls: ['http://*/*', 'https://*/*']},
      ['blocking', 'requestHeaders']
    );
  }

  onBeforeSendHeaders(details: WebRequest.OnBeforeSendHeadersDetailsType) {
    if (
      !stateManager.isEnabledAndHasValidUaSpec() ||
      details.requestHeaders == null
    ) {
      return {};
    }
    return {
      requestHeaders: details.requestHeaders.map((header) =>
        header.name.toLowerCase() === 'user-agent'
          ? {name: header.name, value: stateManager.selectedUaSpec!.value}
          : header
      ),
    };
  }
}

export default UaHeaderManager;
