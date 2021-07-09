var HandleCookie = /** @class */ (function () {
    function HandleCookie() {
    }
    HandleCookie.prototype.setCookie = function (key, value, time) {
        if (time === void 0) { time = 0; }
        var expires = "";
        if (time) {
            var date = new Date();
            date.setTime(date.getTime() + time);
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = key + "=" + (value || "") + expires + "; path=/";
    };
    HandleCookie.prototype.getCookie = function (key) {
        var cookies = document.cookie;
        var cookiesArray = cookies.split(';');
        var cookieArray;
        cookiesArray.forEach(function (cookie) {
            cookieArray = cookie.split('=');
            if (cookieArray[0].trim() == key) {
                return cookieArray[1].trim();
            }
        });
        // マッチしなかった場合
        return "";
    };
    HandleCookie.prototype.delCookie = function (key) {
        document.cookie = key + "=;max-age=0";
    };
    return HandleCookie;
}());
export { HandleCookie };
//# sourceMappingURL=handleCookie.js.map