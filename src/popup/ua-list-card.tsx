import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Radio from '@material-ui/core/Radio';
import Typography from '@material-ui/core/Typography';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import * as React from 'react';

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
          {[1, 2, 3, 4, 5, 6, 7].map((x) => (
            <ListItem key="1" button={true} dense={true}>
              <Radio
                value={x}
                color="default"
                name="foo"
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={<RadioButtonCheckedIcon />}
              />
              <ListItemText
                primary={`Internet Explorer ${x}`}
                secondary="Test"
              />
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
