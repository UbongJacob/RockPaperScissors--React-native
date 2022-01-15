import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import AppText from "./AppText";

function ImageDisplayClicker({ image, text, onPress }) {
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <Image source={image} style={styles.image} />
        <AppText>{text}</AppText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    margin: 10,
    height: 160,
    width: 160,
    borderRadius: 80,
  },
});

export default ImageDisplayClicker;
