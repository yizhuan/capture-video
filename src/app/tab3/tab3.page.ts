import { Component } from '@angular/core';

// import { VideoCapturePlus, VideoCapturePlusOptions, MediaFile } from '@ionic-native/video-capture-plus/ngx';
import { MediaCapture, MediaFile, CaptureError, CaptureVideoOptions } from '@ionic-native/media-capture/ngx';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private mediaCapture: MediaCapture) { }


  captureVideo() {
    const videoOptions: CaptureVideoOptions = {
      limit: 1,
      duration: 15,
    };

    this.mediaCapture.captureVideo(videoOptions).then( (mediaFiles: MediaFile[]) => {
      console.log(mediaFiles);
      console.log(mediaFiles[0].fullPath);
    }
    );
  }

}
