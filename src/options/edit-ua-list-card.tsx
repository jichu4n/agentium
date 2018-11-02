import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import {observer} from 'mobx-react';
import * as React from 'react';
import CardTitle from 'src/lib/card-title';
import DeviceTypeIcon from 'src/lib/device-type-icon';
import State from 'src/state/state';

@observer
class EditUaListCard extends React.Component<{}, {}> {
  render() {
    return (
      <Paper>
        <CardTitle text="User agents" />
        <List>
          {State.uaSpecList.map((uaSpec, idx) => (
            <ListItem>
              <ListItemIcon>
                <DeviceTypeIcon deviceType={uaSpec.deviceType} />
              </ListItemIcon>
              <ListItemText primary={uaSpec.name} secondary={uaSpec.value} />
              <IconButton>
                <Edit />
              </IconButton>
              <IconButton>
                <Delete />
              </IconButton>
              <IconButton>
                <ArrowUpward />
              </IconButton>
              <IconButton>
                <ArrowDownward />
              </IconButton>
            </ListItem>
          ))}
        </List>
        <CardActions>
          <Button color="primary">Reset to default</Button>
        </CardActions>
      </Paper>
    );
  }
}

export default EditUaListCard;
