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
import { login } from "../actions/authAction";
class Login1 extends Component {
  state = {
    form: {
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
    login: PropTypes.func.isRequired
  };

  _onChange = (field, value) => {
    const form = this.state.form;
    this.setState({ form: { ...form, [field]: value } });
  };
  onSubmit = () => {
    // const fd = new FormData();
    // fd.append("image", this.state.selectedFile, this.state.selectedFile.name);
    const { email, password } = this.state.form;

    // Create user object
    const newUser = {
      email,
      password
    };

    // Attempt to register
    this.props.login(this.state.form);
  };
  render() {
    const { email, password } = this.state.form;
    const { handleSubmit, loginUser } = this.props;

    return (
      <View style={styles.container}>
        {loginUser && loginUser.isLoading && <Loader />}
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
  loginUser: state.authReducer.loginUser,
  addRoom: state.authReducer.addRoom,
  error: state.error
});
mapDispatchToProps = dispatch => ({
  dispatch
});

export default connect(
  mapStateToProps,
  { login, clearError }
)(Login1);
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
