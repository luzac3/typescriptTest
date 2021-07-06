$(document).ready(function(){
    const listElement = $(".file_list");
    const uploadArea = $(".upload_area");
    const downloadLink = $(".download_link");
    const deleteButton = $(".delete_button");

    // list取得
    // リスト表示の場合、更新時のみモーダル表示

    // イベントリストを登録
    const eventControl = new EventControl(listElement);

    eventControl.reSetList(listElement);
    eventControl.uploadFile(uploadArea);
    eventControl.downloadFile(downloadLink);
    eventControl.deleteFiles(deleteButton);
});

export interface _IeventControl {
    // リスト再表示時に呼び出し
    reSetList(element: jquery): void;
    uploadFile(element: jquery): void;
    downloadFile(element: jquery): void;
    deleteFiles(element: jquery): void;
}

export class EventControl implements _IeventControl{
    private element: jquery;

    constructor(inElement: jquery){
        this.element = inElement;
    }

    reSetList(element: jquery){
        const modalControl = new ModalControl("リスト再表示処理");
        $(".upload_area").on("change",function(){
            // アップロードファイルが入った時点で読み込みを開始する
    
            // モーダルウィンドウを表示
    
            // データ取得開始
    
            // データ取得、送信完了したらモーダルに表示
            // 削除の場合は件数を表示
    
            // OKボタンが押されたらモーダルを非表示
        });
    }


    uploadFile(element: jquery){
        $(".upload_area").on("change",function(){
            // アップロードファイルが入った時点で読み込みを開始する
    
            // モーダルウィンドウを表示
    
            // データ取得開始
    
            // データ取得、送信完了したらモーダルに表示
            // 削除の場合は件数を表示
    
            // OKボタンが押されたらモーダルを非表示
        });
    }

    downloadFile(element: jquery){
        $(".file_list").on("click",function(){
            
        });
    }

    deleteFiles(element: jquery){
        $(".delete_btn").on("click",function(){
            // ファイル取得
            this.element;
            
            // 複数ファイル取得
            if(window.confirm("")){
                alert("")
            }
        });
    }

    // ファイルチェックここで

}



export interface _ImodalControl {
    // モーダルウィンドウを表示
    showModal(): void;

    // データ取得・送信後の結果をモーダルウィンドウに表示
    setResult(): void;

    // モーダルウィンドウを非表示、モーダルウィンドウ内をクリア
    hideModal(): void;

    // 挙動により違うメッセージを設定・変更
    setStrAction(inStrAction: string): void;
}

// モーダル表示クラス
export class ModalControl implements _ImodalControl{
    // リスト取得、削除など挙動により違うメッセージを格納
    private strAction: string;
    private modalWindowElement: JQuery;

    constructor(inStrAction: string){
        this.strAction = inStrAction;
        this.modalWindowElement = $(".modal_window");
    }

    showModal(){
        let startMessage = this.strAction + "中。しばらくお待ちください。";
        this.modalWindowElement.show();
    }

    setResult(){
        let resultMessage = this.strAction + "が完了しました。";
        // okButtonを設置、イベントリスナを追加
    }

    hideModal(){
        this.modalWindowElement.hide();

        this.modalWindowElement.empty();
    }

    setStrAction(inStrAction: string){
        this.strAction = inStrAction;
    }
}