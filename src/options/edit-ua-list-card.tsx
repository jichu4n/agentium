import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import * as _ from 'lodash';
import {observer} from 'mobx-react';
import * as React from 'react';
import CardTitle from 'src/lib/card-title';
import DeviceTypeIcon from 'src/lib/device-type-icon';
import UaSpec from 'src/lib/ua-spec';
import State from 'src/state/state';
import MenuItem from '@material-ui/core/MenuItem';
import './edit-ua-list-card.css';

interface EditUaListCardState {
  activeUaSpecIdx: number;
  isDeleteConfirmationDialogOpen: boolean;
  isResetConfirmationDialogOpen: boolean;
  isEditDialogOpen: boolean;
  editedUaSpec: UaSpec | null;
}

const NEW_UA_SPEC: UaSpec = {
  deviceType: 'desktop',
  name: '',
  value: '',
};

@observer
class EditUaListCard extends React.Component<{}, EditUaListCardState> {
  constructor(props: any) {
    super(props);
    this.state = {
      activeUaSpecIdx: -1,
      isDeleteConfirmationDialogOpen: false,
      isResetConfirmationDialogOpen: false,
      isEditDialogOpen: false,
      editedUaSpec: null,
    };
  }

  render() {
    let activeUaSpec = this.hasActiveUaSpec()
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
              <IconButton onClick={() => this.onEdit(idx)}>
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
          <Button color="primary" onClick={() => this.onAdd()}>
            Add user agent
          </Button>
          <Button
            color="primary"
            onClick={() => this.onReset()}
            disabled={State.isUaSpecListSameAsDefault()}
          >
            Reset to default
          </Button>
        </CardActions>

        <Dialog open={this.state.isEditDialogOpen}>
          <DialogTitle>
            {this.hasActiveUaSpec() ? 'Edit user agent' : 'Add user agent'}
          </DialogTitle>
          {this.state.editedUaSpec && (
            <DialogContent>
              <TextField
                fullWidth={true}
                autoFocus={true}
                margin="normal"
                label="Name"
                placeholder="e.g. Google Chrome (Android)"
                value={this.state.editedUaSpec.name}
                onChange={this.onEditFieldChange.bind(this, 'name')}
              />
              <TextField
                fullWidth={true}
                margin="normal"
                multiline={true}
                rows={5}
                label="User agent string"
                placeholder="e.g. Mozilla/5.0 (Linux; Android 8.0.0; SM-G9600) ..."
                value={this.state.editedUaSpec.value}
                onChange={this.onEditFieldChange.bind(this, 'value')}
              />
              <TextField
                select={true}
                margin="normal"
                label="Form factor"
                value={this.state.editedUaSpec.deviceType}
                onChange={this.onEditFieldChange.bind(this, 'deviceType')}
                classes={{root: 'select-field'}}
              >
                <MenuItem key="desktop" value="desktop">
                  Desktop
                </MenuItem>
                <MenuItem key="mobile" value="mobile">
                  Phone
                </MenuItem>
                <MenuItem key="tablet" value="tablet">
                  Tablet
                </MenuItem>
              </TextField>
            </DialogContent>
          )}
          <DialogActions>
            <Button color="primary" onClick={() => this.onCancelEdit()}>
              Cancel
            </Button>
            <Button
              color="primary"
              onClick={() => this.onConfirmEdit()}
              disabled={
                this.state.editedUaSpec == null ||
                this.state.editedUaSpec.name.trim().length == 0 ||
                this.state.editedUaSpec.value.trim().length == 0 ||
                (this.hasActiveUaSpec() &&
                  _.isEqual(
                    this.state.editedUaSpec,
                    State.uaSpecList[this.state.activeUaSpecIdx]
                  ))
              }
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={this.state.isDeleteConfirmationDialogOpen}>
          <DialogContent>
            <DialogContentText>
              {activeUaSpec == null
                ? ''
                : `Delete user agent "${activeUaSpec.name}"?`}
            </DialogContentText>
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
          <DialogTitle>Reset to default?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              This will undo any changes you have made to this list, and will
              remove any custom user agent configurations you have added.
            </DialogContentText>
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

  onEdit(idx: number) {
    this.setState({
      activeUaSpecIdx: idx,
      isEditDialogOpen: true,
      editedUaSpec: {...State.uaSpecList[idx]},
    });
  }

  onCancelEdit() {
    this.setState({
      activeUaSpecIdx: -1,
      isEditDialogOpen: false,
      editedUaSpec: null,
    });
  }

  onConfirmEdit() {
    if (this.state.editedUaSpec != null) {
      if (this.hasActiveUaSpec()) {
        State.updateUaSpec(this.state.activeUaSpecIdx, this.state.editedUaSpec);
      } else {
        State.addUaSpec(this.state.editedUaSpec);
      }
    }
    this.setState({
      activeUaSpecIdx: -1,
      isEditDialogOpen: false,
      editedUaSpec: null,
    });
  }

  onEditFieldChange(
    field: string,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    this.setState({
      editedUaSpec: Object.assign({}, this.state.editedUaSpec, {
        [field]: event.target.value,
      }),
    });
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

  onAdd() {
    this.setState({
      activeUaSpecIdx: -1,
      isEditDialogOpen: true,
      editedUaSpec: {...NEW_UA_SPEC},
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

  hasActiveUaSpec() {
    return (
      this.state.activeUaSpecIdx >= 0 &&
      this.state.activeUaSpecIdx < State.uaSpecList.length
    );
  }
}

export default EditUaListCard;
