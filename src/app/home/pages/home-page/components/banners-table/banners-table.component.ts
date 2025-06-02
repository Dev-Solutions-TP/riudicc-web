import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject, input, LOCALE_ID, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ImageNamePipe } from '@shared/pipes/image.pipe';


import { LocalizationService } from '@shared/services/localization.service';
import { AppText } from '@shared/utils/app-text';
import { Banner, } from '../../interfaces/banner.interface';


@Component({
  selector: 'banners-table',
  imports: [RouterLink, DatePipe, ImageNamePipe],
  templateUrl: './banners-table.component.html',
})
export class ProductTableComponent {
  banners = input.required<Banner[]>();

  private currentLocale = signal(inject(LOCALE_ID));

  private lang = inject(LocalizationService);




  enlacesRelacionados = this.lang.getText(AppText.app.enlacesRelacionados);
  sociosRelacionados = this.lang.getText(AppText.app.sociosRelacionados);

}
