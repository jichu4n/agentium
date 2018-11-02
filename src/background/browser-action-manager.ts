import green from '@material-ui/core/colors/green';
import {autorun} from 'mobx';
import State from 'src/state/state';
import {browser} from 'webextension-polyfill-ts';

class BrowserActionManager {
  public start() {
    browser.browserAction.setBadgeBackgroundColor({color: green[700]});
    autorun(this.onStateChange.bind(this));
  }

  onStateChange() {
    browser.browserAction.setBadgeText({
      text: State.isEnabledAndHasValidUaSpec() ? 'ON' : '',
    });
    browser.browserAction.setTitle({
      title: State.isEnabledAndHasValidUaSpec()
        ? `Agentium:  ON - ${State.selectedUaSpec!.name}`
        : `Agentium:  OFF - Using default user agent`,
    });
  }
}

export default BrowserActionManager;
