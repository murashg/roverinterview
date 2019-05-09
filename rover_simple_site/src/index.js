import './bootstrap';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider } from '@material-ui/styles';
import App from './App';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './theme';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
  document.querySelector('#root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
/*
                    `.-:://+++++/:.
                   /+++++++++++++++:
         ---`      -//+++++` `-+++++.  -/+++/-`   :+//-   `-.     `-:////:`   .++:``..``
   :/:. -+++- ---`   -++++.   `+++++.`/++++++++. .+++++`  :++/  `-+++++++++. .++++/+++++:
   /+++``//:`/+++.  `++++:   `/++++/`+++++.`/+++ -+++++`  /+++``/++++-``/++/ /++++/++++++-
.--.-...::-.`:/:-   /+++/   ./++++:`/++++.  /+++`/++++-  `++++`/++++.`.:+++--++++/`:+++++`
/+++/ :++++++/-`   -++++-.:/++++:. .++++:   /+++`/++++`  :+++--+++++/++++/. /++++  `-::-.
 ...`-+++++++++/` `++++++++//:.`   -++++-  .+++: :++++` -+++: /++++:--..`  `++++-
     /++++++++++. :++++++++:`      -++++- `/+++` .++++.-+++:  :+++/    `.  -++++`
     :+++++/:::-``+++++:+++++:`    `/+++/-/++/.   /++++++/.   `/+++:--/++` :++++
      .---`      :++++: `/+++++-`   `:/++++/-`    `:+++/.       -/+++++:.  :++++
                `+++++-   ./+++++:-.--.`..`         ```           `..``     `..`
                .+++++`    `-+++++++++.
                 -/++/        -:///:-`
*/
