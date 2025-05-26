import { AfterViewInit, Component, computed, ElementRef, inject, input, LOCALE_ID, signal, viewChild } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { BannersService } from '../../services/banner.service';


// import Swiper JS
import Swiper from 'swiper';


// core version + navigation, pagination modules:
import { Navigation, Pagination } from 'swiper/modules';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Banner } from '../interfaces/banner.interface';
import { BannerImagePipe } from '../../pipes/banner-image.pipe';




@Component({
  selector: 'home-carousel',
  imports: [BannerImagePipe],
  templateUrl: './home-carousel.component.html',
  styles: `
    .swiper {
      width: 100%;
      height: 500px;
      
    }
  `
})
export class HomeCarouselComponent implements AfterViewInit {

  currentLocale = signal(inject(LOCALE_ID));



  banners = input.required<Banner[]>();

  swiperDiv = viewChild.required<ElementRef>('swiperDiv');

  ngAfterViewInit(): void {

    const element = this.swiperDiv().nativeElement;
    if (!element) {
      console.error('Swiper element not found');
      return;
    }

    const swiper = new Swiper(element, {
      // Optional parameters
      direction: 'horizontal',
      loop: true,

      modules: [Navigation, Pagination],
      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
      },

      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      // And if we need scrollbar
      scrollbar: {
        el: '.swiper-scrollbar',
      },
    });
  }



  // Recibe un banner y devuelve el altText según el idioma seleccionado
  getAltText = (banner: Banner): string => {
    const traduccion = banner.traducciones.find(
      t => t.idioma === this.currentLocale()
    );
    return traduccion?.altText ?? banner.traducciones[0]?.altText ?? '';
  };
}
