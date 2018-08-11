import firebase from "@firebase/app";
import "@firebase/firestore";

var config = {
    apiKey: "AIzaSyAcr_Yi9iV9cg7v9QLGfm3ugoorGdTtRo8",
    authDomain: "canmikeeatthis.firebaseapp.com",
    databaseURL: "https://canmikeeatthis.firebaseio.com",
    projectId: "canmikeeatthis",
    storageBucket: "canmikeeatthis.appspot.com",
    messagingSenderId: "860540540828"
};

const app = firebase.initializeApp(config);
const firestore = firebase.firestore(app);

const settings = { timestampsInSnapshots: true};
firestore.settings(settings);

export default firestore;
