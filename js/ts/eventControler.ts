import { HandleDropboxFile } from "./handleDropboxFile";
import { HandleCookie } from "./handleCookie";

interface _IeventControler {
    setList(listElement: JQuery<HTMLElement>): void;
    // リスト再表示時に呼び出し
    reSetList(reSetButtonElement:JQuery<HTMLElement>, listElement: JQuery<HTMLElement>): void;
    uploadFile(uploadButtonElement: JQuery<HTMLElement>, uploadFileElement: JQuery<HTMLElement>): void;
    downloadFile(downloadLinkElement: JQuery<HTMLElement>): void;
    deleteFiles(deleteButtonElement: JQuery<HTMLElement>, deleteFileElements: JQuery<HTMLElement>): void;
}

export class EventControler implements _IeventControler {
  setList(listElement: JQuery<HTMLElement>) {
    const handleDropboxFile = new HandleDropboxFile();

    handleDropboxFile.getFileList().then((listData: any) => {
      console.log(listData);

      listData.forEach((val: any) => {
        const date = val['client_modified'].split('T');
        const ymd = date[0];
        const time = date[1].slice(0, -1);
        let year: number;
        let month: string;
        let day: string;
        let hour: string;
        let minute: string;
        let second: string;
        let createDate: string;

        // 日時を日本時間に修正
        let jpDate = new Date(ymd + " " + time);
        jpDate.setHours(jpDate.getHours() + 9);

        year = jpDate.getFullYear();
        month = ('00' + jpDate.getMonth() + 1).slice(-2);
        day = ('00' + jpDate.getDate()).slice(-2);
        hour = ('00' + jpDate.getHours()).slice(-2);
        minute = ('00' + jpDate.getMinutes()).slice(-2);
        second = ('00' + jpDate.getSeconds()).slice(-2);

        createDate = year + "/" + month + "/" + day + " " + hour + ":" + minute + ":" + second;

        let cloneListElement = listElement.clone();
        cloneListElement.attr("class", "file_list");
        cloneListElement.find(".file_data")[0].dataset.file_path = val['id'];
        cloneListElement.find(".file_data")[0].dataset.file_name = val['name'];
        cloneListElement.find('.file_name a').html(val['name']);
        cloneListElement.find('.date').html(createDate);

        listElement.after(cloneListElement);

        // 作成した要素にクリックイベントを追加
        this.downloadFile(cloneListElement.find('.file_name a'));
      });
    },(error) => {
      alert("リストの取得に失敗しました\n" + error);
    });
    console.log(listElement);
  }

  reSetList(reSetButtonElement:JQuery<HTMLElement>, listElement: JQuery<HTMLElement>) {
    reSetButtonElement.on("click",() => {
      listElement.nextAll().remove();

      const eventControler = new EventControler();

      eventControler.setList(listElement);
    });
  }

  uploadFile(uploadButtonElement: JQuery<HTMLElement>, uploadFileElement: JQuery<HTMLElement>) {
    uploadButtonElement.on("click",() => {
      const filesElement = uploadFileElement.prop('files');

      let uploadFile: File;

      if(filesElement.length === 0){
        alert("ファイルが登録されていません");
        return;
      }else{
        uploadFile = filesElement[0];
      }

      const handleDropboxFile = new HandleDropboxFile();

      // アップロード処理実行
      handleDropboxFile.uploadFile(uploadFile).then((res) => {
        if(typeof res === "number"){
          alert("アップロードしました");
        }else{
          alert("未知のエラーが発生しました");
        }
      },(error) => {
        alert("アップロードに失敗しました\n" + error);
      }).finally(() => {
        // inputフォームのファイルをクリア
        uploadFileElement.val("");

        // inputを書き換えた際にChangeイベントが走らないため、changeを実行
        uploadFileElement.change();
      });
    });
  }

  downloadFile(downloadLinkElement: JQuery<HTMLElement>) {
    downloadLinkElement.on("click",(event) => {
      const handleDropboxFile = new HandleDropboxFile();
      const filePath = $(event.target).closest("tr").data("file_path");
      const fileName = $(event.target).closest("tr").data("file_name");

      // fileNameが消えてしまうので一時的に保持
      const handleCoolie = new HandleCookie();

      handleCoolie.setCookie('fileName',fileName);

      handleDropboxFile.downloadFile(filePath).then((data) => {
        if(data === null){
          alert("未知のエラーが発生しました");
        }else{
          // fileName再取得
          const handleCookie = new HandleCookie();
          const fileName = handleCookie.getCookie('fileName');
          handleCookie.delCookie('fileName');

          if(typeof data !== "string"){
            alert("ファイルがテキスト形式ではありません");
            return;
          }

          // ダウンロード用の要素を作成
          const downLoadElemnt = document.createElement("a");
          downLoadElemnt.download = fileName;
          downLoadElemnt.href = URL.createObjectURL(new Blob([data], {type: 'text.plain'}));
          downLoadElemnt.dataset.downloadurl = ["text/plain", downLoadElemnt.download, downLoadElemnt.href].join(":");
          downLoadElemnt.click();
        }
      },(error) => {
        alert("ダウンロードに失敗しました\n" + error);
      });
    });
  }

    deleteFiles(deleteButtonElement: JQuery<HTMLElement>, deleteFileElements: JQuery<HTMLElement>) {
        deleteButtonElement.on("click",() => {
            const filesNum = deleteFileElements.length;

            const confirmMessage = filesNum + "件削除します。\nよろしいですか？";

            let deleteFileElementsList: JQuery<HTMLElement>;

            let deleteFileList: string[];

            if(window.confirm(confirmMessage)){
                const handleDropboxFile = new HandleDropboxFile();

                // 削除ファイル名一覧を取得
                deleteFileElementsList = deleteFileElements.find("input[type='checkbox']").filter(":checked");

                deleteFileList = [];

                deleteFileElementsList.each((value: any)=>{
                    deleteFileList.push($(value).data("filename"));
                });

                if(deleteFileList.length){
                  alert("1件も選択されていません");
                  return;
                }

                // 削除処理実行
                handleDropboxFile.deleteFiles(deleteFileList).then((res) => {
                    if(typeof res === "number"){
                        alert(filesNum + "件削除しました");
                    }else{
                        alert("未知のエラーが発生しました");
                    }
                },(error) => {
                  alert("削除に失敗しました\n" + error);
                });
            }
        });
    }
}
