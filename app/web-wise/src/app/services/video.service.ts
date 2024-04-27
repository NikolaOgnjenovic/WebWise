import { Injectable } from '@angular/core';
import { Video } from '../models/video.model';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";
import {Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  constructor(private http: HttpClient) {}

  createVideo(title: string, thumbnailUrl: string, videoUrl: string, uploaderId: string): Observable<any> {
    const headers = new HttpHeaders({
      'X-CSRFToken': 'B9p9SRWnot4fedpd8sDpBJSOKxs1BXHn'
    });

    return this.http.post<any>('http://localhost:8001/api/v1/videos/', { title, thumbnailUrl, videoUrl, uploaderId }, { headers })
      .pipe(
        catchError(error => {
          return throwError(error);
        })
      );
  }

  getAll(): Video[] {
    const headers = new HttpHeaders({
      'X-CSRFToken': 'B9p9SRWnot4fedpd8sDpBJSOKxs1BXHn'
    });

    const videos: Video[] = [];
    this.http.get<any>('http://localhost:8001/api/v1/videos/',{ headers })
      .pipe(
        map(response => {
          response.forEach((video: any) => {
            videos.push({
              id: video.id,
              title: video.title,
              thumbnailUrl: video.thumbnailUrl,
              videoUrl: video.videoUrl,
              uploaderId: video.uploaderId
            })
          })
        }),
        catchError(error => {
          return throwError(error);
        })
      );

    return videos;
  }

  getVideosByUploaderId(uploaderId: string): Video[] {
    return this.getAll().filter(video => video.uploaderId === uploaderId);
  }

  getVideoById(id: string | null): Video | null {
    return this.getAll().find(video => video.id === id) ?? null;
  }
}
