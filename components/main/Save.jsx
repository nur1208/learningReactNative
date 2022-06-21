import React, { useState } from "react";
import { View, TextInput, Image, Button } from "react-native";
import firebase from "firebase";

require("firebase/firestore");
require("firebase/firebase-storage");

export const Save = (props) => {
  const [caption, setCaption] = useState("");

  const uploadImage = async () => {
    const uri = props.route.params.image;
    const response = await fetch(uri);
    const blob = await response.blob();
    const childPath = `post/${
      firebase.auth().currentUser.uid
    }/${Math.random().toString(36)}`;
    console.log({ childPath });

    const task = firebase
      .storage()
      .ref()
      .child(childPath)
      .put(blob);

    const taskProgress = (snapshot) => {
      console.log(`transferred: ${snapshot.bytesTransferred}`);
    };

    const taskCompleted = () => {
      task.snapshot.ref
        .getDownloadURL()
        .then((snapshot) => {
          savePostData(snapshot);
          console.log(snapshot);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    const taskError = (snapshot) => {
      console.log(snapshot);
    };

    task.on(
      "state_chaged",
      taskProgress,
      taskError,
      taskCompleted
    );
  };

  const savePostData = (downloadURL) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(firebase.auth().currentUser.uid)
      .collection("userPosts")
      .add({
        downloadURL,
        caption,
        creation:
          firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        props.navigation.popToTop();
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <Image
        source={{ uri: props.route.params.image }}
        style={{ flex: 1 }}
      />
      <TextInput
        placeholder="Write a Caption..."
        onChangeText={(caption) => setCaption(caption)}
      />
      <Button title="Save" onPress={uploadImage} />
    </View>
  );
};
