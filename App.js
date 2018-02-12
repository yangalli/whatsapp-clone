import React from 'react';
import Rotas from './src/Rotas';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './src/reducers';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';


export default class App extends React.Component {
  
  componentWillMount() {
    let config = {
      apiKey: "AIzaSyBfLu_mKF1Nz4uXzUVrrDM0GMNwWNXMOVU",
      authDomain: "whatsapp-clone-d0093.firebaseapp.com",
      databaseURL: "https://whatsapp-clone-d0093.firebaseio.com",
      projectId: "whatsapp-clone-d0093",
      storageBucket: "whatsapp-clone-d0093.appspot.com",
      messagingSenderId: "555400807652"
    };
    firebase.initializeApp(config);
  }
  
  
  render() {
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <Rotas />
      </Provider>
    );
  }
}
