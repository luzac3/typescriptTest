import { HandleModal } from "./handleModal";
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
        // listを表示する
    }

    reSetList(reSetButtonElement:JQuery<HTMLElement>, listElement: JQuery<HTMLElement>) {
        reSetButtonElement.on("change",function(){
            const handleModal = new HandleModal("リスト再表示処理",$(".modal_window"));

            const handleDropboxFile = new HandleDropboxFile();

            // モーダルウィンドウを表示
            handleModal.showModal();

            handleDropboxFile.getFileList().then(function(listData){
                // 取得結果をモーダルに表示
                if(Array.isArray(listData)){
                    handleModal.showResult();

                    // ファイル一覧を表示
                    this.setList(listElement);

                }else{
                    handleModal.showResult("未知のエラー");
                }
            },(res) => {
                handleModal.showResult(res.error);
            }).catch((e) => {
                handleModal.showResult(e.message);
            });
        });
    }

    uploadFile(uploadButtonElement: JQuery<HTMLElement>, uploadFileElement: JQuery<HTMLElement>) {
        uploadButtonElement.on("click",() => {
            // アップロードファイルが入った時点で読み込みを開始する
            const handleModal = new HandleModal("アップロード",$(".modal_window"));

            const handleDropboxFile = new HandleDropboxFile();

            const uploadFile = (<HTMLInputElement>uploadFileElement[0]).files[0];

            try{
                // モーダルウィンドウを表示
                handleModal.showModal();
            }catch{
                //
            }

            // アップロード処理実行
            handleDropboxFile.uploadFile(uploadFile).then((res) => {
                if(typeof res === "number"){
                    handleModal.showResult();
                }else{
                    handleModal.showResult("未知のエラーが発生しました");
                }
            },(res) =>{
                handleModal.showResult(res.error);
            }).catch((e) => {
                handleModal.showResult(e.message);
            });
        });
    }

    downloadFile(downloadLinkElement: JQuery<HTMLElement>) {
        downloadLinkElement.on("click",(event) => {
            const handleModal = new HandleModal("ダウンロード",$(".modal_window"));

            const handleDropboxFile = new HandleDropboxFile();

            try{
                // モーダルウィンドウを表示
                handleModal.showModal();
            }catch{
                //
            }

            // ダウンロード処理実行
            handleDropboxFile.downloadFile($(event.target).data("filename")).then((res) => {
                if(typeof res === "number"){
                    handleModal.showResult();
                }else{
                    handleModal.showResult("未知のエラーが発生しました");
                }
            },(res) =>{
                handleModal.showResult(res.error);
            }).catch((e) => {
                handleModal.showResult(e.message);
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
                const handleModal = new HandleModal("削除",$(".modal_window"));

                const handleDropboxFile = new HandleDropboxFile();

                try{
                    // モーダルウィンドウを表示
                    handleModal.showModal();
                }catch{
                    //
                }

                // 削除ファイル名一覧を取得
                deleteFileElementsList = deleteFileElements.find("input[type='checkbox']").filter(":checked");

                deleteFileElementsList.each((key, value)=>{
                    deleteFileList.push($(value).data("filename"));
                });

                // 削除処理実行
                handleDropboxFile.deleteFiles(deleteFileList).then((res) => {
                    if(typeof res === "number"){
                        handleModal.showResult();
                    }else{
                        handleModal.showResult("未知のエラーが発生しました");
                    }
                },(res) =>{
                    handleModal.showResult(res.error);
                }).catch((e) => {
                    handleModal.showResult(e.message);
                });
            }
        });
    }
}
