import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Radio from '@material-ui/core/Radio';
import RadioButtonChecked from '@material-ui/icons/RadioButtonChecked';
import RadioButtonUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import {observer} from 'mobx-react';
import * as React from 'react';
import CardTitle from 'src/lib/card-title';
import DeviceTypeIcon from 'src/lib/device-type-icon';
import openOptionsPage from 'src/lib/open-options-page';
import State from 'src/state/state';

@observer
class UaListCard extends React.Component<{}, {}> {
  render() {
    return (
      <Card>
        <CardTitle text="User agents" />
        <List>
          {State.uaSpecList.map((uaSpec) => (
            <ListItem
              key={uaSpec.id}
              button={true}
              dense={true}
              onClick={() => State.setSelectedUaSpecId(uaSpec.id)}
              selected={uaSpec.id === State.selectedUaSpecId}
            >
              <Radio
                value={uaSpec.id}
                color="default"
                icon={<RadioButtonUnchecked />}
                checkedIcon={<RadioButtonChecked />}
                checked={uaSpec.id === State.selectedUaSpecId}
              />
              <ListItemText primary={uaSpec.name} />
              <ListItemIcon>
                <DeviceTypeIcon deviceType={uaSpec.deviceType} />
              </ListItemIcon>
            </ListItem>
          ))}
        </List>
        <CardActions>
          <Button color="primary" onClick={openOptionsPage}>
            Edit user agents
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default UaListCard;
