export class DragAndDrop {
    dropAreaElement: JQuery<HTMLElement>;
    fileInformationElement: JQuery<HTMLElement>
    uploadFileElement: JQuery<HTMLElement>

    constructor(inDropAreaElemnt: JQuery<HTMLElement>, inFileInformationElement: JQuery<HTMLElement>, inUploadFileElement: JQuery<HTMLElement>) {
        this.dropAreaElement = inDropAreaElemnt;
        this.fileInformationElement = inFileInformationElement;
        this.uploadFileElement = inUploadFileElement;
    }

    setDragAndDropEvent(){
        this.dropAreaElement.on('dragover',(event) => {
           event.stopPropagation();
           event.preventDefault();
           this.dropAreaElement.addClass("bg-info");
           this.dropAreaElement.removeClass("bg-warning");
           this.dropAreaElement.removeClass("bg-success");
        });

        this.dropAreaElement.on('dragleave',(event) => {
           event.stopPropagation();
           event.preventDefault();
           if(this.uploadFileElement.prop('files').length === 0){
             this.dropAreaElement.addClass("bg-warning");
             this.dropAreaElement.removeClass("bg-success");
           }else{
             this.dropAreaElement.addClass("bg-success");
             this.dropAreaElement.removeClass("bg-warning");
           }
           this.dropAreaElement.removeClass("bg-info");
        });

        this.dropAreaElement.on('drop',(event) => {
            let fileListObject: FileList;

            event.stopPropagation();
            event.preventDefault();
            this.dropAreaElement.addClass("bg-success");
            this.dropAreaElement.removeClass("bg-warning");
            this.dropAreaElement.removeClass("bg-info");

            if(event.originalEvent == undefined){
              alert("未知のエラーです");
              return;
            }

            if(event.originalEvent.dataTransfer == null){
              alert("未知のエラーです");
              return;
            }

            fileListObject = event.originalEvent.dataTransfer.files;

            if(fileListObject.length > 1){
                alert("複数ファイルアップロードには対応しておりません");
                return;
            }

            // inputのファイルにデータを格納
            this.uploadFileElement.prop('files',fileListObject);

            // inputを書き換えた際にChangeイベントが走らないため、changeを実行
            this.uploadFileElement.change();
        });

        this.dropAreaElement.on('click',() => {
            this.uploadFileElement[0].click();
        });

        this.uploadFileElement.on('change',() => {
            let fileSize: number;
            let fileUnit: string;

            if(this.uploadFileElement.prop('files').length === 0){
              this.fileInformationElement.html("ファイルがありません");
              this.dropAreaElement.addClass("bg-warning");
              this.dropAreaElement.removeClass("bg-info");
              this.dropAreaElement.removeClass("bg-success");
              return;
            }

            const fileObject = this.uploadFileElement.prop('files')[0];

            const changeSizeToAppropriateUnit = new ChangeSizeToAppropriateUnit(fileObject.size);

            // ファイルサイズを変換(byte→Kb,Mb,Gb)
            fileSize = changeSizeToAppropriateUnit.getConvertedSize();
            fileUnit = changeSizeToAppropriateUnit.getUnit();

            // ファイル情報取得、HTML書き換え
            this.fileInformationElement.html(fileObject.name+"(" + fileSize + fileUnit + ")");
        });
    }
}

class ChangeSizeToAppropriateUnit {
    private kb: number;
    private mb: number;
    private gb: number;
    private unit: string;
    private convertedSize: number;

    constructor(fileSize: number){
        this.kb = 1024;
        this.mb = Math.pow(this.kb, 2);
        this.gb = Math.pow(this.kb, 3);

        if(fileSize >= this.gb) {
            this.unit = 'Gbyte';
            this.convertedSize = Math.floor((fileSize / this.gb) * 100) / 100;
        }else if(fileSize >= this.mb) {
            this.unit = 'Mbyte';
            this.convertedSize = Math.floor((fileSize / this.mb) * 100) / 100;
        }else if(fileSize >= this.kb) {
            this.unit = 'Kbyte';
            this.convertedSize = Math.floor((fileSize / this.kb) * 100) / 100;
        }else{
            this.unit = 'byte';
            this.convertedSize = fileSize;
        }
    }

    getUnit(){
        return this.unit;
    }

    getConvertedSize(){
        return this.convertedSize;
    }
}
