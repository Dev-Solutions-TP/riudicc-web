import { User } from "@auth/interfaces/user.interface";
import { ImageEntity } from "@home/interfaces/image.interface";
import { Enlace } from "@home/interfaces/enlace.interface";
import { InstitucionEntity } from "@home/pages/instituciones/interfaces/aliados.interface";

export interface NoticiasResponse {
    count: number;
    pages: number;
    items: NoticiaEntity[];
}

export interface NoticiaEntity {
    createdAt: Date;
    updatedAt: Date;
    id: string;
    slug: string;
    tags: string[];
    paisCode: string;
    pais: string;
    ciudad: string;
    latitud: string;
    longitud: string;
    state: string;
    displayDate: Date;
    images: ImageEntity[];
    enlaces: Enlace[];
    traducciones: Traduccion[];
    instituciones: InstitucionEntity[];
    owner: User;
    createdBy: User;
    updatedBy: Date;
}






export interface Traduccion {
    id: string;
    idioma: string;
    title: string;
    contentDescription: string;
    content: string;
}
