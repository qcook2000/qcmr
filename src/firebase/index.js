import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

//
// Init
//

const config = {
  apiKey: "AIzaSyAcr_Yi9iV9cg7v9QLGfm3ugoorGdTtRo8",
  authDomain: "canmikeeatthis.firebaseapp.com",
  databaseURL: "https://canmikeeatthis.firebaseio.com",
  projectId: "canmikeeatthis",
  storageBucket: "canmikeeatthis.appspot.com",
  messagingSenderId: "860540540828"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

//
// Auth Extensions
//

const auth = firebase.auth();

//
// DB Extensions
//

const db = firebase.firestore();
const settings = {timestampsInSnapshots: true};
db.settings(settings);

db.timestampFromMoment = (value) => {
  return firebase.firestore.Timestamp.fromDate(value.toDate());
};

db.timestampFromDate = (value) => {
  return firebase.firestore.Timestamp.fromDate(value);
};

db.Types = {
  ShortString: 0,
  LongString: 1,
  Number: 2,
  Date: 3,
  Boolean: 4,
  Reference: 5,
}

const collectionName = ''; // FILL WITH COLLECTION NAME
const data = [
  // FILL WITH BATCH DATA
];

db.uploadData = () => {
  for(var i = 0; i < data.length; i++) {
      db.collection(collectionName).add(data[i]).then(function(response) {
        console.log("Success!", response);
      }, function(error) {
        console.error("Failed!", error);
      });
  }
}

export {
  auth,
  db
};