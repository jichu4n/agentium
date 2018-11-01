import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import './toggle-enabled-card.css';

class ToggleEnabledCard extends React.Component<{}, {}> {
  render() {
    return (
      <Card>
        <CardActionArea>
          <CardMedia
            component="img"
            className="toggle-enabled-button"
            image="/power-inactive.png"
            title="Enable"
          />
        </CardActionArea>
        <Divider />
        <CardContent>
          <Typography
            gutterBottom={true}
            variant="h6"
            component="h2"
            color="textSecondary"
          >
            Disabled
          </Typography>
          <Typography component="p" color="textSecondary">
            Using browser default user agent
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

export default ToggleEnabledCard;
