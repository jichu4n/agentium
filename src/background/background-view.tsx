import * as React from 'react';

class BackgroundView extends React.Component<{}, {}> {
  constructor(props: any) {
    super(props);
    console.info('BACKGROUND');
  }

  render() {
    return <div>Background page</div>;
  }
}

export default BackgroundView;
