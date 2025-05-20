import { HttpClient } from '@angular/common/http';
import { inject, Injectable, LOCALE_ID, signal } from '@angular/core';
import { SociedadesEUResponse } from '../interfaces/sociedad.interface';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';




const API_URL = environment.baseUrl;

interface Options {
    limit?: number;
    offset?: number;

}



@Injectable({ providedIn: 'root' })
export class SociedadEuService {
    constructor() { }


    private http = inject(HttpClient);





    getSociedad(option: Options): Observable<SociedadesEUResponse> {
        const { limit = 8, offset = 0 } = option;

        return this.http.get<SociedadesEUResponse>(`${API_URL}/eu`, {
            params: {
                limit,
                offset,
            },
        }).pipe(

            tap((response) => console.log('Response:', response)),
        );
    }

}