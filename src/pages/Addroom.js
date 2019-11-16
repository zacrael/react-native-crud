import * as React from "react";
import { Button, Image, View, TouchableOpacity, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { compose } from "redux";

import Logo from "./Logo";
import Form from "../components/Form";
import InputText from "../components/InputText";
import { createNewUser } from "../actions/auth.actions";
import Loader from "../components/Loader";
import { ErrorUtils } from "../utils.js/auth.utils";

import { Actions } from "react-native-router-flux";

class Addroom extends React.Component {
  state = {
    image: null,
    urii: null,
    types: null,
    value: null
  };
  createNewUser = async values => {
    try {
      const response = await this.props.dispatch(createNewUser(values));
      if (!response.success) {
        throw response;
      }
    } catch (error) {
      const newError = new ErrorUtils(error, "Signup Error");
      newError.showAlert();
    }
  };

  onSubmit = values => {
    this.createNewUser(values);
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
        {touched && error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    );
  };
  render() {
    let { image, urii } = this.state;
    const { handleSubmit, createUser } = this.props;

    console.log(urii);
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Field
          name="firstname"
          placeholder="FirstName"
          component={this.renderTextInput}
        />
        <Field
          name="lastname"
          placeholder="LastName"
          component={this.renderTextInput}
        />
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
        <Field
          name="image"
          ref="image"
          value={this.state.urii}
          onChange={urii => this.setState({ urii })}
          component={this.renderTextInput}
        />
        <TouchableOpacity
          style={{
            width: 300,
            backgroundColor: "#87cefa",
            borderRadius: 10,
            marginVertical: 10,
            paddingVertical: 13
          }}
          onPress={handleSubmit(this.onSubmit)}
        >
          <Text
            style={{
              buttonText: {
                fontSize: 16,
                fontWeight: "500",
                color: "#ffffff",
                textAlign: "center"
              }
            }}
          >
            Signup
          </Text>
        </TouchableOpacity>
        <Button
          title="Pick an image from camera roll"
          onPress={this._pickImage}
        />
        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}
      </View>
    );
  }

  componentDidMount() {
    // this.getPermissionAsync();
  }

  // getPermissionAsync = async () => {
  //   if (Constants.platform.ios) {
  //     const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  //     if (status !== "granted") {
  //       alert("Sorry, we need camera roll permissions to make this work!");
  //     }
  //   }
  // };

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3]
    });

    if (!result.cancelled) {
      this.setState({
        image: result.uri,
        value: result.uri,
        urii: result.uri,
        types: result.type
      });
    }
  };
}
mapStateToProps = state => ({
  createUser: state.authReducer.createUser
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
)(Addroom);
