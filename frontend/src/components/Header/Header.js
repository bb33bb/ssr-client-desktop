import { Settings, GitHub, ArrowBack } from "@material-ui/icons"
import { useLocation, useNavigate } from "react-router-dom"
import "./Header.css"

import React, { Component } from "react"

class Header extends Component {
  componentWillUnmount() {
    if (this.tooltipList) {
      this.tooltipList.forEach((tooltip) => {
        tooltip.dispose()
      })
    }
  }

  componentDidUpdate() {
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
  
  render() {
    return (
      <header className="header">
        <div className="flex justify-start items-center gap-5">
          {this.props.showBackButton && (
            <ArrowBack
              fontSize="large"
              className="menu-icon"
              onClick={() => {
                this.props.navigate(-1)
              }}
            />
          )}
          <div className="text-[1.35rem] truncate max-w-[10em]">
            {this.props.title}
          </div>
        </div>
        <div className="flex justify-end items-center gap-3">
          <div
            data-bs-toggle="tooltip"
            title="SETTINGS"
            data-bs-placement="bottom"
            className="menu-icon p-1"
            style={
              this.props.location.pathname === "/download" ||
              this.props.location.pathname === "/settings"
                ? { visibility: "hidden" }
                : {}
            }
            onClick={() => {
              this.props.navigate("/settings")
            }}
          >
            <Settings fontSize="large" />
          </div>
          <div
            data-bs-toggle="tooltip"
            title="GITHUB"
            data-bs-placement="bottom"
            className="menu-icon p-1"
          >
            <GitHub
              style={{ fontSize: "1.9rem" }}
              onClick={() => {
                if (!window.go) return
                window.go.main.App.OpenGithub()
              }}
            />
          </div>
        </div>
      </header>
    )
  }
}

export default function (props) {
  const navigate = useNavigate()
  const location = useLocation()

  return <Header {...props} navigate={navigate} location={location} />
}
