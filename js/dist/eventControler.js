import { HandleModal } from "./handleModal.js";
import { HandleDropboxFile } from "./handleDropboxFile.js";
var EventControler = /** @class */ (function () {
    function EventControler() {
    }
    EventControler.prototype.setList = function (listElement) {
        // listを表示する
        var handleDropboxFile = new HandleDropboxFile();
        handleDropboxFile.getFileList().then(function (listData) {
            console.log(listData);
        }, function (error) {
            alert("erorr");
        }).catch(function (error) {
            alert("erorr");
        });
        console.log(listElement);
    };
    EventControler.prototype.reSetList = function (reSetButtonElement, listElement) {
        reSetButtonElement.on("change", function () {
            var handleModal = new HandleModal("リスト再表示処理", $(".modal_window"));
            var handleDropboxFile = new HandleDropboxFile();
            // モーダルウィンドウを表示
            handleModal.showModal();
            handleDropboxFile.getFileList().then(function (listData) {
                // 取得結果をモーダルに表示
                if (Array.isArray(listData)) {
                    handleModal.showResult();
                    var eventControler = new EventControler();
                    // ここが拾ってきたデータの場所
                    console.log(listData);
                    // ファイル一覧を表示
                    eventControler.setList(listElement);
                }
                else {
                    handleModal.showResult("未知のエラー");
                }
            }, function (error) {
                handleModal.showResult(error.error);
            }).catch(function (e) {
                handleModal.showResult(e.message);
            });
        });
    };
    EventControler.prototype.uploadFile = function (uploadButtonElement, uploadFileElement) {
        uploadButtonElement.on("click", function () {
            var filesElement = uploadFileElement.prop('files');
            var uploadFile;
            if (filesElement == null) {
                alert("ファイルが登録されていません");
                return;
            }
            else {
                uploadFile = filesElement[0];
            }
            var handleModal = new HandleModal("アップロード", $(".modal_window"));
            var handleDropboxFile = new HandleDropboxFile();
            try {
                // モーダルウィンドウを表示
                handleModal.showModal();
            }
            catch (_a) {
                //
            }
            // アップロード処理実行
            handleDropboxFile.uploadFile(uploadFile).then(function (res) {
                if (typeof res === "number") {
                    handleModal.showResult();
                }
                else {
                    handleModal.showResult("未知のエラーが発生しました");
                }
            }, function (res) {
                handleModal.showResult(res.error);
            }).catch(function (e) {
                handleModal.showResult(e.message);
            });
        });
    };
    EventControler.prototype.downloadFile = function (downloadLinkElement) {
        downloadLinkElement.on("click", function (event) {
            var handleModal = new HandleModal("ダウンロード", $(".modal_window"));
            var handleDropboxFile = new HandleDropboxFile();
            try {
                // モーダルウィンドウを表示
                handleModal.showModal();
            }
            catch (_a) {
                //
            }
            // ダウンロード処理実行
            handleDropboxFile.downloadFile($(event.target).data("filename")).then(function (res) {
                if (typeof res === "number") {
                    handleModal.showResult();
                }
                else {
                    handleModal.showResult("未知のエラーが発生しました");
                }
            }, function (res) {
                handleModal.showResult(res.error);
            }).catch(function (e) {
                handleModal.showResult(e.message);
            });
        });
    };
    EventControler.prototype.deleteFiles = function (deleteButtonElement, deleteFileElements) {
        deleteButtonElement.on("click", function () {
            var filesNum = deleteFileElements.length;
            var confirmMessage = filesNum + "件削除します。\nよろしいですか？";
            var deleteFileElementsList;
            var deleteFileList;
            if (window.confirm(confirmMessage)) {
                var handleModal_1 = new HandleModal("削除", $(".modal_window"));
                var handleDropboxFile = new HandleDropboxFile();
                try {
                    // モーダルウィンドウを表示
                    handleModal_1.showModal();
                }
                catch (_a) {
                    //
                }
                // 削除ファイル名一覧を取得
                deleteFileElementsList = deleteFileElements.find("input[type='checkbox']").filter(":checked");
                deleteFileList = [];
                deleteFileElementsList.each(function (key, value) {
                    deleteFileList.push($(value).data("filename"));
                });
                if (deleteFileList.length) {
                    alert("1件も選択されていません");
                    return;
                }
                // 削除処理実行
                handleDropboxFile.deleteFiles(deleteFileList).then(function (res) {
                    if (typeof res === "number") {
                        handleModal_1.showResult();
                    }
                    else {
                        handleModal_1.showResult("未知のエラーが発生しました");
                    }
                }, function (res) {
                    handleModal_1.showResult(res.error);
                }).catch(function (e) {
                    handleModal_1.showResult(e.message);
                });
            }
        });
    };
    return EventControler;
}());
export { EventControler };
//# sourceMappingURL=eventControler.js.map