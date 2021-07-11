import { HandleCookie } from "./handleCookie";

interface _IhandleDropboxFile {
  uploadFile(file: File): Promise<unknown>;
  downloadFile(fileName: string): Promise<unknown>;
  deleteFile(deleteFilePath: string): Promise<unknown>;
  getFileList(): Promise<any>;
}

export class HandleDropboxFile implements _IhandleDropboxFile{
  private accessToken: string;

  constructor() {
    const handleCookie = new HandleCookie();

    this.accessToken = handleCookie.getCookie("accessToken");

    // トークンがない場合、認証ページに移動
    if(this.accessToken == ""){
      console.log("no token");
      window.location.replace("./oAuth.html");
    }
  }

  uploadFile(file: File){
    return new Promise((resolve,reject) => {
      const url = 'https://content.dropboxapi.com/2/files/upload';
      let data: string;

      // 日本語ファイル名をエスケープ
      let fileName = this.escapeFileNameToUtf8(file.name);
      const contentType = 'application/octet-stream';
      const headers = {
        "Authorization": "Bearer " + this.accessToken,
        "Dropbox-API-Arg": '{"path": "/test/'+fileName+'","mode": "add","autorename": true,"mute": false}'
      }

      const reader = new FileReader();

      reader.readAsText(file);

      reader.onload = () => {
        if(reader.result == null){
          alert("ファイル情報の取得に失敗しました");
          return;
        }
        if(typeof reader.result === 'string'){
          data = reader.result;
        }

        const handleDropboxFile = new HandleDropboxFile();

        handleDropboxFile.sendRequest(url, data, contentType, headers).then(() => {
          resolve(1);
        },(error) => {
          reject(error);
        });
      }
    });
  }

  downloadFile(path: string){
    return new Promise((resolve,reject) => {
      const url = 'https://content.dropboxapi.com/2/files/download';
      const data = '';
      const contentType = '';
      const headers = {
        'Authorization': 'Bearer ' + this.accessToken,
        'Content-Type': 'application/octet-stream',
        'Dropbox-API-Arg': JSON.stringify({
          "path": path,
        }),
      }

      this.sendRequest(url, data, contentType, headers).then((res) => {
        resolve(res);
      },(error) => {
        reject(error);
      });
    });
  }

  deleteFile(deleteFilePath: string){
    return new Promise((resolve,reject) => {
      const url = 'https://api.dropboxapi.com/2/files/delete_v2';
      const data = JSON.stringify({"path": deleteFilePath});
      const contentType = 'application/json';
      const headers = {
        "Authorization": "Bearer " + this.accessToken
      }

      this.sendRequest(url, data, contentType, headers).then(() => {
        resolve(1);
      },(error) => {
        reject(error);
      });
    });
  }

  getFileList(){
    return new Promise((resolve,reject) => {
      const url = 'https://api.dropboxapi.com/2/files/list_folder';
      const data = JSON.stringify({'path': '/test'});
      const contentType = 'application/json';
      const headers = {
        "Authorization": "Bearer " + this.accessToken
      }

      this.sendRequest(url, data, contentType, headers).then((data: any) => {
        resolve(data['entries']);
      },(error) => {
        reject(error.responseText);
      });
    });
  }

  getToken(){
    return this.accessToken;
  }

  private sendRequest(url: string, data: string, contentType: string, headers: {}): Promise<string> {
    return new Promise((resolve, reject) => {
      $.ajax({
        'url': url,
        'type': 'post',
        'data': data,
        'processData': false,
        'contentType': contentType,
        'headers': headers,
      }).then((data: string) => {
        resolve(data);
      },(error) => {
        reject(error["status"] + ":" + error["statusText"]);
        if(error["status"] == 400){
          window.location.replace("./oAuth.html");
        }
      });
    });
  }

  private escapeFileNameToUtf8(fileName: string) {
    return unescape( encodeURIComponent(fileName));
  }
}
