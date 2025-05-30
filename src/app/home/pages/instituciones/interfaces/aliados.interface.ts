import { User } from "@auth/interfaces/user.interface";
import { ImageEntity } from "@home/interfaces/image.interface";
import { Enlace } from "@home/interfaces/enlace.interface";

export interface InstitucionResponse {
    count: number;
    pages: number;
    items: Institucion[];
}

export interface Institucion {
    createdAt: Date;
    updatedAt: Date;
    id: string;
    codigo: string;
    tipo: string;
    slug: string;
    tags: string[];
    pais: string;
    ciudad: string;
    latitud: string;
    longitud: string;
    images: ImageEntity[];
    enlaces: Enlace[];
    traducciones: Traduccione[];
    owner: User;
    createdBy: User;
    updatedBy: null;
}



export interface Traduccione {
    id: string;
    idioma: string;
    name: string;
    description: string;
}
