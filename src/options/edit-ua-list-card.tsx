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
import _ from 'lodash';
import {observer} from 'mobx-react';
import React, {useCallback, useEffect, useState} from 'react';
import CardTitle from 'src/lib/card-title';
import DeviceTypeIcon from 'src/lib/device-type-icon';
import UaSpec from 'src/lib/ua-spec';
import usePrevious from 'src/lib/use-previous';
import stateManager from 'src/state/state-manager';
import {v4 as uuidv4} from 'uuid';

/** Template for creating a new UaSpec. */
const NEW_UA_SPEC: Omit<UaSpec, 'id'> = {
  deviceType: 'desktop',
  name: '',
  value: '',
};

/** How long to wait for dialogs animations to complete.
 *
 * This should match or exceed the Material-UI config - see
 * https://next.material-ui.com/customization/transitions/
 */
const DIALOG_ANIMATION_DURATION_MS = 400;

function DeleteConfirmationDialog({
  isOpen,
  onClose,
  uaSpec,
}: {
  isOpen: boolean;
  onClose: (didConfirm: boolean) => void;
  uaSpec: UaSpec | null;
}) {
  if (!uaSpec) {
    return null;
  }
  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <DialogContentText>
          {`Delete user agent "${uaSpec.name}"?`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={() => onClose(false)}>
          Cancel
        </Button>
        <Button
          color="primary"
          onClick={() => {
            onClose(true);
            // We set a delay before actually deleting the UaSpec in order to allow any UI
            // animations to complete before the relevant models get removed.
            setTimeout(
              () => stateManager.deleteUaSpec(uaSpec.id),
              DIALOG_ANIMATION_DURATION_MS
            );
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function ResetConfirmationDialog({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog open={isOpen}>
      <DialogTitle>Reset to default?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          This will undo any changes you have made to this list, and will remove
          any custom user agent configurations you have added.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onClose}>
          Cancel
        </Button>
        <Button
          color="primary"
          onClick={() => {
            onClose();
            stateManager.resetUaSpecListToDefault();
          }}
        >
          Reset
        </Button>
      </DialogActions>
    </Dialog>
  );
}

/** Dialog for editing a new or existing UaSpec. */
function EditDialog({
  isOpen,
  onClose,
  initialUaSpec,
  isExistingUaSpec,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialUaSpec: UaSpec;
  isExistingUaSpec: boolean;
}) {
  const [editedUaSpec, setEditedUaSpec] = useState<UaSpec>({
    ...initialUaSpec,
  });

  const getEditUaSpecHandler = useCallback(
    (field: keyof UaSpec) => (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) =>
      setEditedUaSpec({
        ...editedUaSpec,
        [field]: event.target.value,
      }),
    [editedUaSpec]
  );

  const prevIsOpen = usePrevious(isOpen);
  const [isInstantiated, setIsInstantiated] = useState(false);
  useEffect(() => {
    if (!prevIsOpen && isOpen) {
      // Each time the dialog is opened, we reset editedUaSpec to the value of initialUaSpec.
      setEditedUaSpec({...initialUaSpec});
      setIsInstantiated(true);
    } else if (prevIsOpen && !isOpen) {
      // When isOpen transitions to false, we wait for the dialog animation to finish before
      // destroying the <Dialog> component.
      setTimeout(() => setIsInstantiated(false), DIALOG_ANIMATION_DURATION_MS);
    }
  }, [isOpen, prevIsOpen, initialUaSpec]);

  const [
    isDeleteConfirmationDialogOpen,
    setIsDeleteConfirmationDialogOpen,
  ] = useState(false);

  if (!isInstantiated) {
    return null;
  }
  return (
    <>
      <Dialog open={isOpen}>
        <DialogTitle>
          {isExistingUaSpec ? 'Edit user agent' : 'Add user agent'}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth={true}
            autoFocus={true}
            margin="normal"
            label="Name"
            placeholder="e.g. Google Chrome (Android)"
            value={editedUaSpec.name}
            onChange={getEditUaSpecHandler('name')}
          />
          <TextField
            fullWidth={true}
            margin="normal"
            multiline={true}
            rows={5}
            label="User agent string"
            placeholder="e.g. Mozilla/5.0 (Linux; Android 8.0.0; SM-G9600) ..."
            value={editedUaSpec.value}
            onChange={getEditUaSpecHandler('value')}
          />
          <TextField
            select={true}
            margin="normal"
            label="Form factor"
            value={editedUaSpec.deviceType}
            onChange={getEditUaSpecHandler('deviceType')}
            style={{minWidth: 150}}
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
        <DialogActions>
          {isExistingUaSpec && (
            <Button
              color="secondary"
              onClick={() => setIsDeleteConfirmationDialogOpen(true)}
              style={{
                marginLeft: 8,
                marginRight: 'auto',
              }}
            >
              Delete
            </Button>
          )}
          <Button color="primary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            color="primary"
            onClick={() => {
              onClose();
              if (isExistingUaSpec) {
                stateManager.updateUaSpec(editedUaSpec);
              } else {
                stateManager.addUaSpec(editedUaSpec);
              }
            }}
            disabled={
              editedUaSpec.name.trim().length === 0 ||
              editedUaSpec.value.trim().length === 0 ||
              _.isEqual(editedUaSpec, initialUaSpec)
            }
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {isExistingUaSpec && (
        <DeleteConfirmationDialog
          isOpen={isDeleteConfirmationDialogOpen}
          uaSpec={initialUaSpec}
          onClose={(didConfirm) => {
            setIsDeleteConfirmationDialogOpen(false);
            if (didConfirm) {
              onClose();
            }
          }}
        />
      )}
    </>
  );
}

/** An item in the list of UAs. */
const EditUaListItem = observer(({uaSpec}: {uaSpec: UaSpec}) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  return (
    <>
      <ListItem button={true} onClick={() => setIsEditDialogOpen(true)}>
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
            stateManager.moveUaSpecUp(uaSpec.id);
          }}
        >
          <ArrowUpward />
        </IconButton>
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            stateManager.moveUaSpecDown(uaSpec.id);
          }}
        >
          <ArrowDownward />
        </IconButton>
      </ListItem>

      <EditDialog
        isOpen={isEditDialogOpen}
        initialUaSpec={uaSpec}
        isExistingUaSpec={true}
        onClose={() => setIsEditDialogOpen(false)}
      />
    </>
  );
});

const EditUaListCard = observer(() => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [
    isResetConfirmationDialogOpen,
    setIsResetConfirmationDialogOpen,
  ] = useState(false);
  const [newUaSpecId, setNewUaSpecId] = useState('');

  return (
    <Paper>
      <CardTitle text="User agents" />
      <List>
        {stateManager.uaSpecList.map((uaSpec) => (
          <EditUaListItem key={uaSpec.id} uaSpec={uaSpec} />
        ))}
      </List>
      <CardActions>
        <Button
          color="primary"
          onClick={() => {
            setNewUaSpecId(uuidv4());
            setIsEditDialogOpen(true);
          }}
        >
          Add user agent
        </Button>
        <Button
          color="primary"
          onClick={() => setIsResetConfirmationDialogOpen(true)}
          disabled={stateManager.isUaSpecListSameAsDefault()}
          style={{marginLeft: 'auto'}}
        >
          Reset to default
        </Button>
      </CardActions>

      <EditDialog
        isOpen={isEditDialogOpen}
        initialUaSpec={{...NEW_UA_SPEC, id: newUaSpecId}}
        isExistingUaSpec={false}
        onClose={() => setIsEditDialogOpen(false)}
      />

      <ResetConfirmationDialog
        isOpen={isResetConfirmationDialogOpen}
        onClose={() => setIsResetConfirmationDialogOpen(false)}
      />
    </Paper>
  );
});

export default EditUaListCard;
