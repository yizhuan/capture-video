import { MediaFile } from '@ionic-native/video-capture-plus/ngx';
export interface Video {
    videoId: string;
    title: string;
    videoUrl: string;
    videoFile: MediaFile;
}
