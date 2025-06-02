import { Injectable, computed, inject } from '@angular/core';

import { AppText, AppTextEntry } from '@shared/utils/app-text';
import { LocaleService } from './locale.service';


export type IdiomaSoportado = 'es' | 'en' | 'fr';



@Injectable({ providedIn: 'root' })
export class LocalizationService {
    private localeService = inject(LocaleService);
    private currentLocale = this.localeService.localeSignal;


    getText(entry: Readonly<AppTextEntry>, fallback = '') {
        return computed(() => {
            const locale = this.currentLocale();
            return entry[locale] ?? fallback;
        });
    }

    // Atajos
    viewMoreText = this.getText(AppText.app.about, 'More');
    showMapText = this.getText(AppText.app.showMap, 'Show map');
    aboutText = this.getText(AppText.app.about, 'About');
}
