import { Component, EventEmitter, Input, Output } from "@angular/core";
import { isNil } from "lodash";

@Component({
  selector: "mat-file-upload",
  template: `
    <button
      *ngIf="(!isView && filesServer.length === 0) || allowMultipleFiles"
      [type]="selectFilesButtonType"
      color="primary"
      class="input"
      (click)="fileInput.click()"
      [attr.aria-label]="selectButtonText"
    >
      <span>{{ selectButtonText }}</span>
      <input
        #fileInput
        type="file"
        style="display: none"
        [accept]="acceptedTypes"
        [multiple]="allowMultipleFiles"
        (change)="filesChanged($event.target)"
      />
    </button>

    <div class="col-12 pl-0">
      <div
        *ngIf="selectedFiles.length > 0 || filesServer.length > 0"
        class="row text-file mt-3"
      >
        <div
          class="col-12 files"
          *ngFor="let item of selectedFiles; let i = index"
        >
          <i
            class="material-icons close"
            (click)="removeFile(i)"
            matTooltip="Excluir"
          >
            close
          </i>
          {{ item.name }}
        </div>
        <div
          class="col-12 files"
          style="margin-top: 10px;margin-bottom: 10px;"
          *ngFor="let item of filesServer; let i = index"
        >
          <i
            class="material-icons close"
            (click)="removeFileServer(item)"
            *ngIf="!isView"
            matTooltip="Excluir"
          >
            close
          </i>

          <div>
            <a
              class="material-icons adownload"
              (click)="download(item)"
              *ngIf="!isView && !item.preview && item.url"
              matTooltip="Clique para download"
              href="{{ item.url }}"
              target="_blank"
            >
              download
            </a>
            <span
              *ngIf="!item.preview"
              (click)="download(item)"
              style="cursor: pointer;"
              >{{ item.fileName }}</span
            >
          </div>
          <div *ngIf="item.preview !== ''">
            <img [src]="item.preview" class="preview" />
          </div>
        </div>

        <div>
          <img
            *ngFor="let preview of previews"
            [src]="preview"
            class="preview"
          />
        </div>
      </div>
    </div>
    <br />
  `,
  styleUrls: ["./mat-file-upload.scss"],
})
export class MatFileUploadComponent {
  @Input() selectButtonText = "Select File(s)";
  @Input() selectFilesButtonType: "button" | "menu" | "reset" | "submit" =
    "button";
  @Input() allowMultipleFiles = false;
  @Input() acceptedTypes = "*.*";
  @Output() selectedFilesChanged: EventEmitter<FileList> =
    new EventEmitter<FileList>();

  @Output() deleteFileServer = new EventEmitter();
  @Output() downloadFile = new EventEmitter();
  @Input() filesServer: any[] = [];
  @Input() isView: boolean = false;
  @Input() isPreview: boolean = false;
  previews: string[] = [];

  selectedFiles: File[] = [];

  filesChanged(target?: any): void {
    const files = target.files;
    if (!isNil(files)) {
      for (let index = 0; index < files.length; index++) {
        this.selectedFiles.push(files[index]);
        this.isView = true;

        if (this.isPreview) {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.previews.push(e.target.result);
          };

          reader.readAsDataURL(this.selectedFiles[index]);
        }
      }
    }

    this.selectedFilesChanged.emit(files);
  }

  removeFile(file: number) {
    this.selectedFiles.splice(file, 1);
    this.previews.splice(file, 1);
    this.isView = false;
  }

  removeFileServer(file: any) {
    this.deleteFileServer.emit(file);
  }

  download(file: any) {
    this.downloadFile.emit(file);
  }
}
