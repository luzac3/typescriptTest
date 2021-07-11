interface _IhandleCookie {
    setCookie(key: string, value:string ,time: number): void;
    getCookie(key: string): string;
    delCookie(key: string): void;
}

export class HandleCookie implements _IhandleCookie{
    setCookie(key: string, value:string ,time = 0) {
        let maxAge = "";
        if (time) {
            maxAge = "; max-age=" + time;
        }

        document.cookie = key + "=" + (value || "")  + maxAge + "; path=/";
    }

    getCookie(key: string){
        const cookies = document.cookie;
        const cookiesArray = cookies.split(';');

        let cookieArray: string[];

        let ret= "";

        cookiesArray.forEach((cookie) => {
          cookieArray = cookie.split('=');
          if( cookieArray[0].trim() == key){
              ret = cookieArray[1].trim();
          }
        });

        return ret;
    }

    delCookie(key: string){
        document.cookie = key + "=;max-age=0";
    }
}
