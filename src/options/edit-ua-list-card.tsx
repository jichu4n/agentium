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
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import * as _ from 'lodash';
import {observer} from 'mobx-react';
import * as React from 'react';
import CardTitle from 'src/lib/card-title';
import DeviceTypeIcon from 'src/lib/device-type-icon';
import UaSpec from 'src/lib/ua-spec';
import State from 'src/state/state';
import {v4 as uuidv4} from 'uuid';
import './edit-ua-list-card.css';

interface EditUaListCardState {
  activeUaSpecId: string | null;
  isDeleteConfirmationDialogOpen: boolean;
  isResetConfirmationDialogOpen: boolean;
  isEditDialogOpen: boolean;
  editedUaSpec: UaSpec | null;
}

const NEW_UA_SPEC: Omit<UaSpec, 'id'> = {
  deviceType: 'desktop',
  name: '',
  value: '',
};

@observer
class EditUaListCard extends React.Component<{}, EditUaListCardState> {
  constructor(props: any) {
    super(props);
    this.state = {
      activeUaSpecId: null,
      isDeleteConfirmationDialogOpen: false,
      isResetConfirmationDialogOpen: false,
      isEditDialogOpen: false,
      editedUaSpec: null,
    };
  }

  render() {
    const activeUaSpec = this.getActiveUaSpec();
    return (
      <Paper>
        <CardTitle text="User agents" />
        <List>
          {State.uaSpecList.map((uaSpec) => (
            <ListItem button={true} onClick={() => this.onEdit(uaSpec.id)}>
              <ListItemIcon>
                <DeviceTypeIcon deviceType={uaSpec.deviceType} />
              </ListItemIcon>
              <ListItemText
                primary={uaSpec.name}
                secondary={uaSpec.value}
                style={{width: 'max-content', maxWidth: 400}}
                secondaryTypographyProps={{
                  style: {
                    wordBreak: 'break-all',
                  },
                }}
              />
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  this.onMoveUp(uaSpec.id);
                }}
              >
                <ArrowUpward />
              </IconButton>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  this.onMoveDown(uaSpec.id);
                }}
              >
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
            style={{marginLeft: 'auto'}}
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
            <Button
              color="secondary"
              onClick={() => this.onDelete()}
              style={{
                marginLeft: 8,
                marginRight: 'auto',
              }}
            >
              Delete
            </Button>
            <Button color="primary" onClick={() => this.onCancelEdit()}>
              Cancel
            </Button>
            <Button
              color="primary"
              onClick={() => this.onConfirmEdit()}
              disabled={
                this.state.editedUaSpec == null ||
                this.state.editedUaSpec.name.trim().length === 0 ||
                this.state.editedUaSpec.value.trim().length === 0 ||
                (this.hasActiveUaSpec() &&
                  _.isEqual(
                    this.state.editedUaSpec,
                    State.getUaSpec(this.state.activeUaSpecId!)
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
              {activeUaSpec === null
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

  onMoveUp(id: string) {
    State.moveUaSpecUp(id);
  }

  onMoveDown(id: string) {
    State.moveUaSpecDown(id);
  }

  onEdit(id: string) {
    const uaSpec = State.getUaSpec(id);
    if (!uaSpec) {
      return;
    }
    this.setState({
      activeUaSpecId: id,
      isEditDialogOpen: true,
      editedUaSpec: {...uaSpec},
    });
  }

  onCancelEdit() {
    this.setState(
      {
        isEditDialogOpen: false,
      },
      () =>
        // The edit dialog's dismissal will be animated, so immediately resetting editedUaSpec will
        // result in a "flash" of the edit dialog in an invalid state. To address this, we use a
        // setTimeout to reset editedUaSpec only after the edit dialog is fully hidden.
        setTimeout(
          () =>
            this.setState({
              activeUaSpecId: null,
              editedUaSpec: null,
            }),
          100
        )
    );
  }

  onConfirmEdit() {
    if (this.state.editedUaSpec != null) {
      if (this.hasActiveUaSpec()) {
        State.updateUaSpec(this.state.activeUaSpecId!, this.state.editedUaSpec);
      } else {
        State.addUaSpec(this.state.editedUaSpec);
      }
    }
    this.onCancelEdit();
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

  onDelete() {
    this.setState({
      isDeleteConfirmationDialogOpen: true,
    });
  }

  onCancelDelete() {
    this.setState({
      isDeleteConfirmationDialogOpen: false,
    });
  }

  onConfirmDelete() {
    if (this.hasActiveUaSpec()) {
      State.deleteUaSpec(this.state.activeUaSpecId!);
    }
    this.setState({
      isDeleteConfirmationDialogOpen: false,
    });
    this.onCancelEdit();
  }

  onAdd() {
    this.setState({
      activeUaSpecId: null,
      isEditDialogOpen: true,
      editedUaSpec: {...NEW_UA_SPEC, id: uuidv4()},
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
      !!this.state.activeUaSpecId &&
      !!State.getUaSpec(this.state.activeUaSpecId)
    );
  }

  getActiveUaSpec() {
    return this.state.activeUaSpecId
      ? State.getUaSpec(this.state.activeUaSpecId)
      : null;
  }
}

export default EditUaListCard;
