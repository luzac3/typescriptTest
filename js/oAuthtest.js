let fetch;
if (isBrowserEnv()) {
  fetch = window.fetch.bind(window);
} else {
  fetch = require('node-fetch'); // eslint-disable-line global-require
}
function isBrowserEnv() {
  return typeof window !== 'undefined';
}
$(document).ready(function(){

  var appkey    = "9n7e4rnqptqzyc5";
  var appsecret = "boliq3s0i1hke5x";
  let redirectUri = 'http://localhost/typescriptTestWrapper/src/typescriptTest/connnectTest.html';

  //let authorizeUrl = "https://www.dropbox.com/oauth2/authorize?client_id=" + appkey + "&redirect_uri=" + redirectUri + "&response_type=code";
  let authorizeUrl = "https://www.dropbox.com/oauth2/authorize?client_id=" + appkey + "&response_type=code";


  let arg = new Object;

  const url = location.search.substring(1).split('&');

  const code = url[0];

  if(code != ""){
      //getAccessTokenFromCode("http://localhost/typescriptTestWrapper/src/typescriptTest/connnectTest.html",code);
  }

  // 1. 認証ページへ遷移
  $("#start").on('click', function(){
    window.open(authorizeUrl);
  });
  /*
  // 2. tokenを取得
  $("#code_button").on('click', function(){
    var code=$("#code").val();
    console.log(code);
    $.ajax({
          url: "https://api.dropboxapi.com/2/auth/token/from_oauth1",
          method: 'post',
          processData: false,
          headers: {
              "Authorization": "Basic 9n7e4rnqptqzyc5:boliq3s0i1hke5x",
              "contentType": "application/json"
          }
    }).then(function(data){
      let jsonData = JSON.parse(data);
      console.log(jsonData.access_token);
      console.log(jsonData.token_type);
      console.log(jsonData.uid);
    },function(){
      console.log("XMLHttpRequest : " + XMLHttpRequest.status);
      console.log("textStatus     : " + textStatus);
      console.log("errorThrown    : " + errorThrown.message);
    });
  });
  */

    $("#code_button").on('click', function(){
      getAccessTokenFromCode("http://localhost/typescriptTestWrapper/src/typescriptTest/connnectTest.html");
    });
});
/*
function getAccessTokenFromCode(redirectUri) {

    const clientId = "9n7e4rnqptqzyc5";
    const clientSecret = "boliq3s0i1hke5x";

    const PKCELength = 128;
    const code = $("#code").val();
    const array = new Uint8Array(PKCELength);
    const randomValueArray = crypto.getRandomValues(array);
    const base64String = btoa(randomValueArray);
    let codeVerifier = createBrowserSafeString(base64String).substr(0, 128);

    let path = "https://api.dropboxapi.com/oauth2/token";

    path += '?grant_type=authorization_code';
    path += `&code=${code}`;
    path += `&client_id=${clientId}`;
    path += `&code_verifier=${codeVerifier}`;
    /*
    if (clientSecret) {
      path += `&client_secret=${clientSecret}`;
    } else {
      if (!this.codeVerifier) {
        throw new Error('You must use PKCE when generating the authorization URL to not include a client secret');
      }
      path += `&code_verifier=${this.codeVerifier}`;
    }
    if (redirectUri) {
      path += `&redirect_uri=${redirectUri}`;
    }
    path += '&reject_cors_preflight=true';

    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain; charset=dropbox-cors-hack',
      },
    };
    return this.fetch(path, fetchOptions)
      .then((res) => parseResponse(res))
      .then((res) => res);
  }

  function parseResponse(res) {
  if (!res.ok) {
    return throwAsError(res);
  }
  return res.text()
    .then((data) => {
      let responseObject;
      try {
        responseObject = JSON.parse(data);
      } catch (error) {
        responseObject = data;
      }

      return new DropboxResponse(res.status, res.headers, responseObject);
    });
}

*/
function throwAsError(res) {
  return res.text()
    .then((data) => {
      let errorObject;
      try {
        errorObject = JSON.parse(data);
      } catch (error) {
        errorObject = data;
      }
      console.log(res.status);
      console.log(res.headers);

      throw new DropboxResponseError(res.status, res.headers, errorObject);
    });
}
function getAccessTokenFromCode(redirectUri) {
    const clientId = "9n7e4rnqptqzyc5";
    const clientSecret = "boliq3s0i1hke5x";

    const code = $("#code").val();

    let url = "https://api.dropboxapi.com/oauth2/token";

    url += '?grant_type=authorization_code';
    url += "&code=" + code;
    url += "&client_id=" + clientId;
    url += "&client_secret=" + clientSecret;
    //url += "&redirect_uri=" + redirectUri;

    /*
    $.ajax({
          url: url,
          method: 'post',
          processData: false,
          //contentType: 'text/plain; charset=dropbox-cors-hack',
          data: {
            code: code,
            'grant_type': "authorization_code",
            'client_id': clientId,
            'client_secret': clientSecret,
            //'redirect_uri': redirectUri,
            //'reject_cors_preflight': 'true'
          },
            success: function(data){
              var jsonData = JSON.parse(data);
              console.log(jsonData.access_token);
              console.log(jsonData.token_type);
              console.log(jsonData.uid);
          },
            error: function(data){
              console.log(data);
            }
    });
    */
    $.ajax({
          url: url,
          method: 'post',
          processData: false,
          //contentType: 'text/plain; charset=dropbox-cors-hack',
          contentType: 'application/x-www-form-urlencoded',
          /*
          data: {
            'code': code,
            'grant_type': "authorization_code",
            'client_id': clientId,
            'client_secret': clientSecret,
            'redirect_uri': redirectUri,
            //'reject_cors_preflight': 'true'
          },
          headers: {
              "Authorization": "Bearer " + code
          },
          */
            success: function(res){
              var jsonData = JSON.parse(res);
              console.log(jsonData.access_token);
              console.log(jsonData.token_type);
              console.log(jsonData.uid);
          },
            error: function(res){
              console.log(res);
            }
    });
}
/*
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
    return this.fetch(path, fetchOptions)
      .then((res) => parseResponse(res));
}

*/
/**
 * The response class of HTTP errors from API calls using the Dropbox SDK.
 * @class DropboxResponseError
 * @classdesc The response class of HTTP errors from API calls using the Dropbox SDK.
 * @arg {number} status - HTTP Status code of the call
 * @arg {Object} headers - Headers returned from the call
 * @arg {Object} error - Serialized Error of the call
 */
class DropboxResponseError extends Error {
  constructor(status, headers, error) {
    super(`Response failed with a ${status} code`);
    this.name = 'DropboxResponseError';
    this.status = status;
    this.headers = headers;
    this.error = error;
  }
}
//fixme セッション切れ対応
