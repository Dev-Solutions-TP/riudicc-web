import { HttpClient } from '@angular/common/http';
import { inject, Injectable, LOCALE_ID, signal } from '@angular/core';

import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NoticiaEntity, NoticiasResponse } from '../interfaces/noticia.interface';




const API_URL = environment.baseUrl;

interface Options {
    limit?: number;
    offset?: number;

}



@Injectable({ providedIn: 'root' })
export class NoticiasService {
    constructor() { }


    private http = inject(HttpClient);





    getNoticias(option: Options): Observable<NoticiasResponse> {
        const { limit = 5, offset = 0 } = option;

        return this.http.get<NoticiasResponse>(`${API_URL}/noticias`, {
            params: {
                limit,
                offset,
            },
        }).pipe(

            tap((response) => console.log('Response:', response)),
        );
    }


    getNoticiaByIdSlug(idSlug: string): Observable<NoticiaEntity> {


        return this.http.get<NoticiaEntity>(`${API_URL}/noticias/${idSlug}`, {});
    }

}