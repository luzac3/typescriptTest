import { HandleCookie } from "./handleCookie.js";
var HandleDropboxFile = /** @class */ (function () {
    function HandleDropboxFile() {
        var handleCookie = new HandleCookie();
        this.accessToken = handleCookie.getCookie("accessToken");
        // トークンがない場合、認証ページに移動
        if (this.accessToken == "") {
            location.href = "./oAuth.html";
        }
    }
    HandleDropboxFile.prototype.uploadFile = function (file) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // fileReader
            var url = 'https://content.dropboxapi.com/2/files/upload';
            var data;
            var contentType = 'application/octet-stream';
            var headers = {
                "Authorization": "Bearer " + _this.accessToken,
                "Dropbox-API-Arg": '{"path": "' + file.name + '","mode": "add","autorename": true,"mute": false}'
            };
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                if (reader.result == null) {
                    alert("ファイル情報の取得に失敗しました");
                    return;
                }
                else {
                    data = reader.result;
                }
                var handleDropboxFile = new HandleDropboxFile();
                handleDropboxFile.sendRequest(url, data, contentType, headers).then(function () {
                    alert("ok");
                    resolve(1);
                }, function () {
                    //エラーログ吐き出し
                    alert("ng");
                    reject(0);
                });
            };
        });
    };
    HandleDropboxFile.prototype.downloadFile = function (fileName) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var url = 'https://content.dropboxapi.com/2/files/download';
            var data = '';
            var contentType = '';
            var headers = {
                "Authorization": "Bearer " + _this.accessToken,
                "Dropbox-API-Arg": '{"path": "' + fileName + '","mode": "add","autorename": true,"mute": false}'
            };
            _this.sendRequest(url, data, contentType, headers).then(function () {
                alert("ok");
                resolve(1);
            }, function () {
                //エラーログ吐き出し
                alert("ng");
                reject(0);
            });
        });
    };
    HandleDropboxFile.prototype.deleteFiles = function (fileNames) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var url = 'https://content.dropboxapi.com/2/file_requests/delete';
            var data = '{"ids":' + fileNames + '}';
            var contentType = 'Content-Type: application/json';
            var headers = {
                "Authorization": "Bearer " + _this.accessToken
            };
            _this.sendRequest(url, data, contentType, headers).then(function () {
                alert("ok");
                resolve(1);
            }, function () {
                //エラーログ吐き出し
                alert("ng");
                reject(0);
            });
        });
    };
    HandleDropboxFile.prototype.getFileList = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var url = 'https://content.dropboxapi.com/2/file_requests/list';
            var data = '';
            var contentType = 'Content-Type: application/json';
            var dropboxFileList;
            var headers = {
                "Authorization": "Bearer " + _this.accessToken
            };
            _this.sendRequest(url, data, contentType, headers).then(function (list) {
                dropboxFileList = JSON.stringify(list);
                resolve(dropboxFileList);
            }, function () {
                //エラーログ吐き出し
                alert("ng");
                reject(0);
            });
        });
    };
    HandleDropboxFile.prototype.sendRequest = function (url, data, contentType, headers) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                'url': url,
                'type': 'post',
                'data': data,
                'processData': false,
                'contentType': contentType,
                'headers': headers,
            }).then(function (res) {
                resolve(res);
            }, function () {
                reject('error');
            }).catch(function (e) {
            });
        });
    };
    return HandleDropboxFile;
}());
export { HandleDropboxFile };
//# sourceMappingURL=handleDropboxFile.js.map