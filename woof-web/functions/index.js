const functions = require("firebase-functions");

// The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");

// Set up Firestore.
admin.initializeApp();

// Authenticate to Algolia Database.
const algoliasearch = require("algoliasearch").default;

const ALGOLIA_ID = "SVXVZO2ZW8";
const ALGOLIA_ADMIN_KEY = "c547904adb2ef2029e9824b310b9890b";
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);

/**
 * Cloud function copies comment object onto Algolia index upon
 * comment creation. The index is labeled as
 * classes:<courseId>:videos:<videoId>:comments.
 */
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

/**
 * Cloud function updates comment object on Algolia index upon
 * comment update. The index is labeled as
 * classes:<courseId>:videos:<videoId>:comments.
 */
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
