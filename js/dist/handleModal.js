var HandleModal = /** @class */ (function () {
    function HandleModal(inStrAction, inModalWindowElement) {
        this.strAction = inStrAction;
        this.modalWindowElement = inModalWindowElement;
    }
    HandleModal.prototype.showModal = function () {
        var startMessage = this.strAction + "中。しばらくお待ちください。";
        this.modalWindowElement.show();
        // モーダル内コンテンツを初期化
        this.modalWindowElement.empty();
        this.createModalContents(startMessage);
    };
    HandleModal.prototype.showResult = function (errorMessage) {
        if (errorMessage === void 0) { errorMessage = ""; }
        var resultMessage;
        if (errorMessage != "") {
            resultMessage = this.strAction + "に失敗しました。\n" + errorMessage;
        }
        else {
            resultMessage = this.strAction + "が完了しました。";
        }
        // モーダル内コンテンツを初期化
        this.modalWindowElement.empty();
        this.createModalContents(resultMessage);
        this.createBottonInModal("OK");
    };
    HandleModal.prototype.setStrAction = function (inStrAction) {
        this.strAction = inStrAction;
    };
    // 実際にモーダル内に項目を作成する関数
    HandleModal.prototype.createModalContents = function (message) {
        var elementP = document.createElement("p");
        $(elementP).html(message);
        $(elementP).append(this.modalWindowElement);
    };
    HandleModal.prototype.createBottonInModal = function (buttonName) {
        var _this = this;
        var elementButton = document.createElement("button");
        elementButton.type = "button";
        // ボタンがクリックされたらモーダルを隠す
        $(elementButton).on("click", function () {
            _this.hideModal();
        });
        $(elementButton).html(buttonName);
        $(elementButton).append(this.modalWindowElement);
    };
    HandleModal.prototype.hideModal = function () {
        this.modalWindowElement.hide();
        this.modalWindowElement.empty();
    };
    return HandleModal;
}());
export { HandleModal };
//# sourceMappingURL=handleModal.js.map