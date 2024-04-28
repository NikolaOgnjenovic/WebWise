import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {SidebarComponent} from "../../shared/sidebar/sidebar.component";

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    SidebarComponent
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
}
