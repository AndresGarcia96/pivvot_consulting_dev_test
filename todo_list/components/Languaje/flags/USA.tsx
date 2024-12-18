import React from "react";
import { Image, StyleSheet } from "react-native";

const USA = ({
  width = 45,
  height = 45,
}: {
  width?: number;
  height?: number;
}) => {
  return (
    <Image
      source={{
        uri: "https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg",
      }}
      style={[styles.flag, { width, height }]}
    />
  );
};

const styles = StyleSheet.create({
  flag: {
    resizeMode: "contain",
  },
});

export default USA;
