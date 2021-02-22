// // Import all needed modules.
// import * as functions from 'firebase-functions';
// import * as admin from 'firebase-admin';
// import * as algoliasearch from 'algoliasearch';

const functions = require("firebase-functions");

// The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");
// admin.initializeApp(functions.config().firebase);
// Set up Firestore.
admin.initializeApp();

// Authenticate to Algolia Database.
// TODO: Make sure you configure the `algolia.app_id` and `algolia.api_key` Google Cloud environment variables.
const algoliasearch = require("algoliasearch").default;
// const client = algoliasearch(functions.config().algolia.app_id, functions.config().algolia.api_key);

// const ALGOLIA_ID = functions.config().algolia.app_id;
// const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key;
const ALGOLIA_ID = "SVXVZO2ZW8";
const ALGOLIA_ADMIN_KEY = "c547904adb2ef2029e9824b310b9890b";
// const ALGOLIA_SEARCH_KEY = functions.config().algolia.search_key;
<<<<<<< HEAD
const ALGOLIA_INDEX_NAME = "woof";
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);
const index = client.initIndex("woof");
=======
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);
>>>>>>> 64900f2eb9700732fad5d5c3ea2a2c75788babe0

// Import all needed modules.

// Name fo the algolia index for Blog posts content.

// exports.onCommentCreated = functions.firestore.document('classes/{classesId}/videos/{videosId}/comments/{commentsId}').onCreate((snap, context) => {
//     // Get the note document
//     const comment = snap.data();

//     // Add an 'objectID' field which Algolia requires
//     comment.objectID = context.params.commentId;

//     // Write to the algolia index
//     const index = client.initIndex(ALGOLIA_INDEX_NAME);
//     return index.saveObject(comment);
//   });

//   var client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_SEARCH_KEY);
//   var index = client.initIndex('notes');

// Perform an Algolia search:
// https://www.algolia.com/doc/api-reference/api-methods/search/
// return index
//     .search({
//       query
//     })
//     .then(function(responses) {
//       // Response from Algolia:
//       // https://www.algolia.com/doc/api-reference/api-methods/search/#response-format
//       console.log(responses.hits);
//     });

// Updates the search index when new blog entries are created or updated.
// exports.indexentry = functions.database.ref('classes/{classesId}/videos/{videosId}/comments/{commentsId}').onCreate(
//     async (data, context) => {
//       const index = client.initIndex(ALGOLIA_INDEX_NAME);
//       const firebaseObject = {
//         text: data.after.val(),
//         objectID: context.params.commentId
//       };

//       await index.saveObject(firebaseObject);
//       return data.after.ref.parent.child('last_index_timestamp').set(Date.parse(context.timestamp));
//     });

// //Loading initial chats data
// exports.addChatsFirestoreDataToAlgolia = functions.https.onRequest((req, res) => {
//     var chatArray = [];
//     //Get all the documents from the Firestore collection called    //chats
//      admin.firestore().collection('classes/{classesId}/videos/{videosId}/comments/{commentsId}').get().then((docs) => {
//         //Get all the data from each document
//         console.log(docs)
//         docs.forEach((doc) => {
//         let chat = doc.data();
//         //As per the algolia rules, each object needs to have a key                        //called objectID (AS IS)
//         //If you do not set this, algolia will set a random id
//         chat.objectID = doc.id;
//         chatArray.push(chat);
//      })
//  return chatIndex.saveObjects(chatArray).then(() => {
//     console.log('Documents imported into Algolia');
//     return true;
//  }).catch(error => {
//     console.error('Error when importing documents into Algolia', error);
//     return true;
//    });
//   }).catch((error) => {
//    console.log('Error getting the chats collection', error)
//   })
//  })

exports.addToCommentIndex = functions.firestore
  .document("classes/{classesId}/videos/{videosId}/comments/{commentsId}")

  .onCreate((snapshot) => {
    const data = snapshot.data();
    const objectID = snapshot.id;

    const courseId = snapshot.ref.parent.parent.parent.parent.id;
    const videoId = snapshot.ref.parent.parent.id;
    const indexId = "classes:" + courseId + ":videos:" + videoId + ":comments";
    const index = client.initIndex(indexId);
    return index.saveObject({ ...data, objectID });
  });

exports.updateCommentIndex = functions.firestore
  .document("classes/{classesId}/videos/{videosId}/comments/{commentsId}")

  .onUpdate((change) => {
    const newData = change.after.data();
    const objectID = change.after.id;
    const courseId = change.after.ref.parent.parent.parent.parent.id;
    const videoId = change.after.ref.parent.parent.id;
    const indexId = "classes:" + courseId + ":videos:" + videoId + ":comments";
    const index = client.initIndex(indexId);

    return index.saveObject({ ...newData, objectID });
  });

// // Starts a search query whenever a query is requested (by adding one to the `/search/queries`
// // element. Search results are then written under `/search/results`.
// exports.searchentry = functions.database.ref('/search/queries/{queryid}').onCreate(
//     async (snap, context) => {
//       const index = client.initIndex(ALGOLIA_POSTS_INDEX_NAME);

//       const query = snap.val().query;
//       const key = snap.key;

//       const content = await index.search(query);
//       const updates = {
//         '/search/last_query_timestamp': Date.parse(context.timestamp),
//       };
//       updates[`/search/results/${key}`] = content;
//       return admin.database().ref().update(updates);
//     });
