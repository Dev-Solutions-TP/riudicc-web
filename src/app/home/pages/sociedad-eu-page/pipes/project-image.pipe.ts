import { Pipe, PipeTransform } from '@angular/core';
import { ImageEntity } from "@home/interfaces/image.interface";
import { environment } from 'src/environments/environment';



const API_URL = environment.baseUrl;

@Pipe({
    name: 'projectImagePipe',

})

export class ProjectImagePipe implements PipeTransform {
    transform(value: ImageEntity | ImageEntity[],): any {

        if (typeof value === 'string') {
            return `${API_URL}/files/eu/${value}`;
        }

        const images = value as ImageEntity[];
        const image = images.at(0);

        if (!image || images.length === 0) {
            return `./assets/images/no-image.jpg`;
        }

        console.log('Image URL:', image.url);
        return `${API_URL}/files/eu/${image.url}`;



    }
}