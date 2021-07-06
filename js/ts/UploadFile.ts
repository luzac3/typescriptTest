declare var require: any;
import $ = require('jquery');

export interface _IoperationDropboxFile {
    uploadFile(file: File): Promise<any>;
    downloadFile(fileName: string): Promise<any>;
    deleteFile(fileNames: string[]): Promise<any>;
    getFileList(): Promise<any>;
}

export class OperationDropboxFile implements _IoperationDropboxFile{
    private token: string;
    
    // ファイルオブジェクト設定
    constructor() {
        const getTokenFile = require('./getini.ts');
        const getToken = new getTokenFile.GetToken();
        this.token = getToken.getToken();
    }

    uploadFile(file: File){
        return new Promise((resolve,reject) => {
            // fileReader
            const url = 'https://content.dropboxapi.com/2/files/upload';
            let data: string | ArrayBuffer;
            const contentType = 'application/octet-stream';
            const headers = {
                "Authorization": "Bearer " + this.token,
                "Dropbox-API-Arg": '{"path": "' + file.name + '","mode": "add","autorename": true,"mute": false}'
            }
            
            const reader = new FileReader();

            reader.readAsDataURL(file);

            reader.onload = function(){
                data = reader.result;

                const operationDropboxFile = new OperationDropboxFile();

                operationDropboxFile.sendRequest(url, data, contentType, headers).then(function(){
                    alert("ok");
                    resolve(1);
                },function(){
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
                "Authorization": "Bearer " + this.token,
                "Dropbox-API-Arg": '{"path": "' + fileName + '","mode": "add","autorename": true,"mute": false}'
            }

            this.sendRequest(url, data, contentType, headers).then(function(){
                alert("ok");
                resolve(1);
            },function(){
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
                "Authorization": "Bearer " + this.token
            }

            this.sendRequest(url, data, contentType, headers).then(function(){
                alert("ok");
                resolve(1);
            },function(){
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
                "Authorization": "Bearer " + this.token
            }

            this.sendRequest(url, data, contentType, headers).then(function(){
                alert("ok");
                return [];
            },function(){
                //エラーログ吐き出し
                alert("ng");
            });
        });
    }

    private sendRequest(url: string, data: string | ArrayBuffer, contentType: string, headers: {}): Promise<any> {
        let header: string;
    
        return new Promise((resolve, reject) => {
            $.ajax(
                {
                    url: url,
                        type: 'post',
                        data: data,
                        processData: false,
                        contentType: contentType,
                        headers: headers,
                        success: function (ret: JSON) {
                            resolve(ret);
                        },
                        error: function () {
                            reject('error');
                        }
    
                }
            )
        });
    }
}