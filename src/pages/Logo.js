import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";

class Logo extends Component {
  render() {
    return (
      <View style={styles.container}>
        {/* <Image
          style={{ width: 40, height: 70 }}
          source={require("../images/icon.png")}
        /> */}
        <Image
          style={{ width: 400, height: 150 }}
          source={require("../images/about.png")}
        />
        <Text style={styles.logoText}>Room Hub</Text>
      </View>
    );
  }
}
export default Logo;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  logoText: {
    // margin: 15,
    fontSize: 18,
    color: "rgba(255,255,255,0.7)"
  }
});
