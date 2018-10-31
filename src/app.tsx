import CssBaseline from '@material-ui/core/CssBaseline';
import * as React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import 'typeface-roboto';
import OptionsView from './options/options-view';
import PopupView from './popup/popup-view';

const App = () => (
  <Router>
    <div>
      <CssBaseline />
      <Route path="/popup.html" component={PopupView} />
      <Route path="/options.html" component={OptionsView} />
    </div>
  </Router>
);

export default App;
