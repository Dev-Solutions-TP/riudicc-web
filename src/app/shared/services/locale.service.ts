import { Injectable, signal } from '@angular/core';


export type AvailableLocale = 'es' | 'en';
@Injectable({
  providedIn: 'root'
})
export class LocaleService {

  constructor() {    /// TOAMOS DE LOCAL STORAAGGE
    this.currentLocale.set(
      localStorage.getItem('locale') as AvailableLocale ?? 'es'
    );
  }

  private currentLocale = signal<AvailableLocale>('en');




  get getLocale() {
    return this.currentLocale();
  }

  changeLocale(locale: AvailableLocale) {
    /// guardamos en lcoale strogre
    let currente = localStorage.getItem('locale') as AvailableLocale ?? '';
    if (!(currente == locale)) {
      // console.log(currente);
      localStorage.setItem('locale', locale);
      this.currentLocale.set(locale);
      // actualizr o racarga pagntalal o pagina 
      window.location.reload();

    }
  }
}
