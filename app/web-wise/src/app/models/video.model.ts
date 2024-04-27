export class Video {
  id: string;
  title: string;
  thumbnailUrl: string;
  videoUrl: string;
  uploaderId: string;

  constructor(id: string, title: string, thumbnailUrl: string, videoUrl: string, uploaderId: string) {
    this.id = id;
    this.title = title;
    this.thumbnailUrl = thumbnailUrl;
    this.videoUrl = videoUrl;
    this.uploaderId = uploaderId;
  }
}
