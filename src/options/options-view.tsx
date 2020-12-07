import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import yellow from '@material-ui/core/colors/yellow';
import Grid from '@material-ui/core/Grid';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, {PropsWithChildren} from 'react';
import {Helmet} from 'react-helmet';
import AboutCard from './about-card';
import EditUaListCard from './edit-ua-list-card';
import EditRuleListCard from './edit-rule-list-card';
import './options-view.css';

const APP_BAR_THEME = createMuiTheme({
  palette: {
    primary: {
      main: yellow[800],
      contrastText: '#fff',
    },
  },
});

function CardWrapper({children}: PropsWithChildren<{}>) {
  return (
    <Grid item={true} xs={12} md={10} lg={8}>
      {children}
    </Grid>
  );
}

function OptionsView() {
  return (
    <div>
      <Helmet>
        <title>Settings</title>
        <body className="options-view" />
      </Helmet>
      <MuiThemeProvider theme={APP_BAR_THEME}>
        <AppBar position="fixed">
          <Toolbar>
            <Avatar src="/icon-128.png" classes={{root: 'appbar-icon'}} />
            <Typography variant="h6" color="inherit">
              Settings
            </Typography>
          </Toolbar>
        </AppBar>
      </MuiThemeProvider>
      <Grid
        container={true}
        spacing={2}
        direction="row"
        justify="center"
        alignItems="center"
        classes={{
          root: 'options-cards-container',
        }}
      >
        <CardWrapper>
          <EditUaListCard />
        </CardWrapper>
        <CardWrapper>
          <EditRuleListCard />
        </CardWrapper>
        <CardWrapper>
          <AboutCard />
        </CardWrapper>
      </Grid>
    </div>
  );
}

export default OptionsView;
