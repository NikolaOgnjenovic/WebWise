export class Video {
  id: string;
  title: string;
  thumbnailUrl: string;
  videoUrl: string;

  constructor(id: string, title: string, thumbnailUrl: string, videoUrl: string) {
    this.id = id;
    this.title = title;
    this.thumbnailUrl = thumbnailUrl;
    this.videoUrl = videoUrl;
  }
}
