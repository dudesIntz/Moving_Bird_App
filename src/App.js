import "react-native-gesture-handler";
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { store, persistor } from "@/Store";
import { SafeAreaView, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { ApplicationNavigator } from "@/Navigators";
import { navigationRef } from "@/Navigators/Root";
import { Layout } from "@/Theme";

import DropdownAlert from "react-native-dropdownalert";

import "./Translations";
import { dropdownAlertRef } from "./Utils";

const App = () => (
  <Provider store={store}>
    {/**
     * PersistGate delays the rendering of the app's UI until the persisted state has been retrieved
     * and saved to redux.
     * The `loading` prop can be `null` or any react instance to show during loading (e.g. a splash screen),
     * for example `loading={<SplashScreen />}`.
     * @see https://github.com/rt2zz/redux-persist/blob/master/docs/PersistGate.md
     */}
    <PersistGate loading={null} persistor={persistor}>
      <SafeAreaView style={Layout.fill}>
        <NavigationContainer ref={navigationRef}>
          <StatusBar barStyle="dark-content" />
          <ApplicationNavigator />
        </NavigationContainer>
        <DropdownAlert ref={dropdownAlertRef} closeInterval={6000} />
      </SafeAreaView>
    </PersistGate>
  </Provider>
);

export default App;
