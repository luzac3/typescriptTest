import redirectUri from '../config/redirectUri.json';
import { HandleOAuth } from './handleOAuth.js';
import { HandleCookie } from './handleCookie.js';
$(document).ready(function () {
    var url = location.search.substring(1).split('&');
    var code = url[0];
    var handleOAuth = new HandleOAuth(redirectUri.redirectUri);
    // cookieのアクセストークンを初期化
    var handleCookie = new HandleCookie();
    handleCookie.delCookie("accessToken");
    if (code != "") {
        handleOAuth.authorize();
    }
    else {
        handleOAuth.getAccessTokenFromCode(code).then(function (data) {
            if (typeof data === 'string') {
                handleCookie.setCookie("accessToken", data, 30 * 60);
                location.href = "../main.html";
            }
            else {
                alert("トークンが不正です");
            }
        }, function () {
            alert("認証に失敗しました");
        });
    }
});
//# sourceMappingURL=oAuth.js.map