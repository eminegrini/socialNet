import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import { BrowserRouter } from "react-router-dom";
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase/app'
import 'firebase/auth'




var firebaseConfig = {
  apiKey: "AIzaSyA68Ci116ntaTr1Zg6pSnUy0ur2CfgyJhk",
  authDomain: "socialnet-93.firebaseapp.com",
  databaseURL: "https://socialnet-93.firebaseio.com",
  projectId: "socialnet-93",
  storageBucket: "socialnet-93.appspot.com",
  messagingSenderId: "628758818924",
  appId: "1:628758818924:web:061f217774d9f79d14e849",
  measurementId: "G-STGS8EZMQ7"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


ReactDOM.render(
  <BrowserRouter>
    <Routes />
  </BrowserRouter>
, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
