import * as React from 'react';
import BrowserActionManager from './browser-action-manager';
import ContextMenuManager from './context-menu-manager';
import UaHeaderManager from './ua-header-manager';

class BackgroundView extends React.Component<{}, {}> {
  uaHeaderManager = new UaHeaderManager();
  browserActionManager = new BrowserActionManager();
  contextMenuManager = new ContextMenuManager();

  constructor(props: any) {
    super(props);
    console.info('BACKGROUND');

    this.browserActionManager.start();
    this.contextMenuManager.start();
    this.uaHeaderManager.start();
  }

  render() {
    return <div>Background page</div>;
  }
}

export default BackgroundView;
