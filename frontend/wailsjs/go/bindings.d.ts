export interface go {
  "main": {
    "App": {
		CancelDownload():Promise<void>
		ClientFileExists():Promise<boolean>
		DeleteProxy(arg1:number):Promise<Error>
		DownloadClientFile():Promise<void>
		GetLogs(arg1:number):Promise<Array<Log>>
		GetProxies():Promise<Array<Proxy>>
		InsertProxy(arg1:Proxy):Promise<Error>
		OpenGithub():Promise<void>
		RunProxy(arg1:number):Promise<Error>
		StopProxy(arg1:number):Promise<Error>
		UpdateProxy(arg1:Proxy):Promise<Error>
    },
  }

}

declare global {
	interface Window {
		go: go;
	}
}
