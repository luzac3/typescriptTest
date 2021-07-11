import { HandleCookie } from "./handleCookie";

$(document).ready(() => {
  // Cookieに保存されているアクセストークンを削除
  const handleCookie = new HandleCookie();
  handleCookie.delCookie('accessToken');

    $(".enter_button").on("click",() => {
        location.href = "./oAuth.html";
    });
});
