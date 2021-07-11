import { EventControler } from './eventControler';
import { DragAndDrop } from './dragAndDropFile';

$(document).ready(() => {
  const reSetButtonElement = $(".re_set_button");
  const listElement = $(".file_list_wrapper .template");
  const uploadButtonElement = $(".upload_button");
  const uploadFileElement = $(".upload_file");
  const dropAreaElement = $(".upload_area_wrapper");
  const fileInformationElement = $(".file_information");

  const eventControler = new EventControler();
  const dragAndDrop = new DragAndDrop(dropAreaElement, fileInformationElement, uploadFileElement);

  // list取得
  eventControler.setList(listElement);

  // イベントリストを登録
  eventControler.reSetList(reSetButtonElement, listElement);
  eventControler.uploadFile(uploadButtonElement, uploadFileElement);
  dragAndDrop.setDragAndDropEvent();
});
