import appKeys from '../config/appKeys.json';

interface _IhandleOAuth {
  authorize(): void;
  getAccessTokenFromCode(code: string): Promise<unknown>;
}

export class HandleOAuth implements _IhandleOAuth{
  private clientId: string;
  private clientSecret: string;
  private redirectUri: string;

  constructor(redirectUri: string){
    this.clientId = appKeys.appKey;
    this.clientSecret = appKeys.appSecret;
    this.redirectUri = redirectUri;
  }

  authorize(){
    const authorizeUrl = "https://www.dropbox.com/oauth2/authorize?client_id=" + this.clientId + "&response_type=code";
    location.href = authorizeUrl;
  }

  getAccessTokenFromCode(code: string){
    let url = "https://api.dropboxapi.com/oauth2/token";
    url += '?grant_type=authorization_code';
    url += "&code=" + code;
    url += "&client_id=" + this.clientId;
    url += "&client_secret=" + this.clientSecret;
    url += "&redirect_uri=" + this.redirectUri;
    return new Promise((resolve, reject) => {
      $.ajax({
        'url': url,
        'method': 'post',
        'processData': false,
        'contentType': 'application/x-www-form-urlencoded',
      }).then((res: string) => {
        var jsonData = JSON.parse(res);
        //console.log(jsonData.access_token);
        //console.log(jsonData.token_type);
        //console.log(jsonData.uid);
        resolve(jsonData.access_token);
      },(res: any) => {
        console.log(res);
      });
    });
  }
}
