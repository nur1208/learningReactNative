import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
} from "react-native";
import { useSelector } from "react-redux";
import firebase from "firebase";

export const Profile = (props) => {
  const [userPosts, setUserPosts] = useState([]);
  const [user, setUser] = useState(null);
  const { posts, currentUser } = useSelector(
    (state) => state.userState
  );
  useEffect(() => {
    if (
      props.route.params.uid === firebase.auth().currentUser.uid
    ) {
      setUserPosts(posts);
      setUser(currentUser);
    } else {
      firebase
        .firestore()
        .collection("users")
        .doc(props.route.params.uid)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            setUser(snapshot.data());
          } else {
            console.log("dons not exist");
          }
        });

      firebase
        .firestore()
        .collection("posts")
        .doc(props.route.params.uid)
        .collection("userPosts")
        .orderBy("creation", "asc")
        .get()
        .then((snapshot) => {
          const posts = snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data };
          });
          setUserPosts(posts);
        });
    }
  }, [props.route.params.uid]);

  if (user == null) return <View />;

  return (
    <View style={styles.container}>
      <View style={styles.containerInfo}>
        <Text>Profile</Text>
        <Text>{user && user.name}</Text>
      </View>
      <View style={styles.containerGallery}>
        {/* <Image
          style={styles.image}
          source={{ uri: posts[0].downloadURL }}
        /> */}
        <FlatList
          numColumns={3}
          horizontal={false}
          data={userPosts}
          renderItem={({ item }) => (
            <View style={styles.containerImage}>
              <Image
                style={styles.image}
                source={{ uri: item.downloadURL }}
              />
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
  containerInfo: {
    margin: 20,
  },
  containerGallery: { flex: 1 },
  containerImage: { flex: 1 / 3 },
  image: { flex: 1, aspectRatio: 1 / 1 },
});
