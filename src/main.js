import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity
} from "react-native";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";

import Routes from "../src/components/Routes";

class Main extends Component {
  render() {
    const { authData } = this.props;
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#1c313a" barStyle="light-content" />
        <Routes isLoggedIn={authData ? authData.isLoggedIn : false} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

mapStateToProps = state => ({
  authData: state.authReducer.authData
});

export default connect(
  mapStateToProps,
  null
)(Main);
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#455a64",
//     alignItems: "center",
//     justifyContent: "center"
//   )}
// }