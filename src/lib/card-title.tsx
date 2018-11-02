import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import './card-title.css';

class CardTitle extends React.Component<{text: string}, {}> {
  render() {
    return (
      <CardContent className="card-title">
        <Typography
          variant="button"
          color="textSecondary"
          className="card-title-span"
        >
          {this.props.text}
        </Typography>
      </CardContent>
    );
  }
}

export default CardTitle;
