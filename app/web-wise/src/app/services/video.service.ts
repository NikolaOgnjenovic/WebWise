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
      'Content-Type': 'application/json',
    });
    console.log("UIPLOADER ID: " + uploaderId);
    return this.http.post('http://localhost:8001/api/v1/videos/', { title, thumbnail_url: thumbnailUrl, video_url: videoUrl, uploader_id: uploaderId }, { headers })
      .pipe(
        catchError(error => {
          return throwError(error);
        })
      );
  }

  getAll(): Video[] {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const videos: Video[] = [];
    var observable = this.http.get<any>('http://localhost:8001/api/v1/videos/',{ headers })
      .pipe(
        map(response => {
          return response;
        }),
        catchError(error => {
          return throwError(error);
        })
      );
    observable.subscribe(response => {
        response.forEach((video: any) => {
          videos.push({
            id: video['id'],
            title: video.title,
            thumbnailUrl: video['thumbnail_url'],
            videoUrl: video['video_url'],
            uploaderId: video['uploader_id']
          })
        })
      },
      error => {
        return throwError(error);
      }
    );

    return videos;
  }

  getVideosByUploaderId(uploaderId: string): Video[] {
    console.log("uploader id: " + uploaderId);
    console.log(typeof (uploaderId));
    return this.getAll().filter(video => {
      console.log("VIDEO: " + video);
      console.log(typeof (video.uploaderId));
      return video.uploaderId.toString() === uploaderId;
    });
  }

  getVideoById(id: string | null): Video | null {
    return this.getAll().find(video => video.id === id) ?? null;
  }
}
