import { Routes } from '@angular/router';
import {HomepageComponent} from "./homepage/homepage.component";
import {LearnComponent} from "./learn/learn.component";
import {ContributeComponent} from "./contribute/contribute.component";
import {VideoSessionComponent} from "./video-session/video-session.component";

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'learn', component: LearnComponent },
  { path: 'contribute', component: ContributeComponent },
  { path: 'video-session/:id', component: VideoSessionComponent }
];
