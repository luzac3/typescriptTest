import appKeys from '../config/appKeys.json';
var HandleOAuth = /** @class */ (function () {
    function HandleOAuth(redirectUri) {
        this.clientId = appKeys.appKey;
        this.clientSecret = appKeys.appSecret;
        this.redirectUri = redirectUri;
    }
    HandleOAuth.prototype.authorize = function () {
        var authorizeUrl = "https://www.dropbox.com/oauth2/authorize?client_id=" + this.clientId + "&response_type=code";
        location.href = authorizeUrl;
    };
    HandleOAuth.prototype.getAccessTokenFromCode = function (code) {
        var url = "https://api.dropboxapi.com/oauth2/token";
        url += '?grant_type=authorization_code';
        url += "&code=" + code;
        url += "&client_id=" + this.clientId;
        url += "&client_secret=" + this.clientSecret;
        url += "&redirect_uri=" + this.redirectUri;
        return new Promise(function (resolve, reject) {
            $.ajax({
                'url': url,
                'method': 'post',
                'processData': false,
                'contentType': 'application/x-www-form-urlencoded',
            }).then(function (res) {
                var jsonData = JSON.parse(res);
                //console.log(jsonData.access_token);
                //console.log(jsonData.token_type);
                //console.log(jsonData.uid);
                resolve(jsonData.access_token);
            }, function (res) {
                console.log(res);
            });
        });
    };
    return HandleOAuth;
}());
export { HandleOAuth };
//# sourceMappingURL=handleOAuth.js.map