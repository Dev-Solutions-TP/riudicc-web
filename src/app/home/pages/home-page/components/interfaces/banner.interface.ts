import { User } from "@auth/interfaces/user.interface";

export interface BannersResponse {
    count: number;
    pages: number;
    items: Banner[];
}

export interface Banner {
    createdAt: Date;
    updatedAt: Date;
    id: string;
    slug: string;
    tags: string[];
    image: string;
    enlaces: string;
    fechaInicio: Date;
    fechaFin: Date;
    activo: boolean;
    traducciones: TraduccionBanner[];
    createdBy: User;
    updatedBy: User;
}



export interface TraduccionBanner {
    id: string;
    idioma: string;
    altText: string;
}
