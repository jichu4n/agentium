import Grid from '@material-ui/core/Grid';
import * as React from 'react';
import './popup-view.css';
import ToggleEnabledCard from './toggle-enabled-card';
import UaListCard from './ua-list-card';

class PopupView extends React.Component<{}, {}> {
  constructor(props: any) {
    super(props);
    console.info('POPUP');
  }

  render() {
    document.body.classList.add('popup-view');
    return (
      <div className="popup-view-container">
        <Grid container={true} spacing={8} direction="column">
          <Grid item={true} xs={true}>
            <ToggleEnabledCard />
          </Grid>
          <Grid item={true} xs={true}>
            <UaListCard />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default PopupView;
