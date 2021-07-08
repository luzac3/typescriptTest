import { EventControler } from "./eventControler";

$(document).ready(function(){
    const reSetButtonElement = $(".reSetButton");
    const listElement = $(".file_list");
    const uploadAreaElement = $(".upload_area");
    const downloadLinkElement = $(".download_link");
    const deleteButtonElement = $(".delete_button");
    const deleteFileElements = $(".delete_button");

    // 
    const deleteFilesElement = $(".delete_files");

    const eventControler = new EventControler();

    // list取得
    eventControler.setList(listElement);

    // イベントリストを登録
    eventControler.reSetList(reSetButtonElement, listElement);
    eventControler.uploadFile(uploadAreaElement);
    eventControler.downloadFile(downloadLinkElement);
    eventControler.deleteFiles(deleteButtonElement, deleteFileElements);
});