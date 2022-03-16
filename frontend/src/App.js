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
    this.updateTooltips = this.updateTooltips.bind(this)
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

  updateTooltips() {
    if (this.tooltipList) {
      this.tooltipList.forEach((tooltip) => {
        tooltip.dispose()
      })
    }
    var tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    )

    this.tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new window.Tooltip(tooltipTriggerEl)
    })

    this.tooltipList.forEach((tooltip) => {
      const config = tooltip._config
      config.fallbackPlacements = ["bottom"]
      config.offset = "0,15"
      config.animation = false
      const element = tooltip.getTipElement()
      element.classList.add("tooltip-custom")
      const innerElement = element.querySelector(".tooltip-inner")
      innerElement.style.backgroundColor = "#383838"
      innerElement.style.padding = "0.3em 0.8em"
      innerElement.style.fontSize = "0.8rem"
      innerElement.style.fontFamily = "RobotoMedium, sans-serif"
    })
  }

  componentWillUnmount() {
    if (this.tooltipList) {
      this.tooltipList.forEach((tooltip) => {
        tooltip.dispose()
      })
    }
  }

  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <Header
            title={this.state.title}
            showBackButton={this.state.showBackButton}
            updateTooltips={this.updateTooltips}
          />
          <div
            className="app-content"
            style={{ backgroundColor: this.state.bgColor }}
          >
            <Routes>
              <Route
                path="/"
                element={
                  <ProxyList
                    setConfig={this.setConfig}
                    updateTooltips={this.updateTooltips}
                  />
                }
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
