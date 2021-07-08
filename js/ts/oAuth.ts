import { OAuthControler } from './oAuthControler';
  import {
    HandleCookie
  } from './handleCookie';

$(document).ready(() => {
  const url = location.search.substring(1).split('&');
  const code = url[0];

  const oAuthControler = new OAuthControler('http://localhost/typescriptTestWrapper/src/typescriptTest/connnectTest.html');

  // cookieのアクセストークンを初期化
  const handleCookie = new HandleCookie();

  handleCookie.delCookie("accessToken");

  if(code != ""){
    oAuthControler.authorize();
  }else{
    oAuthControler.getAccessTokenFromCode(code).then((data) => {
        if(typeof data === 'string'){
            handleCookie.setCookie("accessToken", data, 30*60);
            location.href = "../main.html";
        }else{
            alert("トークンが不正です");
        }
    },() => {
        alert("認証に失敗しました");
    });
  }
});