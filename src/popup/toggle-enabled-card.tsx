import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {observer} from 'mobx-react';
import * as React from 'react';
import DeviceTypeIcon from 'src/lib/device-type-icon';
import State from 'src/state/state';
import './toggle-enabled-card.css';

@observer
class ToggleEnabledCard extends React.Component<{}, {}> {
  render() {
    return (
      <Card>
        <CardActionArea onClick={() => State.toggleEnabled()}>
          <CardMedia
            component="img"
            classes={{
              media: 'toggle-enabled-button',
            }}
            image={
              State.isEnabledAndHasValidUaSpec()
                ? '/power-active.png'
                : '/power-inactive.png'
            }
            title={State.isEnabledAndHasValidUaSpec() ? 'Turn off' : 'Turn on'}
          />
          <Divider />
          <List>
            {State.selectedUaSpec != null && (
              <ListItem dense={true}>
                <ListItemText
                  primary={State.selectedUaSpec.name}
                  primaryTypographyProps={
                    State.isEnabledAndHasValidUaSpec()
                      ? {}
                      : {color: 'textSecondary'}
                  }
                />
                <ListItemIcon>
                  <DeviceTypeIcon
                    deviceType={State.selectedUaSpec.deviceType}
                    color={
                      State.isEnabledAndHasValidUaSpec()
                        ? undefined
                        : 'disabled'
                    }
                  />
                </ListItemIcon>
              </ListItem>
            )}
          </List>
        </CardActionArea>
      </Card>
    );
  }
}

export default ToggleEnabledCard;
