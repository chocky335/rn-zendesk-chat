// @flow

type Mode = "DISABLED" | "DEBUG" | "WARN" | "ERROR"
type ConfigInput = {|
  mode?: Mode,
  prefix?: string,
|}
type ConfigDefault = {|
  mode: Mode,
  prefix: ?string,
|}


const loggerConfig: ConfigDefault = {
  mode: "DISABLED",
  prefix: null,
}


class Logger {
  constructor({ mode, prefix }: ConfigInput) {
    let _mode: Mode = mode || loggerConfig.mode
    let _prefix: ?string = prefix || loggerConfig.prefix

    this.getConfig = (): ConfigDefault => ({ mode: _mode, prefix: _prefix })
    this.setConfig = (config: ConfigInput): void => {
      if (config.mode !== undefined) {
        _mode = config.mode
      }
      if (config.prefix !== undefined) {
        _prefix = config.prefix
      }
    }
  }

  getConfig = (): ConfigDefault => loggerConfig
  setConfig = ({ mode, prefix }: ConfigInput): void => {}

  LOG = (...arg: any): void => {
    switch (this.getConfig().mode) {
      case "DEBUG":
        /* eslint-disable-next-line no-console */
        console.log(...this.parseMessageWithPrefix(...arg))
        break

      case "DISABLED":
      case "WARN":
      case "ERROR":
      // no default
    }
  }

  WARN = (...arg: any): void => {
    switch (this.getConfig().mode) {
      case "DEBUG":
      case "WARN":
        /* eslint-disable-next-line no-console */
        console.warn(...this.parseMessageWithPrefix(...arg))
        break

      case "DISABLED":
      case "ERROR":
      // no default
    }
  }

  ERROR = (...arg: any): void => {
    switch (this.getConfig().mode) {
      case "DEBUG":
      case "WARN":
      case "ERROR":
        /* eslint-disable-next-line no-console */
        console.error(...this.parseMessageWithPrefix(...arg))
        break

      case "DISABLED":
      // no default
    }
  }

  parseMessageWithPrefix = (...argIn: any): any => {
    const { prefix } = this.getConfig()

    if (!prefix) {
      return argIn
    }

    const argOut = []
    argOut.push(`${prefix} `)

    for (let i = 0; i < argIn.length; i += 1) {
      argOut.push(argIn[i])
    }

    return argOut
  }
}


export default Logger
export type { Mode, ConfigInput as Config }
