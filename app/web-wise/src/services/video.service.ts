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
      'https://www.youtube.com/watch?v=NpeYTcS7n-M'),
    new Video('2',
      'Video 2',
      'https://i.ytimg.com/vi/kM6yRUOnrI8/hqdefault.jpg',
      'https://www.youtube.com/watch?v=kM6yRUOnrI8'),
  ];

  constructor() {}

  getVideos(): Video[] {
    return this.videos;
  }

  getVideoById(id: string | null): Video | null {
    return this.videos.find(video => video.id === id) ?? null;
  }
}
