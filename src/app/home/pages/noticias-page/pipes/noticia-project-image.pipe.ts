import { Pipe, PipeTransform } from '@angular/core';
import { Image } from "@home/interfaces/image.interface";
import { environment } from 'src/environments/environment';



const API_URL = environment.baseUrl;

@Pipe({
    name: 'noticiaImagePipe',

})

export class NoticiaImagePipe implements PipeTransform {
    transform(value: Image | Image[],): any {

        if (typeof value === 'string') {
            return `${API_URL}/files/not/${value}`;
        }

        const images = value as Image[];
        const image = images.at(0);

        if (!image || images.length === 0) {
            return `./assets/images/no-image.jpg`;
        }

        console.log('NoticiaImagePipe Image URL:', image.url);
        return `${API_URL}/files/not/${image.url}`;



    }
}