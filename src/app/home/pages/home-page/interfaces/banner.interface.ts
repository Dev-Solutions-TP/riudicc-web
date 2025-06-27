import { User } from "@auth/interfaces/user.interface";

export interface BannersResponse {
    count: number;
    pages: number;
    items: BannerEntity[];
}

export interface BannerEntity {
    createdAt: Date;
    updatedAt: Date;
    id: string;
    slug: string;
    tags: string[];
    image: string;
    enlaces?: string;
    fechaInicio: string;
    fechaFin: string;
    state: string;
    traducciones: TraduccionBanner[];
    createdBy: User;
    updatedBy: User;
}




export interface TraduccionBanner {
    id: string;
    idioma: string;
    altText: string;
}


export interface UpdateBannerDto {
    slug?: string;
    tags?: string[];
    image?: string;
    enlaces?: string | null;
    fechaInicio?: string;
    fechaFin?: string;
    state?: string;
    traducciones?: {
        idioma: string;
        altText: string;
    }[];
}
