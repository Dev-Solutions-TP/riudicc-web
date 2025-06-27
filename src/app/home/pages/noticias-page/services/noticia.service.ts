import { HttpClient } from '@angular/common/http';
import { inject, Injectable, LOCALE_ID, signal } from '@angular/core';
import { ImageEntity } from "@home/interfaces/image.interface";
import { Enlace } from "@home/interfaces/enlace.interface";
import { InstitucionEntity } from "@home/pages/instituciones/interfaces/aliados.interface";
import { Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NoticiaEntity, NoticiasResponse, Traduccion } from '../interfaces/noticia.interface';
import { User } from '@auth/interfaces/user.interface';




const API_URL = environment.baseUrl;

interface Options {
    limit?: number;
    offset?: number;

}

const emptyNoticia: NoticiaEntity = {
    id: 'new',
    slug: '',
    tags: [],
    paisCode: '',
    pais: '',
    ciudad: '',
    latitud: '',
    longitud: '',
    state: '',
    displayDate: new Date(),
    images: [] as ImageEntity[],
    enlaces: [] as Enlace[],
    traducciones: [] as Traduccion[],
    instituciones: [] as InstitucionEntity[],
    owner: {} as User,
    createdBy: {} as User,
    updatedBy: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
};

// interfaces/create-noticia.dto.ts

export interface CreateNoticiaDto {
    slug: string;
    tags: string[];
    paisCode?: string;
    pais?: string;
    ciudad?: string;
    latitud?: number
    longitud?: number;
    state: string;
    displayDate?: Date;
    instituciones: string[]; // Deben ser IDs (UUID)
    traducciones: {
        idioma: string;
        title: string;
        contentDescription: string;
        content: string;
    }[];
    images: { url: string; altText?: string }[];
    enlaces: { url: string; label?: string }[];
}

const emptyCreateNoticia: CreateNoticiaDto = {
    slug: '',
    tags: [],
    paisCode: '',
    pais: '',
    ciudad: '',
    latitud: 0,
    longitud: 0,
    state: '',
    displayDate: new Date(),
    instituciones: [],
    traducciones: [{
        idioma: 'es',
        title: '',
        contentDescription: '',
        content: '',
    }],
    images: [],
    enlaces: [],
};



@Injectable({ providedIn: 'root' })
export class NoticiasService {
    constructor() { }


    private http = inject(HttpClient);


    private noticiasCache = new Map<string, NoticiasResponse>();
    private noticiaCache = new Map<string, NoticiaEntity>();


    getNoticias(option: Options): Observable<NoticiasResponse> {
        const { limit = 5, offset = 0 } = option;

        const key = `${limit}-${offset}`; // 9-0-''

        if (this.noticiaCache.has(key)) {
            return of(this.noticiasCache.get(key)!);
        }
        return this.http.get<NoticiasResponse>(`${API_URL}/noticias/public`, {
            params: {
                limit,
                offset,
            },
        }).pipe(
            tap((response) => console.log('Response:', response)),
            tap((resp) => this.noticiasCache.set(key, resp))
        );
    }


    getNoticiaByIdSlug(idSlug: string): Observable<NoticiaEntity> {
        if (this.noticiaCache.has(idSlug)) {
            return of(this.noticiaCache.get(idSlug)!);
        }

        return this.http.get<NoticiaEntity>(`${API_URL}/noticias/public/${idSlug}`,)
            .pipe(tap((noticia) => this.noticiaCache.set(idSlug, noticia)));
        ;
    }

    getNoticiaByIdSlugUser(idSlug: string): Observable<NoticiaEntity> {
        if (this.noticiaCache.has(idSlug)) {
            return of(this.noticiaCache.get(idSlug)!);
        }

        return this.http.get<NoticiaEntity>(`${API_URL}/noticias/${idSlug}`,)
            .pipe(tap((noticia) => this.noticiaCache.set(idSlug, noticia)));
        ;
    }


    getNoticiaById(id: string): Observable<NoticiaEntity> {
        if (id === 'new') {
            return of(emptyNoticia);
        }

        if (this.noticiaCache.has(id)) {
            return of(this.noticiaCache.get(id)!);
        }

        return this.http
            .get<NoticiaEntity>(`${API_URL}/noticia/${id}`)
            .pipe(tap((noticia) => this.noticiaCache.set(id, noticia)));
    }

    createNoticia(noticia: Partial<NoticiaEntity>): Observable<NoticiaEntity> {
        return this.http.post<NoticiaEntity>(`${API_URL}/noticias`, noticia).pipe(
            tap((created) => this.noticiaCache.set(created.id, created))
        );
    }

    // createNoticia(noticia: Partial<NoticiaEntity>): Observable<NoticiaEntity> {
    //     return this.http.post<NoticiaEntity>(`${API_URL}/noticias`, noticia).pipe(
    //         tap((created) => this.noticiaCache.set(created.id, created))
    //     );
    // }

    updateNoticia(id: string, noticia: Partial<NoticiaEntity>): Observable<NoticiaEntity> {
        return this.http.patch<NoticiaEntity>(`${API_URL}/noticias/${id}`, noticia).pipe(
            tap((updated) => this.noticiaCache.set(updated.id, updated))
        );
    }

    deleteNoticia(id: string): Observable<boolean> {
        return this.http.delete<boolean>(`${API_URL}/noticias/${id}`).pipe(
            tap(() => this.noticiaCache.delete(id))
        );
    }

}