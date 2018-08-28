import firebase from 'firebase/app';
import '@firebase/firestore';
// import moment from 'moment';

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

FU.timestampFromDate = (value) => {
  return firebase.firestore.Timestamp.fromDate(value);
};

FU.calculatedRender = (value, row) => {
  console.log(value, row);
  value = 'hi'
  if (row && row.rowData && row.rowData[3] && row.rowData[4]) {
    value = '' + (row.rowData[3] * row.rowData[4]);
  }
  return value;
}

FU.Types = {
  ShortString: 0,
  LongString: 1,
  Number: 2,
  Date: 3,
  Boolean: 4,
  Calculated: 5,
  Reference: 6,
}

const data = [
  {
    "name": "Ball Slams"
  },
];

FU.uploadData = () => {
  for(var i = 0; i < data.length; i++) {
      data[i].Date = new Date(data[i].Date)
      // console.log(data[i]);
      FU.db.collection("exercises").add(data[i]).then(function(response) {
          console.log("Success!", response);
        }, function(error) {
          console.error("Failed!", error);
        });
  }
}

FU.updateDataInCollection = () => {
  var collection = FU.db.collection('workoutsTest');
  collection.get().then(snapshot => {
    snapshot.forEach(doc => {
      FU.db.collection('workouts').doc().set({
     
      })
      .then(function() {
          console.log("Document successfully updated!");
      })
      .catch(function(error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
      });
    });
  })
  .catch(err => {
    console.log('Error getting documents', err);
  });
}

export default FU;