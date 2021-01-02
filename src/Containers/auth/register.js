// SignUp.js
import React, { createRef } from "react";
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  Dimensions,
  Text,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { navigate } from "@/Navigators/Root";

import Svg, {
  Circle,
  Defs,
  LinearGradient,
  Stop,
  Text as SVGText,
} from "react-native-svg";
import LinearGradientButton from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome";
import { Colors, Common } from "../../Theme";
import { TouchableOpacity } from "react-native-gesture-handler";
import { authActions } from "../../Store/auth/auth.action";
import { connect } from "react-redux";
const { width, height } = Dimensions.get("window");

class SignUp extends React.Component {
  state = {
    username: "",
    password: "",
    email: "",
    phone_number: "",
  };
  userTextInput = createRef();
  emailTextInput = createRef();
  passwordTextInput = createRef();
  phoneTextInput = createRef();

  SVGheight = height / 3;
  onChangeText = (key, val) => {
    this.setState({ [key]: val });
  };
  signUp = async () => {
    const { username, password, email, phone_number } = this.state;
    try {
      if (!username) {
        return Alert.alert("Warning", "Username is Not Valid", [
          { text: "OK", onPress: () => this.userTextInput.current.focus() },
        ]);
      }
      if (
        !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          email
        )
      ) {
        return Alert.alert("Warning", "Email is Not Valid", [
          { text: "OK", onPress: () => this.emailTextInput.current.focus() },
        ]);
      }
      if (!password) {
        return Alert.alert("Warning", "Password is Not Valid", [
          { text: "OK", onPress: () => this.passwordTextInput.current.focus() },
        ]);
      }
      if (!phone_number || phone_number.toString().length !== 10) {
        return Alert.alert("Warning", "PhoneNumber is Not Valid", [
          { text: "OK", onPress: () => this.phoneTextInput.current.focus() },
        ]);
      }
      this.props.register({
        email,
        password,
        name: username,
        phonenumber: phone_number,
      });
    } catch (err) {
      console.log("error signing up: ", err);
    }
  };

  render() {
    return (
      // <KeyboardAvoidingView style={{ flex: 1 }} behavior="position">
      <View style={{ flex: 1, backgroundColor: Colors.white }}>
        <Svg height={this.SVGheight}>
          <Defs>
            <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
              <Stop offset="0" stopColor="#38d4a6" stopOpacity="1" />
              <Stop offset="1" stopColor="#2ec2b4" stopOpacity="1" />
            </LinearGradient>
          </Defs>
          <Circle cx={width / 2} r={"200"} fill="url(#grad)" />
          <SVGText
            fill={Colors.white}
            fontSize="40"
            fontWeight="bold"
            x={width / 2}
            y={this.SVGheight / 2.5}
            textAnchor="middle"
          >
            New Here ?
          </SVGText>
        </Svg>
        <View style={styles.container}>
          <View style={styles.inputField}>
            <Icon
              name="user-circle"
              style={{ width: 50, textAlign: "center" }}
              size={30}
              color={Colors.primary}
            />
            <TextInput
              placeholder="Username"
              style={[Common.textInput, styles.input]}
              autoCapitalize="none"
              blurOnSubmit={false}
              onSubmitEditing={() => {
                this.passwordTextInput.current.focus();
              }}
              returnKeyType="next"
              returnKeyType="next"
              ref={this.userTextInput}
              placeholderTextColor={Colors.gray}
              onChangeText={(val) => this.onChangeText("username", val)}
            />
          </View>
          <View style={styles.inputField}>
            <Icon
              name="unlock-alt"
              style={{ width: 50, textAlign: "center" }}
              size={30}
              color={Colors.primary}
            />
            <TextInput
              placeholder="Password"
              returnKeyType="next"
              returnKeyLabel="next"
              blurOnSubmit={false}
              onSubmitEditing={() => {
                this.emailTextInput.current.focus();
              }}
              secureTextEntry={true}
              ref={this.passwordTextInput}
              style={[Common.textInput, styles.input]}
              autoCapitalize="none"
              placeholderTextColor={Colors.gray}
              onChangeText={(val) => this.onChangeText("password", val)}
            />
          </View>
          <View style={styles.inputField}>
            <Icon
              name="envelope"
              style={{ width: 50, textAlign: "center" }}
              size={25}
              color={Colors.primary}
            />
            <TextInput
              style={[Common.textInput, styles.input]}
              placeholder="Email"
              blurOnSubmit={false}
              ref={this.emailTextInput}
              returnKeyType="next"
              returnKeyLabel="next"
              blurOnSubmit={false}
              onSubmitEditing={() => {
                this.phoneTextInput.current.focus();
              }}
              autoCapitalize="none"
              placeholderTextColor={Colors.gray}
              onChangeText={(val) => this.onChangeText("email", val)}
            />
          </View>
          <View style={styles.inputField}>
            <Icon
              name="mobile"
              style={{ width: 50, textAlign: "center" }}
              size={40}
              color={Colors.primary}
            />
            <TextInput
              style={[Common.textInput, styles.input]}
              placeholder="Phone Number"
              ref={this.phoneTextInput}
              autoCapitalize="none"
              returnKeyType="done"
              returnKeyLabel="done"
              onSubmitEditing={() => {
                this.signUp();
              }}
              placeholderTextColor={Colors.gray}
              onChangeText={(val) => this.onChangeText("phone_number", val)}
            />
          </View>
          <View style={styles.inputField}>
            <TouchableOpacity
              style={{
                flex: 0.7,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={this.signUp}
            >
              <LinearGradientButton
                colors={["#38d4a6", "#2ec2b4"]}
                style={styles.linearGradient}
              >
                <Text style={styles.buttonText}>Sign Up</Text>
              </LinearGradientButton>
            </TouchableOpacity>
          </View>
          <View style={styles.inputField}>
            <Text style={{ color: Colors.gray }}>
              Already Registered?{" "}
              <Text
                onPress={() => navigate("Login")}
                style={{
                  color: Colors.primary,
                  textDecorationLine: "underline",
                }}
              >
                Sign In
              </Text>
            </Text>
          </View>
        </View>
      </View>
      // </KeyboardAvoidingView>
    );
  }
}

mapDispatchToProps = {
  register: authActions.register,
};

export default connect(null, mapDispatchToProps)(SignUp);

const styles = StyleSheet.create({
  input: {
    flex: 1,
    height: 50,
    margin: 10,
    padding: 8,
    borderRadius: 14,
    borderWidth: 0,
    fontSize: 14,
    fontWeight: "500",
    textAlign: "left",
    elevation: 5,
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  buttonText: {
    flex: 1,
    fontSize: 18,
    fontFamily: "Gill Sans",
    textAlign: "center",
    margin: 10,
    color: "#ffffff",
    backgroundColor: "transparent",
  },
  inputField: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});
