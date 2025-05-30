import { User } from "@auth/interfaces/user.interface";
import { ImageEntity } from "@home/interfaces/image.interface";
import { Enlace } from "@home/interfaces/enlace.interface";


export interface SociedadesEUResponse {
    count: number;
    pages: number;
    items: SociedadEU[];
}

export interface SociedadEU {
    createdAt: Date;
    updatedAt: Date;
    id: string;
    slug: string;
    tags: string[];
    images: ImageEntity[];
    enlaces: Enlace[];
    traducciones: Traduccione[];
    createdBy: User;
    updatedBy: User;
}




export interface Traduccione {
    id: string;
    idioma: string;
    titulo: string;
    descripcion: string;
    descripcionCorta: string;
}
