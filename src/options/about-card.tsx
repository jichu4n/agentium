import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import CardTitle from 'src/lib/card-title';
import {browser} from 'webextension-polyfill-ts';
import './about-card.css';

class AboutCard extends React.Component<{}, {}> {
  render() {
    const manifest = browser.runtime.getManifest();
    return (
      <Paper>
        <CardTitle text="About" />
        <CardHeader
          avatar={<Avatar src="/icon-128.png" classes={{root: 'about-icon'}} />}
          title={manifest.name}
          subheader={manifest.version}
        />
        <Divider />
        <CardContent>
          <Typography gutterBottom={true} variant="subtitle2">
            Source code
          </Typography>
          <Typography gutterBottom={true} variant="body2">
            Agentium is open-source software distributed under the Apache 2.0
            License.
          </Typography>
          <Typography gutterBottom={true} variant="body2">
            Please feel free to fork &amp; contribute at{' '}
            <a href="https://github.com/jichu4n/agentium" target="_blank">
              github.com/jichu4n/agentium
            </a>
            .
          </Typography>
          <Typography>&nbsp;</Typography>

          <Typography gutterBottom={true} variant="subtitle2">
            Author
          </Typography>
          <Typography gutterBottom={true} variant="body2">
            Agentium is developed by Chuan Ji. Find me on:
            <ul>
              <li>
                Personal website:{' '}
                <a href="https://jichu4n.com" target="_blank">
                  jichu4n.com
                </a>
              </li>
              <li>
                GitHub:{' '}
                <a href="https://github.com/jichu4n" target="_blank">
                  github.com/jichu4n
                </a>
              </li>
            </ul>
          </Typography>
          <Typography>&nbsp;</Typography>

          <Typography variant="body2">
            Copyright &copy; 2018-2020 Chuan Ji.
          </Typography>
        </CardContent>
      </Paper>
    );
  }
}

export default AboutCard;
