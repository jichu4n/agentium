import green from '@material-ui/core/colors/green';
import {autorun, computed} from 'mobx';
import * as React from 'react';
import State from 'src/state/state';
import {browser, WebRequest} from 'webextension-polyfill-ts';

class BackgroundView extends React.Component<{}, {}> {
  constructor(props: any) {
    super(props);
    console.info('BACKGROUND');

    browser.webRequest.onBeforeSendHeaders.addListener(
      this.onBeforeSendHeaders.bind(this),
      {urls: ['http://*/*', 'https://*/*']},
      ['blocking', 'requestHeaders']
    );

    browser.browserAction.setBadgeBackgroundColor({color: green[700]});
    autorun(() => {
      browser.browserAction.setBadgeText({text: this.isEnabled ? 'ON' : ''});
      browser.browserAction.setTitle({
        title: this.isEnabled
          ? `Agentium: ON - ${State.selectedUaSpec!.name}`
          : `Agentium: OFF - Using default browser user agent`,
      });
    });
  }

  @computed
  get isEnabled() {
    return State.isEnabled && State.selectedUaSpec != null;
  }

  onBeforeSendHeaders(details: WebRequest.OnBeforeSendHeadersDetailsType) {
    if (!this.isEnabled || details.requestHeaders == null) {
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

  render() {
    return <div>Background page</div>;
  }
}

export default BackgroundView;
