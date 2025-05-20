import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeNavbarComponent } from "../../components/home-navbar/home-navbar.component";
import { AppFooterComponent } from "@shared/components/app-footer/app-footer.component";

@Component({
  selector: 'app-home-layout',
  imports: [RouterOutlet, HomeNavbarComponent, AppFooterComponent],
  templateUrl: './home-layout.component.html',
})
export class HomeLayoutComponent { }
