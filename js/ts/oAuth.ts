import redirectUri from '../config/redirectUri.json';
import { HandleOAuth } from './handleOAuth';
import { HandleCookie } from './handleCookie';

$(document).ready(() => {
  const url = location.search.substring(1).split('&');
  const code = url[0];

  const handleOAuth = new HandleOAuth(redirectUri.redirectUri);

  // cookieのアクセストークンを初期化
  const handleCookie = new HandleCookie();

  handleCookie.delCookie("accessToken");

  if(code == ""){
    console.log("call authorization");
    handleOAuth.authorize();
  }else{
    handleOAuth.getAccessTokenFromCode(code).then((data) => {
        if(typeof data === 'string'){
            handleCookie.setCookie("accessToken", data, 30*60);
            window.location.replace("./main.html");
        }else{
            alert("トークンが不正です");
        }
    },(error) => {
        alert("認証に失敗しました。\n" + error["error"] + ":" + error["error_description"]);
    });
  }
});
