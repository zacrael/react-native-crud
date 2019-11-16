import React, { Component } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";

class Loader extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator color="#ffffff" />
      </View>
    );
  }
}
export default Loader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0, 0, 0, 0.06)",
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 99,
    justifyContent: "center"
  }
});
