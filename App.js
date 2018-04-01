// @flow

import React, { Component } from "react"
import {
  StyleSheet,
  Text,
  View,
  NativeModules,
  TouchableOpacity,
} from "react-native"

import ZendeskChatSDK from "./src/sdk"


ZendeskChatSDK.setLoggerMode("DEBUG")
const { ZendeskChatManager } = NativeModules

window.test = ZendeskChatManager

type Props = {}

const colors = {
  darkGray: "#333333",
  lightGray: "#eee",
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  btn: {
    width: 100,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.lightGray,
    borderRadius: 3,
    marginBottom: 5,
  },
  btnText: {
    textAlign: "center",
    color: colors.darkGray,
  },
})

export default class App extends Component<Props> {
  setKey = () => {
    ZendeskChatSDK.init("583BgUYka2R2mchvfE4G1dXvzobd2V4D")
  }
  setUser = () => {
    const user = {
      name: "JILZEEE",
      email: "email@mail.com",
      phone: "+3561234567",
      shouldPersist: true,
    }

    ZendeskChatSDK.setUser(user)
  }
  start = async () => {
    ZendeskChatSDK.openChatModal()
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>

        <TouchableOpacity style={styles.btn} onPress={this.setKey}>
          <Text style={styles.btnText}>
            setKey
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={this.setUser}>
          <Text style={styles.btnText}>
            setUser
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={this.start}>
          <Text style={styles.btnText}>
            startChat
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}
