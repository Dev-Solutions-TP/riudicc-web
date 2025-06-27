import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'item-bar-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './item-bar-menu.component.html',
})
export class ItemBarMenuComponent {
  link = input.required<string>();

  title = input.required<string>();
  subtitle = input.required<string | undefined>();
}
