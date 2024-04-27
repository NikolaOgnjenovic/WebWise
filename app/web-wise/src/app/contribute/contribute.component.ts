import { Component } from '@angular/core';
import {NavbarComponent} from "../navbar/navbar.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-contribute',
  standalone: true,
    imports: [
        NavbarComponent,
        RouterOutlet
    ],
  templateUrl: './contribute.component.html',
  styleUrl: './contribute.component.css'
})
export class ContributeComponent {

}
