import { Injectable } from '@angular/core';
import { Video } from '../models/video.model';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private videos: Video[] = [
    new Video('1',
      'Video 1',
      'https://i.ytimg.com/vi/NpeYTcS7n-M/hqdefault.jpg',
      'https://www.youtube.com/watch?v=NpeYTcS7n-M',
      'user1'),
    new Video('2',
      'Video 2',
      'https://i.ytimg.com/vi/kM6yRUOnrI8/hqdefault.jpg',
      'https://www.youtube.com/watch?v=kM6yRUOnrI8',
      'user1'),
    new Video('3',
      'Video 3',
      'https://i.ytimg.com/vi/SU-DuqOcqgo/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLD2nvb9U-ajU3NE1DRf7alFbe4YdQ',
      'https://www.youtube.com/watch?v=SU-DuqOcqgo',
      'user2')
  ];

  constructor() {}

  addVideo(title: string, thumbnailUrl: string, videoUrl: string, uploaderId: string): void {
    const video = {
      id: this.generateUniqueId(),
      title,
      thumbnailUrl,
      videoUrl,
      uploaderId
    }
    this.videos.push(video);
  }

  getAll(): Video[] {
    return this.videos;
  }

  getVideosByUploaderId(uploaderId: string): Video[] {
    return this.videos.filter(video => video.uploaderId === uploaderId);
  }

  getVideoById(id: string | null): Video | null {
    return this.videos.find(video => video.id === id) ?? null;
  }

  private generateUniqueId(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
