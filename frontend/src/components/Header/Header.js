import { Settings, GitHub, ArrowBack } from "@material-ui/icons"
import { useLocation, useNavigate } from "react-router-dom"
import "./Header.css"

export default function Header(props) {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <header className="header">
      <div className="flex justify-start items-center gap-5">
        {props.showBackButton && (
          <ArrowBack
            fontSize="large"
            className="menu-icon"
            onClick={() => {
              navigate(-1)
            }}
          />
        )}
        <div className="text-[1.35rem] truncate max-w-[10em]">
          {props.title}
        </div>
      </div>
      <div className="flex justify-end items-center gap-3">
        <div
          className="menu-icon p-1"
          style={
            location.pathname === "/download" ||
            location.pathname === "/settings"
              ? { visibility: "hidden" }
              : {}
          }
          onClick={() => {
            navigate("/settings")
          }}
        >
          <Settings fontSize="large" />
        </div>
        <div className="menu-icon p-1">
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
