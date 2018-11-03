import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import {observer} from 'mobx-react';
import * as React from 'react';
import CardTitle from 'src/lib/card-title';
import DeviceTypeIcon from 'src/lib/device-type-icon';
import State from 'src/state/state';

interface EditUaListCardState {
  activeUaSpecIdx: number;
  isDeleteConfirmationDialogOpen: boolean;
  isResetConfirmationDialogOpen: boolean;
  isEditDialogOpen: boolean;
}

@observer
class EditUaListCard extends React.Component<{}, EditUaListCardState> {
  constructor(props: any) {
    super(props);
    this.state = {
      activeUaSpecIdx: -1,
      isDeleteConfirmationDialogOpen: false,
      isResetConfirmationDialogOpen: false,
      isEditDialogOpen: false,
    };
  }

  render() {
    let activeUaSpec =
      this.state.activeUaSpecIdx >= 0 &&
      this.state.activeUaSpecIdx < State.uaSpecList.length
        ? State.uaSpecList[this.state.activeUaSpecIdx]
        : null;
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
              <IconButton onClick={() => this.onDelete(idx)}>
                <Delete />
              </IconButton>
              <IconButton onClick={() => this.onMoveUp(idx)}>
                <ArrowUpward />
              </IconButton>
              <IconButton onClick={() => this.onMoveDown(idx)}>
                <ArrowDownward />
              </IconButton>
            </ListItem>
          ))}
        </List>
        <CardActions>
          <Button color="primary">Add user agent</Button>
          <Button color="primary" onClick={() => this.onReset()}>
            Reset to default
          </Button>
        </CardActions>

        <Dialog open={this.state.isDeleteConfirmationDialogOpen}>
          <DialogTitle>Delete</DialogTitle>
          <DialogContent>
            <Typography>
              {activeUaSpec == null
                ? ''
                : `Delete user agent "${activeUaSpec.name}"?`}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={() => this.onCancelDelete()}>
              Cancel
            </Button>
            <Button color="primary" onClick={() => this.onConfirmDelete()}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={this.state.isResetConfirmationDialogOpen}>
          <DialogTitle>Reset to default</DialogTitle>
          <DialogContent>
            <Typography>Reset user agent list to default?</Typography>
            <Typography>&nbsp;</Typography>
            <Typography>
              This will undo any changes you have made to this list, and will
              remove any custom user agent configurations you have added.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={() => this.onCancelReset()}>
              Cancel
            </Button>
            <Button color="primary" onClick={() => this.onConfirmReset()}>
              Reset
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    );
  }

  onMoveUp(idx: number) {
    if (idx <= 0) {
      return;
    }
    State.moveUaSpecDown(idx - 1);
  }

  onMoveDown(idx: number) {
    State.moveUaSpecDown(idx);
  }

  onDelete(idx: number) {
    this.setState({
      activeUaSpecIdx: idx,
      isDeleteConfirmationDialogOpen: true,
    });
  }

  onCancelDelete() {
    this.setState({
      activeUaSpecIdx: -1,
      isDeleteConfirmationDialogOpen: false,
    });
  }

  onConfirmDelete() {
    State.deleteUaSpec(this.state.activeUaSpecIdx);
    this.setState({
      activeUaSpecIdx: -1,
      isDeleteConfirmationDialogOpen: false,
    });
  }

  onReset() {
    this.setState({
      isResetConfirmationDialogOpen: true,
    });
  }

  onCancelReset() {
    this.setState({
      isResetConfirmationDialogOpen: false,
    });
  }

  onConfirmReset() {
    State.resetUaSpecListToDefault();
    this.setState({
      isResetConfirmationDialogOpen: false,
    });
  }
}

export default EditUaListCard;
