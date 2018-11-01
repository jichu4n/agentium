import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {observer} from 'mobx-react';
import * as React from 'react';
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
            className="toggle-enabled-button"
            image={
              State.isEnabled ? '/power-active.png' : '/power-inactive.png'
            }
            title="Enable"
          />
        </CardActionArea>
        <Divider />
        <CardContent>
          <List>
            <ListItem>
              {State.isEnabled && State.selectedUaSpec != null ? (
                <ListItemText
                  primary={State.selectedUaSpec.name}
                  secondary={State.selectedUaSpec.value}
                />
              ) : (
                <ListItemText
                  primary="Disabled"
                  secondary="Using default browser user agent"
                />
              )}
            </ListItem>
          </List>
        </CardContent>
      </Card>
    );
  }
}

export default ToggleEnabledCard;
