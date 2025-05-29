import { User } from "@auth/interfaces/user.interface";
import { Image } from "@home/interfaces/image.interface";
import { Enlace } from "@home/interfaces/enlace.interface";
import { Institucion } from "@home/pages/instituciones/interfaces/aliados.interface";

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
    images: Image[];
    enlaces: Enlace[];
    traducciones: Traduccion[];
    instituciones: Institucion[];
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
