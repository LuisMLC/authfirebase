import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyD8O1FPhOq1qiBvJ7AQIqqXc-NnIx24fyA',
  authDomain: 'authtest-8f2d9.firebaseapp.com',
  projectId: 'authtest-8f2d9',
  storageBucket: 'authtest-8f2d9.appspot.com',
  messagingSenderId: '258489840836',
  appId: '1:258489840836:web:01a9bf8b24b885ef040591',
};

const fb = firebase.initializeApp(firebaseConfig);

export default fb;
