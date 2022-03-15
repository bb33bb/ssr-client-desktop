import "./App.css"

import Header from "./components/Header/Header"
import ProxyList from "./components/ProxyList/ProxyList"
import NewProxy from "./components/NewProxy/NewProxy"
import { Routes, Route, BrowserRouter } from "react-router-dom"
import DownloadClient from "./components/DownloadClient/DownloadClient"
import Settings from "./components/Settings/Settings"
import Logs from "./components/Logs/Logs"

import React, { Component } from "react"

export default class App extends Component {
  constructor(props) {
    super(props)
    this.setConfig = this.setConfig.bind(this)
    this.state = {
      title: "",
      showBackButton: false,
      bgColor: "white",
    }
  }

  setConfig(title, showBackButton, bgColor) {
    this.setState({
      title: title,
      showBackButton: showBackButton,
      bgColor: bgColor,
    })
  }

  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <Header
            title={this.state.title}
            showBackButton={this.state.showBackButton}
          />
          <div
            className="app-content"
            style={{ backgroundColor: this.state.bgColor }}
          >
            <Routes>
              <Route
                path="/"
                element={<ProxyList setConfig={this.setConfig} />}
              />
              <Route
                path="/new-proxy"
                element={<NewProxy setConfig={this.setConfig} />}
              />
              <Route
                path="/edit-proxy"
                element={<NewProxy setConfig={this.setConfig} />}
              />
              <Route
                path="/download"
                element={<DownloadClient setConfig={this.setConfig} />}
              />
              <Route
                path="/settings"
                element={<Settings setConfig={this.setConfig} />}
              />
              <Route
                path="/logs"
                element={<Logs setConfig={this.setConfig} />}
              />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    )
  }
}
