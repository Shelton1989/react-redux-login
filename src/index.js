import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { 
  createStore, 
  combineReducers 
} from 'redux';
import { Provider } from 'react-redux';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import theme from './theme';

import authReducer from './reducers/authenticate-reducer';
import rememberReducer from './reducers/rememberme-reducer';
import updateUsernameReducer from './reducers/username-reducer';
import loginAttemptReducer from './reducers/loginattempt-reducer';
import notificationReducer from './reducers/notification-reducer';
import showNotificationReducer from './reducers/shownotification-reducer';
import loadingReducer from './reducers/loading-reducer';
import {
  loginAction, 
  logoutAction, 
  rememberMe, 
  dontRememberMe, 
  updateUsername,
  failedAttempt,
  successfulLogin,
  unsuccessfulLogin,
  showNotification,
  closeNotification,
  loading,
  loadingComplete,
} from './actions/authenticate-actions';

const defaultState = {
    username: '',
    auth: {authenticated: false},
    remember: {remember: false},
    attempt: {
      attempt: 0,
      cooldown: 0,
    },
    notification: {
      response: '', 
      message: ''
    },
    notify: {visibile: false},
    loading: {loading: false},
  };
//Comnbine Reducers
const allReducers = combineReducers({
    username: updateUsernameReducer,
    auth: authReducer,
    remember: rememberReducer,
    attempt: loginAttemptReducer,
    notification: notificationReducer,
    notify: showNotificationReducer,
    loading: loadingReducer,
  });
// Store
const store = createStore(
  allReducers, 
  defaultState, 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// Dispatch
store.dispatch(loginAction());
store.dispatch(logoutAction());
store.dispatch(rememberMe());
store.dispatch(dontRememberMe());
store.dispatch(updateUsername());
store.dispatch(failedAttempt());
store.dispatch(successfulLogin());
store.dispatch(unsuccessfulLogin());
store.dispatch(showNotification());
store.dispatch(closeNotification());
store.dispatch(loading());
store.dispatch(loadingComplete());


ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </Provider>, 
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
