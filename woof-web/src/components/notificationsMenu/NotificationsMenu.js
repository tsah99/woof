import React, { useContext } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import AuthContext from "../../contexts/AuthContext";
import firebase from "firebase/app";
import Notification from "../notification/Notification.js";
import "./NotificationsMenu.css";

/**
 * Borrowed from https://cloud.google.com/firestore/docs/manage-data/delete-data#node.js_2
 * @param firestore a reference to firebase.firestore()
 * @param collectionRef a reference to the firestore collection "notifications" for current user
 * @param batchSize a positive integer for the number of docs to delete at once
 */
async function clearNotifications(firestore, collectionRef, batchSize) {
  const query = collectionRef.limit(batchSize);

  return new Promise((resolve, reject) => {
    deleteQueryBatch(firestore, query, resolve).catch(reject);
  });
}

/**
 * Borrowed from https://cloud.google.com/firestore/docs/manage-data/delete-data#node.js_2
 * @param firestore a reference to firebase.firestore()
 * @param query the documents to be deleted
 * @param resolve
 */
async function deleteQueryBatch(firestore, query, resolve) {
  const snapshot = await query.get();

  const batchSize = snapshot.size;
  if (batchSize === 0) {
    // When there are no documents left, we are done
    resolve();
    return;
  }

  // Delete documents in a batch
  const batch = firestore.batch();
  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });
  await batch.commit();

  // Recurse on the next process tick, to avoid
  // exploding the stack.
  process.nextTick(() => {
    deleteQueryBatch(firestore, query, resolve);
  });
}

/**
 * This component houses the notifications menu, which is displayed after an onClick
 * to the notifications icon in the Header. It displays firestore data of each user's
 * notifications collection.
 */
function NotificationsMenu() {
  const authApi = useContext(AuthContext);

  const firestore = firebase.firestore();
  const notifsRef = firestore
    .collection("users")
    .doc(authApi.user.uid)
    .collection("notifications");

  let [notifications] = useCollectionData(
    notifsRef.orderBy("time_replied", "desc"),
    { idField: "id" }
  );

  return (
    <div>
      <div className="notificationsmenu-header">
        Notifications ({notifications ? notifications.length : 0})<br></br>
        <div
          className="notificationsmenu-clearall"
          onClick={() => clearNotifications(firestore, notifsRef, 16)}
        >
          Clear all
        </div>
      </div>
      {notifications && notifications.length ? (
        notifications.map((notification) => (
          <Notification notification={notification} notifsRef={notifsRef} />
        ))
      ) : (
        <div className="notificationsmenu-empty">
          ~No notifications to display~
        </div>
      )}
    </div>
  );
}

export default NotificationsMenu;
