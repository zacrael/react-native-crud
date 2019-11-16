import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Alert
} from "react-native";
import { connect } from "react-redux";
import { compose } from "redux";
import { Field, reduxForm } from "redux-form";

import InputText from "../components/InputText";
import { loginUser } from "../actions/auth.actions";
import Logo from "./Logo";
import Form from "../components/Form";
import Loader from "../components/Loader";
import { Actions } from "react-native-router-flux";
import Addroom from "../pages/Addroom";
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fffafa",
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  signupTextCont: {
    flexGrow: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    paddingVertical: 16,
    flexDirection: "row"
  },
  signupText: {
    color: "#696969",
    fontSize: 16
  },
  signupButton: {
    color: "#87cefa",
    fontSize: 16,
    fontWeight: "500"
  },
  button: {
    width: 300,
    backgroundColor: "#87cefa",
    borderRadius: 10,
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

class Login extends Component {
  signup() {
    Actions.addroom();
  }

  loginUser = async values => {
    try {
      const response = await this.props.dispatch(loginUser(values));
      console.log(response);
      if (!response.success) {
        throw response;
      }
    } catch (error) {
      let errorText;
      if (error.message) {
        errorText = error.message;
      }
    }
  };

  onSubmit = values => {
    this.loginUser(values);
  };

  renderTextInput = field => {
    const {
      meta: { touched, error },
      label,
      secureTextEntry,
      maxLength,
      keyboardType,
      placeholder,
      input: { onChange, ...restInput }
    } = field;
    return (
      <View>
        <InputText
          onChangeText={onChange}
          maxLength={maxLength}
          placeholder={placeholder}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          label={label}
          {...restInput}
        />
        {touched && { error } && <Text style={styles.errorText}>{error}</Text>}
      </View>
    );
  };

  render() {
    const { handleSubmit, loginUser } = this.props;

    return (
      <View style={styles.container}>
        {loginUser && loginUser.isLoading && <Loader />}
        <Logo />
        <Field
          name="email"
          placeholder="Email"
          component={this.renderTextInput}
        />
        <Field
          name="password"
          placeholder="Password"
          secureTextEntry={true}
          component={this.renderTextInput}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(this.onSubmit)}
        >
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <View style={styles.signupTextCont}>
          <Text style={styles.signupText}>Do not have an account yet?</Text>
          <TouchableOpacity onPress={this.signup}>
            <Text style={styles.signupButton}> Signup</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = "Email is required";
  }
  if (!values.password) {
    errors.password = "password is required";
  }
  return errors;
};

mapStateToProps = state => ({
  loginUser: state.authReducer.loginUser
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
    form: "login",
    validate
  })
)(Login);
