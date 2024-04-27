import { Routes } from '@angular/router';
import {HomepageComponent} from "./homepage/homepage.component";
import {VideosComponent} from "./videos/videos.component";
import {ContributeComponent} from "./contribute/contribute.component";
import {VideoSessionComponent} from "./video-session/video-session.component";
import {HistoryComponent} from "./history/history.component";

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'videos', component: VideosComponent },
  { path: 'contribute', component: ContributeComponent },
  { path: 'video-session/:id', component: VideoSessionComponent },
  { path: 'video-session/:id/:sessionId', component: VideoSessionComponent },
  { path: 'history', component: HistoryComponent }
];
