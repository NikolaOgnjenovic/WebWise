export class Video {
  title: string;
  thumbnailUrl: string;
  videoUrl: string;

  constructor(title: string, thumbnailUrl: string, videoUrl: string) {
    this.title = title;
    this.thumbnailUrl = thumbnailUrl;
    this.videoUrl = videoUrl;
  }
}
