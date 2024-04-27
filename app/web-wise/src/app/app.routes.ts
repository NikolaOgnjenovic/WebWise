import { Routes } from '@angular/router';
import {HomepageComponent} from "./homepage/homepage.component";
import {LearnComponent} from "./learn/learn.component";
import {ContributeComponent} from "./contribute/contribute.component";

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'learn', component: LearnComponent },
  { path: 'contribute', component: ContributeComponent }
];
