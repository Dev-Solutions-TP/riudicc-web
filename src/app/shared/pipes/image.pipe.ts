import { Pipe, PipeTransform } from '@angular/core';
import { ImageEntity } from '@home/interfaces/image.interface';
import { environment } from 'src/environments/environment';

const API_URL = environment.baseUrl;

@Pipe({
    name: 'imageNamePipe',

})

export class ImageNamePipe implements PipeTransform {
    transform(value: string | ImageEntity | ImageEntity[], path: string): any {
        // 🛑 Si no hay valor
        if (!value) {
            return `./assets/images/no-image.jpg`;
        }

        // ✅ Si es string
        if (typeof value === 'string') {
            return `${API_URL}/files/${path}/${value}`;
        }

        // ✅ Si es un objeto único
        if (this.isImageEntity(value)) {
            return `${API_URL}/files/${path}/${value.url}`;
        }

        // ✅ Si es un arreglo
        if (Array.isArray(value)) {
            const image = value.at(0);
            if (!image || !this.isImageEntity(image)) {
                return `./assets/images/no-image.jpg`;
            }
            return `${API_URL}/files/${path}/${image.url}`;
        }

        // 🛑 Valor no reconocido
        return `./assets/images/no-image.jpg`;
    }


    private isImageEntity(obj: any): obj is ImageEntity {
        return obj && typeof obj === 'object' && 'url' in obj;
    }
}
