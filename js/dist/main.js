import { EventControler } from './eventControler.js';
import { DragAndDrop } from './dragAndDropFile.js';
$(document).ready(function () {
    var reSetButtonElement = $(".reSetButton");
    var listElement = $(".file_list");
    var uploadButtonElement = $(".upload_button");
    var uploadFileElement = $(".upload_file");
    var fileElements = $("file_list").find(".file_name");
    var deleteButtonElement = $(".delete_button");
    var dropAreaElement = $(".upload_area");
    var fileInformationElement = $(".file_information");
    var eventControler = new EventControler();
    var dragAndDrop = new DragAndDrop(dropAreaElement, fileInformationElement, uploadFileElement);
    // list取得
    eventControler.setList(listElement);
    // イベントリストを登録
    eventControler.reSetList(reSetButtonElement, listElement);
    eventControler.uploadFile(uploadButtonElement, uploadFileElement);
    eventControler.downloadFile(fileElements);
    eventControler.deleteFiles(deleteButtonElement, fileElements);
    dragAndDrop.setDragAndDropEvent();
});
//# sourceMappingURL=main.js.map