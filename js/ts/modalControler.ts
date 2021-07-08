interface _ImodalControler {
    // モーダルウィンドウを表示
    showModal(): void;

    // データ取得・送信後の結果をモーダルウィンドウに表示
    showResult(errorMessage: string): void;

    // 挙動により違うメッセージを設定・変更
    setStrAction(inStrAction: string): void;
}

export class ModalControler implements _ImodalControler{
    // リスト取得、削除など挙動により違うメッセージを格納
    private strAction: string;
    private modalWindowElement: JQuery<HTMLElement>;

    constructor(inStrAction: string, inModalWindowElement: JQuery<HTMLElement>){
        this.strAction = inStrAction;
        this.modalWindowElement = inModalWindowElement;
    }

    showModal(){
        let startMessage = this.strAction + "中。しばらくお待ちください。";
        this.modalWindowElement.show();

        // モーダル内コンテンツを初期化
        this.modalWindowElement.empty();

        this.createModalContents(startMessage);
    }

    showResult(errorMessage=""){
        let resultMessage: string;

        if(errorMessage != ""){
            resultMessage = this.strAction + "に失敗しました。\n" + errorMessage;
        }else{
            resultMessage = this.strAction + "が完了しました。";
        }
        // モーダル内コンテンツを初期化
        this.modalWindowElement.empty();

        this.createModalContents(resultMessage);

        this.createBottonInModal("OK");
    }

    setStrAction(inStrAction: string){
        this.strAction = inStrAction;
    }

    // 実際にモーダル内に項目を作成する関数
    private createModalContents(message: string){

        let elementP = document.createElement("p");

        $(elementP).html(message);

        $(elementP).appendChild(this.modalWindowElement);
    }

    private createBottonInModal(buttonName: string){
        let elementButton = document.createElement("button");

        elementButton.type="button";

        // ボタンがクリックされたらモーダルを隠す
        $(elementButton).on("click",() => {
            this.hideModal();
        });

        $(elementButton).html(buttonName);

        $(elementButton).appendChild(this.modalWindowElement);
    }

    private hideModal(){
        this.modalWindowElement.hide();
        this.modalWindowElement.empty();
    }
}