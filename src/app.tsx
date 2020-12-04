import CssBaseline from '@material-ui/core/CssBaseline';
import {configure} from 'mobx';
import * as React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import 'fontsource-roboto/latin.css';
import './app.css';
import BackgroundView from './background/background-view';
import OptionsView from './options/options-view';
import PopupView from './popup/popup-view';

class App extends React.Component<{}, {}> {
  constructor(props: any) {
    super(props);
    configure({
      enforceActions: 'always',
    });
  }

  render() {
    return (
      <Router>
        <div>
          <CssBaseline />
          <Route path="/popup.html" component={PopupView} />
          <Route path="/background.html" component={BackgroundView} />
          <Route path="/options.html" component={OptionsView} />
        </div>
      </Router>
    );
  }
}

export default App;
