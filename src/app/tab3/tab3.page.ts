import { Component, ViewChild } from '@angular/core';
import { MediaCapture, MediaFile, CaptureError, CaptureVideoOptions } from '@ionic-native/media-capture/ngx';
import { Storage } from '@ionic/storage';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { File } from '@ionic-native/file/ngx';

const MEDIA_FILES_KEY = 'mediaFiles';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  mediaFiles = [];
  @ViewChild('myvideo') myVideo: any;

  constructor(private mediaCapture: MediaCapture,
    private storage: Storage, private file: File, private file2: File, private media: Media) {
  }

  ionViewDidLoad() {
    this.storage.get(MEDIA_FILES_KEY).then(res => {
      this.mediaFiles = JSON.parse(res) || [];
    });
  }

  captureVideo() {
    const options: CaptureVideoOptions = {
      limit: 1,
      duration: 30
    };
    this.mediaCapture.captureVideo(options).then((res: MediaFile[]) => {
      const capturedFile = res[0];
      const fileName = capturedFile.name;
      const dir = capturedFile['localURL'].split('/');
      dir.pop();
      const fromDirectory = dir.join('/');
      const toDirectory = this.file.dataDirectory;

      /*
      this.file.readAsArrayBuffer(fromDirectory, fileName).then( (data: ArrayBuffer) => {
        this.file2.writeFile(fromDirectory, 'myCopy.bin', data, {append: true}).then( (aaa) => {
          console.log('data: ' + data.byteLength);
        });
      });
      */

      this.file.copyFile(fromDirectory , fileName , toDirectory , fileName).then((res) => {
        this.storeMediaFiles([{name: fileName, size: capturedFile.size}]);
      }, err => {
        console.log('err: ', err);
      });
          },
    (err: CaptureError) => console.error(err));
  }

  play(myFile) {
    if (myFile.name.indexOf('.wav') > -1) {
      const audioFile: MediaObject = this.media.create(myFile.localURL);
      audioFile.play();
    } else {
      const path = this.file.dataDirectory + myFile.name;
      const url = path.replace(/^file:\/\//, '');
      const video = this.myVideo.nativeElement;
      video.src = url;
      video.play();
    }
  }

  storeMediaFiles(files) {
    this.storage.get(MEDIA_FILES_KEY).then(res => {
      if (res) {
        let arr = JSON.parse(res);
        arr = arr.concat(files);
        this.storage.set(MEDIA_FILES_KEY, JSON.stringify(arr));
      } else {
        this.storage.set(MEDIA_FILES_KEY, JSON.stringify(files));
      }
      this.mediaFiles = this.mediaFiles.concat(files);
    });
  }

}
