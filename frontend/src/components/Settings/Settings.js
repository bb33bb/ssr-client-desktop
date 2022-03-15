import React, { Component } from "react"

export default class Settings extends Component {
  constructor(props) {
    super(props)
    props.setConfig("Settings", true, "#00000000")
  }

  render() {
    return <div className="p-3">NOT IMPLEMENTED YET!</div>
  }
}
