import React, { Component, createRef } from "react";
import { View, Text, StyleSheet, Dimensions, Alert } from "react-native";

import Animated, { Easing } from "react-native-reanimated";
import {
  TapGestureHandler,
  State,
  TextInput,
} from "react-native-gesture-handler";
import { navigate } from "@/Navigators/Root";

import Svg, { Image, Circle, ClipPath } from "react-native-svg";
import Images from "../../Theme/Images";
import { authActions } from "../../Store/auth/auth.action";
import { connect } from "react-redux";
const { width, height } = Dimensions.get("window");

const {
  concat,
  Value,
  event,
  block,
  cond,
  eq,
  set,
  Clock,
  startClock,
  stopClock,
  debug,
  timing,
  clockRunning,
  interpolate,
  Extrapolate,
} = Animated;

function runTiming(clock, value, dest) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  };

  const config = {
    duration: 1000,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease),
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      set(config.toValue, dest),
      startClock(clock),
    ]),
    timing(clock, state, config),
    cond(state.finished, debug("stop clock", stopClock(clock))),
    state.position,
  ]);
}
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };

    this.signIn = async () => {
      const { email, password } = this.state;

      try {
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
            {
              text: "OK",
              onPress: () => this.passwordTextInput.current.focus(),
            },
          ]);
        }
        this.props.login({ email, password });
      } catch (err) {
        console.log("error signing up: ", err);
      }
    };
    this.buttonOpacity = new Value(1);

    this.onStateChange = event([
      {
        nativeEvent: ({ state }) =>
          block([
            cond(
              eq(state, State.END),
              set(this.buttonOpacity, runTiming(new Clock(), 1, 0))
            ),
          ]),
      },
    ]);

    this.onCloseState = event([
      {
        nativeEvent: ({ state }) =>
          block([
            cond(
              eq(state, State.END),
              set(this.buttonOpacity, runTiming(new Clock(), 0, 1))
            ),
          ]),
      },
    ]);

    this.buttonY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [100, 0],
      extrapolate: Extrapolate.CLAMP,
    });

    this.bgY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [-height / 3 - 50, 0],
      extrapolate: Extrapolate.CLAMP,
    });

    this.textInputZindex = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, -1],
      extrapolate: Extrapolate.CLAMP,
    });
    this.textInputY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [0, 100],
      extrapolate: Extrapolate.CLAMP,
    });

    this.textInputOpacity = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, 0],
      extrapolate: Extrapolate.CLAMP,
    });

    this.rotateCross = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [180, 360],
      extrapolate: Extrapolate.CLAMP,
    });
  }
  emailTextInput = createRef();
  passwordTextInput = createRef();
  onChangeText = (key, val) => {
    this.setState({ [key]: val.trim() });
  };
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          justifyContent: "flex-end",
        }}
      >
        <Animated.View
          style={{
            ...StyleSheet.absoluteFill,
            transform: [{ translateY: this.bgY }],
          }}
        >
          <Svg height={height + 50} width={width}>
            <ClipPath id="clip">
              <Circle r={height + 50} cx={width / 2} />
            </ClipPath>
            <Image
              href={Images.login}
              width={width}
              height={height + 50}
              preserveAspectRatio="xMidYMid slice"
              clipPath="url(#clip)"
            />
          </Svg>
        </Animated.View>
        <View
          style={{
            height: height / 3,
            justifyContent: "center",
          }}
        >
          <TapGestureHandler onHandlerStateChange={this.onStateChange}>
            <Animated.View
              style={{
                ...styles.button,
                opacity: this.buttonOpacity,
                transform: [{ translateY: this.buttonY }],
              }}
            >
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>SIGN IN</Text>
            </Animated.View>
          </TapGestureHandler>
          <Animated.View
            style={{
              ...styles.button,
              backgroundColor: "#2E71DC",
              opacity: this.buttonOpacity,
              transform: [{ translateY: this.buttonY }],
            }}
          >
            <Text
              onPress={() => {
                navigate("Register");
              }}
              style={{ fontSize: 15, fontWeight: "bold", color: "white" }}
            >
              REGISTER
            </Text>
          </Animated.View>
          <Animated.View
            style={{
              height: height / 3,
              ...StyleSheet.absoluteFill,
              zIndex: this.textInputZindex,
              opacity: this.textInputOpacity,
              transform: [{ translateY: this.textInputY }],
              top: 20,
              justifyContent: "center",
            }}
          >
            <TapGestureHandler onHandlerStateChange={this.onCloseState}>
              <Animated.View
                style={styles.closeButton}
                onStartShouldSetResponder={() =>
                  this.setState({ email: "", password: "" })
                }
              >
                <Animated.Text
                  style={{
                    fontSize: 15,
                    transform: [{ rotate: concat(this.rotateCross, "deg") }],
                  }}
                >
                  X
                </Animated.Text>
              </Animated.View>
            </TapGestureHandler>
            <TextInput
              placeholder="EMAIL"
              style={styles.textInput}
              autoCapitalize="none"
              returnKeyType="next"
              returnKeyLabel="next"
              blurOnSubmit={false}
              ref={this.emailTextInput}
              onSubmitEditing={() => {
                this.passwordTextInput.current.focus();
              }}
              placeholderTextColor="black"
              onChangeText={(val) => {
                this.onChangeText("email", val);
              }}
            />
            <TextInput
              placeholder="PASSWORD"
              ref={this.passwordTextInput}
              secureTextEntry={true}
              autoCapitalize="none"
              returnKeyType="next"
              returnKeyLabel="next"
              blurOnSubmit={true}
              onSubmitEditing={() => {
                this.signIn();
              }}
              onChangeText={(val) => {
                this.onChangeText("password", val);
              }}
              style={styles.textInput}
              placeholderTextColor="black"
            />
            <Animated.View style={styles.button}>
              <Text
                onPress={this.signIn}
                style={{ fontSize: 15, fontWeight: "bold" }}
              >
                SIGN IN
              </Text>
            </Animated.View>
          </Animated.View>
        </View>
      </View>
    );
  }
}

mapDispatchToProps = {
  login: authActions.login,
};

export default connect(null, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "white",
    height: 60,
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.2,
    elevation: 2,
  },
  textInput: {
    height: 50,
    borderRadius: 25,
    borderWidth: 0.5,
    marginHorizontal: 20,
    backgroundColor: "#fff",
    paddingLeft: 10,
    marginVertical: 5,
    borderColor: "rgba(0, 0, 0, 0.2)",
  },
  closeButton: {
    height: 40,
    width: 40,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: -20,
    left: width / 2 - 20,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.2,
    elevation: 2,
  },
});
