import { Injectable } from '@angular/core';
import {Video} from "../../models/video.model";
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private videos: Video[] = [
    new Video('1',
      'Procedural Landmass Generation (E15: data storage)',
      'https://i.ytimg.com/vi/2IZ-99ueB4A/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLDfjeg4cSM8VJYyxwbT0g7TRg2lZA',
      'https://drive.google.com/file/d/14AMY8p4aTqIdx6nddzUd0Pn5Kth9ETxL/view?usp=sharing',
      'user1'),
    new Video('2',
      'Procedural Landmass Generation (E16: colour shader)',
      'https://i.ytimg.com/vi/XdahmaohYvI/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLDIGtAqU9RCBZ-88C0_GUqbeT9hZQ',
      'https://drive.google.com/file/d/1LGfhZlgUHJC5xIZdZVUhMAzCuCXsq_wC/view?usp=sharing',
      'user1'),
    new Video('3',
      'Procedural Landmass Generation (E17: texture shader)',
      'https://i.ytimg.com/vi/XjH-UoyaTgs/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLDvOS1TVpo_B3jepccxl19gLVjm4g',
      'https://drive.google.com/file/d/1AlwPA0myPzX0oHvodFYCLvc1f3RqAlHw/view?usp=sharing',
      'user2')
  ];

  constructor(private http: HttpClient) {}

  addVideo(title: string, thumbnailUrl: string, videoUrl: string, uploaderId: string): void {
    const video = {
      id: this.generateUniqueId(),
      title,
      thumbnailUrl,
      videoUrl,
      uploaderId
    }
    this.videos.push(video);

    var observable = this.http.post<any>('http://localhost:8002/video/'+video.id, video.videoUrl)
      .pipe(
        map(response => {
          return response;
        }),
        catchError(error => {
          return throwError(error);
        })
      );
      observable.subscribe((response: any) => {
        console.log(response);
      });

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
