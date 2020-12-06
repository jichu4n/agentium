import {reaction, toJS} from 'mobx';
import openOptionsPage from 'src/lib/open-options-page';
import stateManager from 'src/state/state-manager';
import {browser, Menus} from 'webextension-polyfill-ts';

const TOGGLE_ENABLED = 'toggle-enabled';
const UA_SPEC_LIST = 'ua-spec-list';
const UA_SPEC_PREFIX = 'ua-spec-';
const OPTIONS = 'options';

class ContextMenuManager {
  public start() {
    browser.contextMenus.onClicked.addListener(this.onMenuClick.bind(this));
    reaction(
      () => [
        stateManager.isEnabled,
        stateManager.selectedUaSpec,
        toJS(stateManager.uaSpecList),
      ],
      this.onStateChange.bind(this)
    );
  }

  onMenuClick(onClickData: Menus.OnClickData) {
    let menuItemId = onClickData.menuItemId.toString();
    switch (menuItemId) {
      case TOGGLE_ENABLED:
        this.onToggleEnabled();
        break;
      case OPTIONS:
        openOptionsPage();
        break;
      default:
        if (menuItemId.startsWith(UA_SPEC_PREFIX)) {
          this.onSelectUaSpec(menuItemId.substr(UA_SPEC_PREFIX.length));
        }
        break;
    }
  }

  onToggleEnabled() {
    stateManager.toggleEnabled();
  }

  onSelectUaSpec(id: string) {
    stateManager.setSelectedUaSpecId(id);
  }

  onStateChange() {
    browser.contextMenus.removeAll();
    if (
      stateManager.selectedUaSpec !== null &&
      stateManager.uaSpecList.length > 0
    ) {
      browser.contextMenus.create({
        contexts: ['browser_action'],
        id: TOGGLE_ENABLED,
        title: stateManager.isEnabled
          ? 'Turn OFF - Use default user agent'
          : `Turn ON - ${stateManager.selectedUaSpec.name}`,
      });
    }
    browser.contextMenus.create({
      contexts: ['browser_action'],
      id: UA_SPEC_LIST,
      title: 'Choose user agent',
    });
    stateManager.uaSpecList.forEach((uaSpec) => {
      browser.contextMenus.create({
        contexts: ['browser_action'],
        type: 'radio',
        checked: uaSpec.id === stateManager.selectedUaSpecId,
        id: `${UA_SPEC_PREFIX}${uaSpec.id}`,
        title: uaSpec.name,
        parentId: UA_SPEC_LIST,
      });
    });
    browser.contextMenus.create({
      contexts: ['browser_action'],
      type: 'separator',
      parentId: UA_SPEC_LIST,
    });
    browser.contextMenus.create({
      contexts: ['browser_action'],
      id: OPTIONS,
      title: 'Edit user agents...',
      parentId: UA_SPEC_LIST,
    });
  }
}

export default ContextMenuManager;
