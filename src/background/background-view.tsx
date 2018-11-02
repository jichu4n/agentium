import * as React from 'react';
import BrowserActionManager from './browser-action-manager';
import UaHeaderManager from './ua-header-manager';

class BackgroundView extends React.Component<{}, {}> {
  uaHeaderManager = new UaHeaderManager();
  browserActionManager = new BrowserActionManager();

  constructor(props: any) {
    super(props);
    console.info('BACKGROUND');

    this.uaHeaderManager.start();
    this.browserActionManager.start();
  }

  render() {
    return <div>Background page</div>;
  }
}

export default BackgroundView;
