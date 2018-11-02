import State from 'src/state/state';
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
    if (!State.isEnabledAndHasValidUaSpec() || details.requestHeaders == null) {
      return {};
    }
    return {
      requestHeaders: details.requestHeaders.map(
        (header) =>
          header.name.toLowerCase() == 'user-agent'
            ? {name: 'User-Agent', value: State.selectedUaSpec!.value}
            : header
      ),
    };
  }
}

export default UaHeaderManager;
