import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as ImagePicker from "expo-image-picker";

export const Add = ({ navigation }) => {
  const [hasCameraPermission, setHasCameraPermission] =
    useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] =
    useState(null);
  //   const [camera, setCamera] = useState(null);
  const cameraRef = useRef(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(CameraType.back);

  useEffect(() => {
    (async () => {
      const cameraStatus =
        await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");

      //   const galleryPermissions =
      //     await ImagePicker.requestPermissionsAsync();

      //   setHasGalleryPermission(
      //     galleryPermissions.status === "granted"
      //   );
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const data = await cameraRef.current.takePictureAsync(
        null
      );
      setImage(data.uri);
      console.log(data.uri);
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  if (
    hasCameraPermission === null
    // &&
    // hasGalleryPermission === null
  ) {
    return <View />;
  }
  if (
    hasCameraPermission === false
    //  &&
    // hasGalleryPermission === false
  ) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <Camera
          ref={cameraRef}
          style={styles.fixedRatio}
          ratio="1:1"
          type={type}
        />
      </View>
      <Button
        style={{
          flex: 0.1,
          alignSelf: "flex-end",
          alignItems: "center",
        }}
        onPress={() => {
          setType(
            type === CameraType.back
              ? CameraType.front
              : CameraType.back
          );
        }}
        title="Flip"
      />
      <Button title="Take a picture" onPress={takePicture} />
      <Button title="Pick a picture" onPress={pickImage} />
      <Button
        title="Save a picture"
        onPress={() => navigation.navigate("Save", { image })}
      />
      {image && (
        <Image source={{ uri: image }} style={{ flex: 1 }} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraContainer: {
    flex: 1,
    flexDirection: "row",
  },

  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },
});
