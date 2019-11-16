import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ToastAndroid
} from "react-native";
import ajax from "../actions/auth.actions";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { compose } from "redux";
import { ActivityIndicator } from "react-native-paper";
import { logoutUser } from "../actions/auth.actions";
class Profile extends Component {
  logoutUser = () => {
    this.props.dispatch(logoutUser());
  };
  constructor() {
    super();
    this.state = {
      dataSource: [],
      isloading: true
    };
  }
  renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={{ flex: 1, flexDirection: "row", marginBottom: 10 }}
        onPress={() => ToastAndroid.show(item.image, ToastAndroid.SHORT)}
      >
        <Image
          style={{ width: 80, height: 80, margin: 5 }}
          source={{ uri: item.image }}
        />
        <View style={{ flex: 1, justifyContent: "center", marginleft: 5 }}>
          <Text style={{ fontSize: 18, color: "red", marginBottom: 14 }}>
            {item.firstname}
          </Text>
          <Text style={{ fontSize: 16, color: "black" }}>{item.address}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  renderSeparator = () => {
    return (
      <View
        style={{ height: 1, width: "100%", backgroundColor: "gray" }}
      ></View>
    );
  };
  async componentDidMount() {
    const url = "https://roomhub.herokuapp.com/api/users";
    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          dataSource: responseJson.data,
          isloading: false
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { dataSource } = this.state;
    console.log(dataSource);
    return this.state.isloading ? (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="Large" color="#330066" animating />
      </View>
    ) : (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={this.logoutUser}>
          <Text style={styles.buttonText}> Logout</Text>
        </TouchableOpacity>
        <FlatList
          data={this.state.dataSource}
          renderItem={this.renderItem}
          keyExtractor={item => item._id}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    );
  }
}
mapStateToProps = state => ({
  // getUser: state.userReducer.getUser
});

mapDispatchToProps = dispatch => ({
  dispatch
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  reduxForm({
    form: "register"
  })
)(Profile);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  button: {
    width: 300,
    backgroundColor: "#1c313a",
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#ffffff",
    textAlign: "center"
  }
});

//keyExtractor={(item,index)=>index}
