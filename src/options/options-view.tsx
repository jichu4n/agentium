import AppBar from '@material-ui/core/AppBar';
import yellow from '@material-ui/core/colors/yellow';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';

const APP_BAR_THEME = createMuiTheme({
  palette: {
    primary: {
      main: yellow[800],
      contrastText: '#fff',
    },
  },
});

class OptionsView extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <MuiThemeProvider theme={APP_BAR_THEME}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" color="inherit">
                Agentium Settings
              </Typography>
            </Toolbar>
          </AppBar>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default OptionsView;
