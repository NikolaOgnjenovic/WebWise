import { Routes } from '@angular/router';
import {HomepageComponent} from "./components/pages/homepage/homepage.component";
import {VideosComponent} from "./components/pages/videos/videos.component";
import {ContributeComponent} from "./components/pages/contribute/contribute.component";
import {HistoryComponent} from "./components/pages/history/history.component";
import {VideoSessionComponent} from "./components/pages/video-session/video-session.component";

export let routes: Routes;

routes = [
  {path: '', component: HomepageComponent},
  {path: 'videos', component: VideosComponent},
  {path: 'contribute', component: ContributeComponent},
  {path: 'video-session/:id', component: VideoSessionComponent},
  {path: 'video-session/:id/:sessionId', component: VideoSessionComponent},
  {path: 'history', component: HistoryComponent}
];
