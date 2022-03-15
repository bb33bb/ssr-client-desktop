import { Add, PlayArrow, Stop, Delete, Edit } from "@material-ui/icons"
import { Component } from "react"
import { useNavigate } from "react-router-dom"
import "./ProxyList.css"

class ProxyList extends Component {
  constructor(props) {
    super(props)
    props.setConfig("Shadowsocksr Client", false, "#00000000")
    this.onEvent = this.onEvent.bind(this)
    this.state = {
      proxies: [],
    }
  }

  onEvent(id, status) {
    console.log("proxy status >>>> " + id, status)
    this.setState((st) => {
      return {
        proxies: st.proxies.map((it) => {
          if (it.id === id) {
            return {
              ...it,
              run_status: status, // idle, running, error
            }
          }
          return it
        }),
      }
    })
  }

  componentDidMount() {
    if (!window.go) return
    ;(async () => {
      const list = await window.go.main.App.GetProxies()
      console.log(list)

      this.setState({
        proxies: list,
      })

      const result = await window.go.main.App.ClientFileExists()
      if (result === false) {
        this.props.navigate("/download")
        return
      }

      if (!window.runtime) return
      window.runtime.EventsOn("run-status", this.onEvent)
    })()
  }

  componentWillUnmount() {
    if (!window.runtime) return
    window.runtime.EventsOff("run-status")
  }

  render() {
    return (
      <>
        {this.state.proxies.map((item, i) => {
          return (
            <div
              key={item.id}
              className="proxy-item cursor-pointer border-b-2 text-lg grid items-center justify-center"
              onClick={(e) => {
                this.props.navigate("/logs", {
                  state: {
                    id: item.id,
                    name: item.name,
                  },
                })
              }}
            >
              {item.status === 0 ? (
                <div className="bg-gray-600 h-full"></div>
              ) : item.run_status === "running" ? (
                <div className="bg-green-500 h-full"></div>
              ) : item.run_status === "error" ? (
                <div className="bg-red-500 h-full"></div>
              ) : (
                <div className="bg-gray-600 h-full"></div>
              )}
              <div className="my-4 ml-4 w-[90%]">
                <div className="mb-[0.125rem] truncate">{item.name}</div>
                <div className="flex justify-start space-x-2 items-center text-xs text-slate-600">
                  {item.status === 0 ? (
                    <div>DISABLED</div>
                  ) : item.run_status === "running" ? (
                    <div>RUNNING</div>
                  ) : item.run_status === "error" ? (
                    <div>ERROR</div>
                  ) : (
                    <div>IDLE</div>
                  )}
                  <div>PORT: {item.l}</div>
                </div>
              </div>
              <div className="proxy-icons">
                <div
                  className="proxy-icon"
                  onClick={(e) => {
                    e.stopPropagation()
                    if (!window.go) return
                    ;(async () => {
                      try {
                        if (item.status === 0) {
                          await window.go.main.App.RunProxy(item.id)
                        } else {
                          await window.go.main.App.StopProxy(item.id)
                        }
                        this.setState((st) => {
                          return {
                            proxies: st.proxies.map((it) => {
                              if (it.id === item.id) {
                                return {
                                  ...it,
                                  status: 1 - it.status,
                                }
                              }
                              return it
                            }),
                          }
                        })
                      } catch (err) {
                        console.log(">>> ", err)
                      }
                    })()
                  }}
                >
                  {item.status === 0 ? (
                    <PlayArrow style={{ fontSize: "1.3rem" }} />
                  ) : (
                    <Stop style={{ fontSize: "1.3rem" }} />
                  )}
                </div>
                <div
                  className="proxy-icon"
                  onClick={(e) => {
                    e.stopPropagation()
                    this.props.navigate("/new-proxy", {
                      state: {
                        ...item,
                        name: "Copy of " + item.name,
                      },
                    })
                  }}
                >
                  <Add style={{ fontSize: "1.6rem" }} />
                </div>
                <div
                  className="proxy-icon"
                  onClick={(e) => {
                    e.stopPropagation()
                    this.props.navigate("/edit-proxy", { state: item })
                  }}
                >
                  <Edit style={{ fontSize: "1.3rem" }} />
                </div>
                <div
                  className="proxy-icon"
                  onClick={(e) => {
                    e.stopPropagation()
                    if (!window.go) return
                    ;(async () => {
                      try {
                        await window.go.main.App.DeleteProxy(item.id)
                        this.setState((st) => {
                          return {
                            proxies: st.proxies.filter((it) => {
                              return it.id !== item.id
                            }),
                          }
                        })
                      } catch (e) {
                        console.log(e)
                      }
                    })()
                  }}
                >
                  <Delete style={{ fontSize: "1.3rem" }} />
                </div>
              </div>
            </div>
          )
        })}
        <div
          className="btn-floating absolute right-8 bottom-8"
          onClick={(e) => {
            e.stopPropagation()
            this.props.navigate("/new-proxy")
          }}
        >
          <Add style={{ fontSize: "3rem" }} />
        </div>
      </>
    )
  }
}

export default function (props) {
  const navigate = useNavigate()

  return <ProxyList {...props} navigate={navigate} />
}
