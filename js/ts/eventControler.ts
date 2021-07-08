import { ModalControler } from "./modalControler";
import { DropboxFileControler } from "./dropboxFileControler";

interface _IeventControler {
    setList(listElement: JQuery<HTMLElement>): void;
    // リスト再表示時に呼び出し
    reSetList(reSetButtonElement:JQuery<HTMLElement>, listElement: JQuery<HTMLElement>): void;
    uploadFile(uploadAreaElement: JQuery<HTMLElement>): void;
    downloadFile(downloadLinkElement: JQuery<HTMLElement>): void;
    deleteFiles(deleteButtonElement: JQuery<HTMLElement>, deleteFileElements: JQuery<HTMLElement>): void;
}

export class EventControler implements _IeventControler {
    setList(listElement: JQuery<HTMLElement>) {

    }

    reSetList(reSetButtonElement:JQuery<HTMLElement>, listElement: JQuery<HTMLElement>) {
        reSetButtonElement.on("change",function(){
            const modalControler = new ModalControler("リスト再表示処理",$(".modal_window"));

            const dropboxFileControler = new DropboxFileControler();

            // モーダルウィンドウを表示
            modalControler.showModal();

            dropboxFileControler.getFileList().then(function(listData){
                // 取得結果をモーダルに表示
                if(Array.isArray(listData)){
                    modalControler.showResult();

                    // ファイル一覧を表示
                    this.setList(listElement);

                }else{
                    modalControler.showResult("未知のエラー");
                }
            },(res) => {
                modalControler.showResult(res.error);
            }).catch((e) => {
                modalControler.showResult(e.message);
            });
        });
    }

    uploadFile(uploadAreaElement: JQuery<HTMLElement>) {
        uploadAreaElement.on("change",() => {
            // アップロードファイルが入った時点で読み込みを開始する
            const modalControler = new ModalControler("アップロード",$(".modal_window"));

            const dropboxFileControler = new DropboxFileControler();

            const uploadFile = uploadAreaElement.find("file");

            try{
                // モーダルウィンドウを表示
                modalControler.showModal();
            }catch{
                //
            }

            // データアップロード
            dropboxFileControler.uploadFile(uploadFile).then((res) => {
                if(typeof res === "number"){
                    modalControler.showResult();
                }else{
                    modalControler.showResult("未知のエラーが発生しました");
                }
            },(res) =>{
                modalControler.showResult(res.error);
            }).catch((e) => {
                modalControler.showResult(e.message);
            });
        });
    }

    downloadFile(downloadLinkElement: JQuery<HTMLElement>) {
        downloadLinkElement.on("click",() => {
            const modalControler = new ModalControler("ダウンロード",$(".modal_window"));

            const dropboxFileControler = new DropboxFileControler();

            try{
                // モーダルウィンドウを表示
                modalControler.showModal();
            }catch{
                //
            }

            // データダウンロード
            dropboxFileControler.downloadFile(downloadLinkElement).then((res) => {
                if(typeof res === "number"){
                    modalControler.showResult();
                }else{
                    modalControler.showResult("未知のエラーが発生しました");
                }
            },(res) =>{
                modalControler.showResult(res.error);
            }).catch((e) => {
                modalControler.showResult(e.message);
            });

        });
    }

    deleteFiles(deleteButtonElement: JQuery<HTMLElement>, deleteFileElements: JQuery<HTMLElement>) {
        deleteButtonElement.on("click",() => {
            const filesNum = deleteFileElements.length;

            const confirmMessage = filesNum + "件削除します。\nよろしいですか？";

            if(window.confirm(confirmMessage)){
                const modalControler = new ModalControler("削除",$(".modal_window"));

                const dropboxFileControler = new DropboxFileControler();

                try{
                    // モーダルウィンドウを表示
                    modalControler.showModal();
                }catch{
                    //
                }

                // 削除
                dropboxFileControler.deleteFile(deleteFileElements).then((res) => {
                    if(typeof res === "number"){
                        modalControler.showResult();
                    }else{
                        modalControler.showResult("未知のエラーが発生しました");
                    }
                },(res) =>{
                    modalControler.showResult(res.error);
                }).catch((e) => {
                    modalControler.showResult(e.message);
                });
            }
        });
    }
}
