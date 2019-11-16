import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { addRoom } from "../actions/authAction";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { clearError } from "../actions/errorAction";
import Loader from "../components/Loader";
class Testt extends Component {
  state = {
    form: {
      modal: false,
      firstname: "",
      lastname: "",
      email: "",
      password: ""
    }
  };
  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === "LOGIN_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    addRoom: PropTypes.func.isRequired
  };

  _onChange = (field, value) => {
    const form = this.state.form;
    this.setState({ form: { ...form, [field]: value } });
  };
  onSubmit = () => {
    console.log(firstname);
    // const fd = new FormData();
    // fd.append("image", this.state.selectedFile, this.state.selectedFile.name);
    const { firstname, lastname, email, password } = this.state.form;

    // Create user object
    const newUser = {
      firstname,
      lastname,
      email,
      password
    };

    // Attempt to register
    this.props.addRoom(this.state.form);
  };
  render() {
    const { firstname, lastname, email, password } = this.state.form;
    console.log(firstname);
    return (
      <View style={styles.container}>
        {addRoom.isLoading && <Loader />}
        <TextInput
          style={styles.inputBox}
          underlineColorAndroid="rgba(0,0,0,0)"
          name="firstname"
          placeholder="First Name"
          id="firstname"
          placeholderTextColor="#ffffff"
          selectionColor="#fff"
          keyboardType="email-address"
          value={firstname}
          onChangeText={value => this._onChange("firstname", value)}
          onSubmitEditing={() => this.password.focus()}
        />
        <TextInput
          style={styles.inputBox}
          underlineColorAndroid="rgba(0,0,0,0)"
          name="lastname"
          id="lastname"
          placeholder="Last Name"
          placeholderTextColor="#ffffff"
          value={lastname}
          onChangeText={value => this._onChange("lastname", value)}
          ref={input => (this.password = input)}
        />
        <TextInput
          style={styles.inputBox}
          underlineColorAndroid="rgba(0,0,0,0)"
          name="email"
          id="email"
          placeholder="Email"
          placeholderTextColor="#ffffff"
          value={email}
          onChangeText={value => this._onChange("email", value)}
          ref={input => (this.password = input)}
        />
        <TextInput
          style={styles.inputBox}
          underlineColorAndroid="rgba(0,0,0,0)"
          name="password"
          id="password"
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor="#ffffff"
          value={password}
          onChangeText={value => this._onChange("password", value)}
          ref={input => (this.password = input)}
        />
        <TouchableOpacity style={styles.button} onPress={this.onSubmit}>
          <Text style={styles.buttonText}> Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  addRoom: state.authReducer.addRoom,
  error: state.error
});
mapDispatchToProps = dispatch => ({
  dispatch
});

export default connect(
  mapStateToProps,
  { addRoom, clearError }
)(Testt);
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  inputBox: {
    width: 300,
    backgroundColor: "#808080",
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#ffffff",
    marginVertical: 8
  },
  button: {
    width: 300,
    backgroundColor: "#1c313a",
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 12
  },
  buttonText: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "500",
    textAlign: "center"
  }
});
