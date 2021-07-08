interface _IhandleCookie {
    setCookie(key: string, value:string ,time: number): void;
    getCookie(key: string): string;
    delCookie(key: string): void;
}

export class HandleCookie implements _IhandleCookie{
    setCookie(key: string, value:string ,time = 0) {
        var expires = "";
        if (time) {
            var date = new Date();
            date.setTime(date.getTime() + time);
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = key + "=" + (value || "")  + expires + "; path=/";
    }

    getCookie(key: string){
        const cookies = document.cookie;
        const cookiesArray = cookies.split(';');
      
        let cookieArray: string[];
      
        cookiesArray.forEach((cookie) => {
          cookieArray = cookie.split('=');
          if( cookieArray[0].trim() == key){
              return cookieArray[1].trim();
          }
        });
      
        // マッチしなかった場合
        return "";
    }

    delCookie(key: string){
        document.cookie = key + "=;max-age=0";
    }
}