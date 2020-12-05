import {reaction, toJS} from 'mobx';
import openOptionsPage from 'src/lib/open-options-page';
import State from 'src/state/state';
import {browser, Menus} from 'webextension-polyfill-ts';

const TOGGLE_ENABLED = 'toggle-enabled';
const UA_SPEC_LIST = 'ua-spec-list';
const UA_SPEC_PREFIX = 'ua-spec-';
const OPTIONS = 'options';

class ContextMenuManager {
  public start() {
    browser.contextMenus.onClicked.addListener(this.onMenuClick.bind(this));
    reaction(
      () => [State.isEnabled, State.selectedUaSpec, toJS(State.uaSpecList)],
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
    State.toggleEnabled();
  }

  onSelectUaSpec(id: string) {
    State.setSelectedUaSpecId(id);
  }

  onStateChange() {
    browser.contextMenus.removeAll();
    if (State.selectedUaSpec !== null && State.uaSpecList.length > 0) {
      browser.contextMenus.create({
        contexts: ['browser_action'],
        id: TOGGLE_ENABLED,
        title: State.isEnabled
          ? 'Turn OFF - Use default user agent'
          : `Turn ON - ${State.selectedUaSpec.name}`,
      });
    }
    browser.contextMenus.create({
      contexts: ['browser_action'],
      id: UA_SPEC_LIST,
      title: 'Choose user agent',
    });
    State.uaSpecList.forEach((uaSpec) => {
      browser.contextMenus.create({
        contexts: ['browser_action'],
        type: 'radio',
        checked: uaSpec.id === State.selectedUaSpecId,
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
