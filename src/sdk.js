// @flow

import { NativeModules } from "react-native"

import Logger from "./logger"
import type { Config as LoggerConfig, Mode as LoggerMode } from "./logger"

const { ZendeskChatManager } = NativeModules


type UserData = {
  email?: string,
  name?: string,
  phone?: string,
  shouldPersist?: bool,
}


const loggerConfig: LoggerConfig = {
  mode: "DISABLED",
  prefix: "[ZDC_SDK]",
}


class ZendeskChatSDK {
  constructor() {
    let _initialized: bool = false
    let _key: ?string = null
    let _user: ?UserData = null

    this.getInitialized = () => _initialized

    this.setKey = (key: ?string) => {
      _key = key
      _initialized = true
    }
    this.getKey = () => _key

    this.setUserData = (user: UserData) => { _user = user }
    this.getUserData = () => _user

    this.initializeLogger()
  }

  getInitialized = () => false

  setKey = (key: ?string) => {}
  getKey = () => null

  setUserData = (user: UserData) => {}
  getUserData = () => null

  setLoggerConfig = (config: LoggerConfig) => {}
  setLoggerMode = (mode: LoggerMode) => {}
  setLoggerPrefix = (prefix: string) => {}

  log = (...arg: any) => {}
  warn = (...arg: any) => {}
  error = (...arg: any) => {}

  initializeLogger() {
    const _logger: Logger = new Logger(loggerConfig)

    this.setLoggerConfig = (config: LoggerConfig) =>
      _logger.setConfig(config)
    this.setLoggerMode = (mode: LoggerMode) =>
      _logger.setConfig({ mode })
    this.setLoggerPrefix = (prefix: string) =>
      _logger.setConfig({ prefix })

    this.log = _logger.LOG
    this.warn = _logger.WARN
    this.error = _logger.ERROR
  }

  init = (key: ?string): void => {
    ZendeskChatManager.initialize(key)

    this.log(`Initialized Account key: ${JSON.stringify(key)}`)
    this.setKey(key)
  }

  setUser = (user: UserData): void => {
    ZendeskChatManager.setUser(user)

    this.log(`Setuped chat visitor's info: ${JSON.stringify(user)}`)
    this.setUserData(user)
  }

  openChatModal = async (): Promise<bool> => {
    const isInitialized = this.getInitialized()
    if (isInitialized) {
      try {
        const status = await ZendeskChatManager.start()

        if (status) {
          this.log("Chat modal successfully opened")
        } else {
          this.log("UNKNOWN ERROR", "Something went wrong")
        }

        return status
      } catch (error) {
        this.error(error)

        return false
      }
    } else {
      this.warn("Acount key is not initialized")

      return false
    }
  }
}

const ZendeskChatSDKInstance = new ZendeskChatSDK()

export default ZendeskChatSDKInstance
