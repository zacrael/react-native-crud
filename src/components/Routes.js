import React, { Component } from "react";
import { Router, Stack, Scene } from "react-native-router-flux";

import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Profile from "../pages/Profile";
import Addroom from "../pages/Addroom";
import Testt from "../pages/testt";
import Login1 from "../pages/login1";
class Routes extends Component {
  render() {
    return (
      <Router>
        <Scene>
          <Scene key="root" hideNavBar={true} initial={!this.props.isLoggedIn}>
            {/* <Scene key="login1" component={Login1} initial={true} /> */}
            <Scene key="login" component={Login} initial={true} />
            {/* <Scene key="testt" component={Testt} initial={true} /> */}
            <Scene key="signup" component={Signup} title="Register" />
            <Scene key="signup" component={Signup} />
          </Scene>
          <Scene key="app" hideNavBar={true} initial={this.props.isLoggedIn}>
            <Scene key="profile" component={Profile} />
          </Scene>
        </Scene>
      </Router>
    );
  }
}
export default Routes;
