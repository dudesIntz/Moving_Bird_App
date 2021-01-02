import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
//import { IndexStartupContainer } from "@/Containers";
import { useSelector } from "react-redux";
import Login from "@/Containers/auth/login";
import Register from "@/Containers/auth/register";
import { MainNavigator } from ".";

const Stack = createStackNavigator();

// @refresh reset
const ApplicationNavigator = () => {
  return (
    <Stack.Navigator headerMode={"none"} initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen
        name="Main"
        component={MainNavigator}
        options={{
          animationEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default ApplicationNavigator;
