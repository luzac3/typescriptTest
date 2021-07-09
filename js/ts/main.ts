import { EventControler } from "./eventControler";
import { DragAndDrop } from "./dragAndDropFile";

$(document).ready(() => {
    const reSetButtonElement = $(".reSetButton");
    const listElement = $(".file_list");
    const uploadButtonElement = $(".upload_button");
    const uploadFileElement = $(".upload_file");
    const fileElements = $("file_list").find(".file_name");
    const deleteButtonElement = $(".delete_button");
    const dropAreaElement = $(".upload_area");
    const fileInformationElement = $(".file_information");
    
    const eventControler = new EventControler();
    const dragAndDrop = new DragAndDrop(dropAreaElement, fileInformationElement, uploadFileElement);

    // list取得
    eventControler.setList(listElement);

    // イベントリストを登録
    eventControler.reSetList(reSetButtonElement, listElement);
    eventControler.uploadFile(uploadButtonElement, uploadFileElement);
    eventControler.downloadFile(fileElements);
    eventControler.deleteFiles(deleteButtonElement, fileElements);
    dragAndDrop.setDragAndDropEvent();
});