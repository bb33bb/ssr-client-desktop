import React, { Component } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import "./Logs.css"

const MAX_LINES = 50

class Logs extends Component {
  constructor(props) {
    super(props)
    props.setConfig(props.location.state.name, true, "black")
    this.onEvent = this.onEvent.bind(this)
    this.state = {
      logs: [],
    }
  }

  onEvent(id, time, type, message) {
    console.log("run log >>>>>>", id, time, type, message)
    if (id !== this.props.location.state.id) return
    this.setState((st) => {
      return {
        logs: [
          ...st.logs,
          {
            time: time,
            type: type,
            message: message,
          },
        ].slice(-MAX_LINES),
      }
    })
  }

  componentDidMount() {
    if (!window.go) return
    ;(async () => {
      const logs = await window.go.main.App.GetLogs(
        this.props.location.state.id
      )
      // console.log(logs)
      this.setState((st) => {
        return {
          logs: logs.slice(-MAX_LINES),
        }
      })
    })()
    if (!window.runtime) return
    window.runtime.EventsOn("run-log", this.onEvent)
  }

  componentWillUnmount() {
    if (!window.runtime) return
    window.runtime.EventsOff("run-log")
  }

  render() {
    return (
      <div className="logs">
        {this.state.logs.map((item) => {
          return (
            <div className="log text-xs px-1">
              <p>
                {new Date(item.time).toLocaleString()} {">"} {item.message}
              </p>
            </div>
          )
        })}
      </div>
    )
  }
}

export default function (props) {
  const navigate = useNavigate()
  const location = useLocation()

  return <Logs {...props} navigate={navigate} location={location} />
}
