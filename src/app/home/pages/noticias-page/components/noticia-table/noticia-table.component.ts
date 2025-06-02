import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject, input, LOCALE_ID, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ImageNamePipe } from '@shared/pipes/image.pipe';
import { NoticiaEntity } from '../../interfaces/noticia.interface';
import { getTraduccionNoticia, getTraduccionNoticiaFromEntity } from '../../utils/noticia.utils';
import { LocalizationService } from '@shared/services/localization.service';
import { AppText } from '@shared/utils/app-text';
import { NoticiaImagePipe } from "../../pipes/noticia-project-image.pipe";

@Component({
  selector: 'noticias-table',
  imports: [RouterLink, DatePipe, NoticiaImagePipe],
  templateUrl: './noticia-table.component.html',
})
export class ProductTableComponent {
  noticias = input.required<NoticiaEntity[]>();

  private currentLocale = signal(inject(LOCALE_ID));

  private lang = inject(LocalizationService);



  getTraduccionFrom(noticia: NoticiaEntity) {
    const lang = this.currentLocale();
    return getTraduccionNoticiaFromEntity(noticia, lang);
  }



  enlacesRelacionados = this.lang.getText(AppText.app.enlacesRelacionados);
  sociosRelacionados = this.lang.getText(AppText.app.sociosRelacionados);

}
