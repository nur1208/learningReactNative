import firebase from "firebase";
import {
  USER_POST_STATE_CHANGE,
  USER_STATE_CHANGE,
} from "../constants";

export const fetchUser = () => {
  return (dispatch) => {
    console.log(firebase.auth().currentUser.uid);

    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          dispatch({
            type: USER_STATE_CHANGE,
            currentUser: snapshot.data(),
          });
        } else {
          console.log("dons not exist");
        }
      });
  };
};

export const fetchUserPosts = () => {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(firebase.auth().currentUser.uid)
      .collection("userPosts")
      .orderBy("creation", "asc")
      .get()
      .then((snapshot) => {
        const posts = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });

        dispatch({
          type: USER_POST_STATE_CHANGE,
          posts,
        });
      });
  };
};
