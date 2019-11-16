import React, { Component } from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import Routes from "./src/components/Routes";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Main from "./src/main";
import persist from "./src/config/store";
const persistStore = persist();
// import Navigator from "./screen";
class App extends Component {
  render() {
    return (
      <Provider store={persistStore.store}>
        <PersistGate loading={null} persistor={persistStore.persistor}>
          <Main />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#455a64",
    alignItems: "center",
    justifyContent: "center"
  }
});
{
  /* <View style={styles.container}>
        <StatusBar backgroundColor="black" barStyle="light-content" />
        <Routes />
      </View> */
}

// class App extends Component {
//   render() {
//     return (
//       <Provider store={persistStore.store}>
//         <PersistGate loading={null} persistor={persistStore.persistor}>
//           <Main />
//         </PersistGate>
//       </Provider>
//     );
//   }
// }
