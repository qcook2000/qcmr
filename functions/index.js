'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();


function incrementCounter(change, context) {
  const validNames = ['food-items'];
  if (!validNames.includes(context.params.collectionName)) return null;

  let increment;
  if (change.after.exists() && !change.before.exists()) {
    increment = 1;
  } else if (!change.after.exists() && change.before.exists()) {
    increment = -1;
  } else {
    return null;
  }

  // waits for this async event to complete before it exits.
  var counterPath = 'counters/' + context.params.collectionName;
  const writeResult = await admin.firestore().doc(counterPath).get().then(snap => {
    return admin.firestore().doc(counterPath).update({count: snap.count + increment});
  });
  console.log(writeResult);
}

// Keeps track of the length of the 'likes' child list in a separate property.
exports.countCollectionChange = functions.firestore.document('{collectionName}/{documentUid}').onWrite(incrementCounter);  




// If the number of likes gets deleted, recount the number of likes
exports.recountlikes = functions.database.ref('/counter/{counterName}').onDelete((snap, context) => {
  functions.firestore.document(context.params.counterName);
  const counterRef = snap.ref;
  const collectionRef = functions.firestore.collection(context.params.collectionName);

  // Return the promise from counterRef.set() so our function
  // waits for this async event to complete before it exits.
  return collectionRef.once('value').then((messagesData) => counterRef.set({count: messagesData.numChildren()}));
});


