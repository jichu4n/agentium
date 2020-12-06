import green from '@material-ui/core/colors/green';
import {autorun} from 'mobx';
import stateManager from 'src/state/state-manager';
import {browser} from 'webextension-polyfill-ts';

class BrowserActionManager {
  public start() {
    browser.browserAction.setBadgeBackgroundColor({color: green[700]});
    autorun(this.onStateChange.bind(this));
  }

  onStateChange() {
    browser.browserAction.setBadgeText({
      text: stateManager.isEnabledAndHasValidUaSpec() ? 'ON' : '',
    });
    browser.browserAction.setTitle({
      title: stateManager.isEnabledAndHasValidUaSpec()
        ? `Agentium:  ON - ${stateManager.selectedUaSpec!.name}`
        : `Agentium:  OFF - Using default user agent`,
    });
  }
}

export default BrowserActionManager;
