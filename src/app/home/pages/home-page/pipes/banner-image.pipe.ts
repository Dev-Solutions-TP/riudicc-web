import { Pipe, PipeTransform } from '@angular/core';
import { Image } from "@home/interfaces/image.interface";
import { environment } from 'src/environments/environment';



const API_URL = environment.baseUrl;

@Pipe({
    name: 'bannerImagePipe',

})

export class BannerImagePipe implements PipeTransform {
    transform(value: string): any {
        if (!value) {
            return `./assets/images/no-image.jpg`;
        }

        if (typeof value === 'string') {
            return `${API_URL}/files/ban/${value}`;
        }







    }
}