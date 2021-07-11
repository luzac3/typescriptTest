import { HandleDropboxFile } from "./handleDropboxFile";

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

        let cloneListElement = listElement.clone();
        cloneListElement.attr("class", "file_list");
        console.log(cloneListElement);
        cloneListElement[0].dataset.file_name = val['path_lower'];

        cloneListElement.find('.file_name a').html(val['name']);
        cloneListElement.find('.date').html(ymd + " " + time);

        listElement.after(cloneListElement);
        console.log(val['name']);
        console.log(listElement);
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

            // ダウンロード処理実行
            handleDropboxFile.downloadFile($(event.target).data("filename")).then((res) => {
                if(typeof res !== "number"){
                    alert("未知のエラーが発生しました");
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
