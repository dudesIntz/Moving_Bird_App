import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AnimatedTabBar from "curved-bottom-navigation-bar";
import Icon from "react-native-vector-icons/AntDesign";
import { Text } from "react-native";
import { Colors } from "../Theme";

const tabs = {
  Home: {
    icon: ({ progress }) => <Icon name={"home"} size={20} />,
  },
  Profile: {
    icon: ({ progress }) => <Icon name={"user"} size={20} />,
  },
};

const Tab = createBottomTabNavigator();

const Home = () => <Text>Home</Text>;

const MainNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => (
        <AnimatedTabBar barColor={Colors.primary} tabs={tabs} {...props} />
      )}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Home} />
    </Tab.Navigator>
  );
};

export default MainNavigator;
