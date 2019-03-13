import firebase from 'firebase';
import React, { Component } from 'react';



export const initializeFirebase = () => {
  firebase.initializeApp({
    messagingSenderId: "your messagingSenderId"
  });
}


navigator.serviceWorker
    .register('/my-sw.js')
    .then((registration) => {
      firebase.messaging().useServiceWorker(registration);
    });
}