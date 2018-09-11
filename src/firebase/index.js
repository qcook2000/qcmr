import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

//
// Init
//

const config = {
  apiKey: "AIzaSyDV1VIjojv4GNUau4eya6sgwDdt3vh1bZY",
  authDomain: "qcmrsite.firebaseapp.com",
  databaseURL: "https://qcmrsite.firebaseio.com",
  projectId: "qcmrsite",
  storageBucket: "qcmrsite.appspot.com",
  messagingSenderId: "884006522500"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

//
// Auth Extensions
//

const auth = firebase.auth();
auth.getGoogleProvider = () => {
  return new firebase.auth.GoogleAuthProvider();
}

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

// const collectionName = ''; // FILL WITH COLLECTION NAME
// const data = [
//   // FILL WITH BATCH DATA
// ];

db.uploadData = () => {
  db.collection('workouts').onSnapshot(querySnapshot => {
    // Get a new write batch
    var batch = db.batch();
    querySnapshot.forEach(element => {
      batch.set(element, {exercise: db.collection('exercise').doc(element.data().exercise.id)});
    });
    // Commit the batch
    batch.commit().then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
    });
  });
}

export {
  auth,
  db
};