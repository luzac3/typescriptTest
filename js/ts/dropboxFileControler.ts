import { HandleCookie } from "./handleCookie";

interface _IdropboxFileControler {
    uploadFile(file: File): Promise<unknown>;
    downloadFile(fileName: string): Promise<unknown>;
    deleteFile(fileNames: string[]): Promise<unknown>;
    getFileList(): Promise<unknown>;
}

export class DropboxFileControler implements _IdropboxFileControler{
    private accessToken: string;

    constructor() {
        const handleCookie = new HandleCookie();

        this.accessToken = handleCookie.getCookie("accessToken");
        
        // トークンがない場合、認証ページに移動
        if(this.accessToken == ""){
            location.href = "../oAuth.html";
        }
    }

    uploadFile(file: File){
        return new Promise((resolve,reject) => {
            // fileReader
            const url = 'https://content.dropboxapi.com/2/files/upload';
            let data: string | ArrayBuffer;
            const contentType = 'application/octet-stream';
            const headers = {
                "Authorization": "Bearer " + this.accessToken,
                "Dropbox-API-Arg": '{"path": "' + file.name + '","mode": "add","autorename": true,"mute": false}'
            }

            const reader = new FileReader();

            reader.readAsDataURL(file);

            reader.onload = () => {
                data = reader.result;

                const dropboxFileControler = new DropboxFileControler();

                dropboxFileControler.sendRequest(url, data, contentType, headers).then(() => {
                    alert("ok");
                    resolve(1);
                },() => {
                    //エラーログ吐き出し
                    alert("ng");
                    reject(0);
                });
            }
        });
    }

    downloadFile(fileName: string){
            return new Promise((resolve,reject) => {
            const url = 'https://content.dropboxapi.com/2/files/download';
            const data = '';
            const contentType = '';
            const headers = {
                "Authorization": "Bearer " + this.accessToken,
                "Dropbox-API-Arg": '{"path": "' + fileName + '","mode": "add","autorename": true,"mute": false}'
            }

            this.sendRequest(url, data, contentType, headers).then(() => {
                alert("ok");
                resolve(1);
            },() => {
                //エラーログ吐き出し
                alert("ng");
                reject(0);
            });
        });
    }

    deleteFile(fileNames: string[]){
        return new Promise((resolve,reject) => {
            const url = 'https://content.dropboxapi.com/2/file_requests/delete';
            const data = '{"ids":' + fileNames + '}';
            const contentType = 'Content-Type: application/json';
            const headers = {
                "Authorization": "Bearer " + this.accessToken
            }

            this.sendRequest(url, data, contentType, headers).then(() => {
                alert("ok");
                resolve(1);
            },() => {
                //エラーログ吐き出し
                alert("ng");
                reject(0);
            });
        });
    }

    getFileList(){
        return new Promise((resolve,reject) => {
            const url = 'https://content.dropboxapi.com/2/file_requests/list';
            const data = '';
            const contentType = 'Content-Type: application/json';
            const headers = {
                "Authorization": "Bearer " + this.accessToken
            }

            this.sendRequest(url, data, contentType, headers).then(() => {
                alert("ok");
                return [];
            },() => {
                //エラーログ吐き出し
                alert("ng");
            });
        });
    }

    private sendRequest(url: string, data: string | ArrayBuffer, contentType: string, headers: {}): Promise<string> {
        let header: string;

        return new Promise((resolve, reject) => {
            $.ajax({
                'url': url,
                'type': 'post',
                'data': data,
                'processData': false,
                'contentType': contentType,
                'headers': headers,
            }).then((res: string) => {
                resolve(res);
            },() => {
                reject('error');
            }).catch((e) => {

            });
        });
    }
}
