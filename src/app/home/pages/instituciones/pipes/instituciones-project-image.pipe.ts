import { Pipe, PipeTransform } from '@angular/core';
import { ImageEntity } from "@home/interfaces/image.interface";
import { environment } from 'src/environments/environment';



const API_URL = environment.baseUrl;

@Pipe({
    name: 'institucionImagePipe',

})

export class InstitcionImagePipe implements PipeTransform {
    transform(value: ImageEntity | ImageEntity[],): any {

        if (typeof value === 'string') {
            return `${API_URL}/files/uni/${value}`;
        }

        const images = value as ImageEntity[];
        const image = images.at(0);

        if (!image || images.length === 0) {
            return `./assets/images/no-image.jpg`;
        }

        console.log('Image URL:', image.url);
        return `${API_URL}/files/uni/${image.url}`;



    }
}