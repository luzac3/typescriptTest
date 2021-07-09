var DragAndDrop = /** @class */ (function () {
    function DragAndDrop(inDropAreaElemnt, inFileInformationElement, inUploadFileElement) {
        this.dropAreaElement = inDropAreaElemnt;
        this.fileInformationElement = inFileInformationElement;
        this.uploadFileElement = inUploadFileElement;
    }
    DragAndDrop.prototype.setDragAndDropEvent = function () {
        var _this = this;
        this.dropAreaElement.on('dragover', function (event) {
            event.stopPropagation();
            event.preventDefault();
            _this.dropAreaElement[0].style.background = '#e1e7f0';
        });
        this.dropAreaElement.on('dragleave', function (event) {
            event.stopPropagation();
            event.preventDefault();
            _this.dropAreaElement[0].style.background = '#ffffff';
        });
        this.dropAreaElement.on('drop', function (event) {
            var fileListObject;
            var fileObject;
            event.stopPropagation();
            event.preventDefault();
            _this.dropAreaElement[0].style.background = '#ffffff';
            if (event.originalEvent == undefined) {
                alert("未知のエラーです");
                return;
            }
            if (event.originalEvent.dataTransfer == null) {
                alert("未知のエラーです");
                return;
            }
            fileListObject = event.originalEvent.dataTransfer.files;
            if (fileListObject.length > 1) {
                alert("複数ファイルアップロードには対応しておりません");
            }
            if (_this.uploadFileElement[0].files == null) {
                return;
            }
            fileObject = fileListObject[0];
            // inputのファイルにデータを格納
            _this.uploadFileElement.prop('files')[0] = fileObject;
        });
        this.dropAreaElement.on('click', function () {
            _this.uploadFileElement.trigger('click');
        });
        this.uploadFileElement.on('change', function () {
            var fileSize;
            var fileUnit;
            var fileObject = _this.uploadFileElement.prop('files')[0];
            var changeSizeToAppropriateUnit = new ChangeSizeToAppropriateUnit(fileObject.size);
            // ファイルサイズを変換(byte→Kb,Mb,Gb)
            fileSize = changeSizeToAppropriateUnit.getConvertedSize();
            fileUnit = changeSizeToAppropriateUnit.getUnit();
            // ファイル情報取得、HTML書き換え
            _this.fileInformationElement.html(fileObject.name + "(" + fileSize + fileUnit + ")");
        });
    };
    return DragAndDrop;
}());
export { DragAndDrop };
var ChangeSizeToAppropriateUnit = /** @class */ (function () {
    function ChangeSizeToAppropriateUnit(fileSize) {
        this.kb = 1024;
        this.mb = Math.pow(this.kb, 2);
        this.gb = Math.pow(this.kb, 3);
        if (fileSize >= this.gb) {
            this.unit = 'Gb';
            this.convertedSize = Math.floor((fileSize / this.kb) * 100) / 100;
        }
        else if (fileSize >= this.mb) {
            this.unit = 'Mb';
            this.convertedSize = Math.floor((fileSize / this.mb) * 100) / 100;
        }
        else if (fileSize >= this.kb) {
            this.unit = 'Kb';
            this.convertedSize = Math.floor((fileSize / this.kb) * 100) / 100;
        }
        else {
            this.unit = 'b';
            this.convertedSize = fileSize;
        }
    }
    ChangeSizeToAppropriateUnit.prototype.getUnit = function () {
        return this.unit;
    };
    ChangeSizeToAppropriateUnit.prototype.getConvertedSize = function () {
        return this.convertedSize;
    };
    return ChangeSizeToAppropriateUnit;
}());
//# sourceMappingURL=dragAndDropFile.js.map