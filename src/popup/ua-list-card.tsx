import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Radio from '@material-ui/core/Radio';
import Typography from '@material-ui/core/Typography';
import RadioButtonChecked from '@material-ui/icons/RadioButtonChecked';
import RadioButtonUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import {observer} from 'mobx-react';
import * as React from 'react';
import State from 'src/state/state';

@observer
class UaListCard extends React.Component<{}, {}> {
  render() {
    return (
      <Card>
        <CardContent className="card-header">
          <Typography variant="button" color="textSecondary">
            User agents
          </Typography>
        </CardContent>
        <List>
          {State.uaSpecList.map((uaSpec, idx) => (
            <ListItem
              key={idx}
              button={true}
              dense={true}
              onClick={() => State.setSelectedUaSpecIdx(idx)}
              selected={idx == State.selectedUaSpecIdx}
            >
              <Radio
                value={idx}
                color="default"
                icon={<RadioButtonUnchecked />}
                checkedIcon={<RadioButtonChecked />}
                checked={idx == State.selectedUaSpecIdx}
              />
              <ListItemText primary={uaSpec.name} />
            </ListItem>
          ))}
        </List>
        <CardActions>
          <Button color="primary">Edit user agents</Button>
        </CardActions>
      </Card>
    );
  }
}

export default UaListCard;
