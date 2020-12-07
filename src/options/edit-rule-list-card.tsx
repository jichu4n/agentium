import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {observer} from 'mobx-react';
import React from 'react';
import CardTitle from 'src/lib/card-title';
import {UaRule} from 'src/lib/ua-rule';
import stateManager from 'src/state/state-manager';

const EditRuleListItem = observer(({rule}: {rule: UaRule}) => {
  return (
    <ListItem button={true} onClick={() => {}}>
      <ListItemText primary="hello" />
    </ListItem>
  );
});

const EditRuleListCard = observer(() => {
  const uaRuleList = [
    ...stateManager.uaRuleListLocal,
    ...stateManager.uaRuleListSync,
  ];
  return (
    <Paper>
      <CardTitle text="Rules" />
      {uaRuleList.length > 0 ? (
        <List>
          {uaRuleList.map((uaRule) => (
            <EditRuleListItem key={uaRule.id} rule={uaRule} />
          ))}
        </List>
      ) : (
        <CardContent>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 8,
            }}
          >
            <Typography variant="body1" color="textSecondary">
              No rules configured
            </Typography>
          </div>
        </CardContent>
      )}
      <CardActions>
        <Button color="primary" onClick={() => {}}>
          Add rule
        </Button>
      </CardActions>
    </Paper>
  );
});

export default EditRuleListCard;
