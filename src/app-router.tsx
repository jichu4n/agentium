import * as React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import OptionsView from './options/options-view';
import PopupView from './popup/popup-view';

const AppRouter = () => (
  <Router>
    <div>
      <Route path="/popup.html" component={PopupView} />
      <Route path="/options.html" component={OptionsView} />
    </div>
  </Router>
);

export default AppRouter;
