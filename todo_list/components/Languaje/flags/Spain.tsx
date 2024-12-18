import React from "react";
import { Image, StyleSheet } from "react-native";

const Spain = ({
  width = 45,
  height = 45,
}: {
  width?: number;
  height?: number;
}) => {
  return (
    <Image
      source={{
        uri: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Spain.svg",
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

export default Spain;
