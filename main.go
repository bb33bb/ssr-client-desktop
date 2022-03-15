package main

import (
	"embed"
	"fmt"
	"log"
	"runtime"

	"github.com/wailsapp/wails/v2/pkg/options/mac"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/logger"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/windows"
)

//go:embed frontend/build
var assets embed.FS

//go:embed build/appicon.png
var icon []byte

const (
	githubUrl        = "https://github.com/doorbash/ssr-client-desktop"
	clientRepoUrl    = "https://github.com/doorbash/ssr-client"
	clientTagVersion = "v1.4.3"
	dbName           = "db.sqlite"
)

func main() {

	var clientFileName string
	switch runtime.GOOS {
	case "windows":
		clientFileName = "ssr-client-windows-amd64-no-console.exe"
	case "darwin":
		clientFileName = "ssr-client-darwin-amd64"
	case "linux":
		clientFileName = "ssr-client-linux-amd64"
	}

	app := NewApp(
		githubUrl,
		fmt.Sprintf(
			"%s/releases/download/%s",
			clientRepoUrl,
			clientTagVersion,
		),
		clientFileName,
		".",
		dbName,
	)

	err := wails.Run(&options.App{
		Title:             "ssr-client-desktop",
		Width:             480,
		Height:            800,
		MinWidth:          480,
		MinHeight:         800,
		MaxWidth:          1280,
		MaxHeight:         740,
		DisableResize:     true,
		Fullscreen:        false,
		Frameless:         false,
		StartHidden:       false,
		HideWindowOnClose: false,
		RGBA:              &options.RGBA{R: 33, G: 37, B: 43, A: 255},
		Assets:            assets,
		LogLevel:          logger.DEBUG,
		OnStartup:         app.startup,
		OnDomReady:        app.domReady,
		OnShutdown:        app.shutdown,
		Bind: []interface{}{
			app,
		},
		// Windows platform specific options
		Windows: &windows.Options{
			WebviewIsTransparent: false,
			WindowIsTranslucent:  false,
			DisableWindowIcon:    true,
		},
		Mac: &mac.Options{
			TitleBar:             mac.TitleBarHiddenInset(),
			WebviewIsTransparent: true,
			WindowIsTranslucent:  true,
			About: &mac.AboutInfo{
				Title:   "Shadowsocksr Client",
				Message: "",
				Icon:    icon,
			},
		},
	})

	if err != nil {
		log.Fatal(err)
	}

}
