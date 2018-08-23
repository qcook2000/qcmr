import firebase from 'firebase/app';
import '@firebase/firestore'

var FU = {};
FU.initd = false;
FU.init = () => {
  var config = {
    apiKey: "AIzaSyAcr_Yi9iV9cg7v9QLGfm3ugoorGdTtRo8",
    authDomain: "canmikeeatthis.firebaseapp.com",
    databaseURL: "https://canmikeeatthis.firebaseio.com",
    projectId: "canmikeeatthis",
    storageBucket: "canmikeeatthis.appspot.com",
    messagingSenderId: "860540540828"
  };
  firebase.initializeApp(config);
  FU.db = firebase.firestore();
  var settings = {timestampsInSnapshots: true};
  FU.db.settings(settings);
  FU.initd = true;
}; 

FU.timestampFromMoment = (value) => {
  return firebase.firestore.Timestamp.fromDate(value.toDate());
};

FU.Types = {
  ShortString: 0,
  LongString: 1,
  Number: 2,
  Date: 3,
  Boolean: 4
}

export default FU;