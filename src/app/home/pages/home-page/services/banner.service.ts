import { HttpClient } from '@angular/common/http';
import { inject, Injectable, LOCALE_ID, signal } from '@angular/core';

import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BannersResponse } from '../interfaces/banner.interface';




const API_URL = environment.baseUrl;

interface Options {
    limit?: number;
    offset?: number;

}



@Injectable({ providedIn: 'root' })
export class BannersService {
    constructor() { }


    private http = inject(HttpClient);





    getBanners(option: Options): Observable<BannersResponse> {
        const { limit = 8, offset = 0 } = option;

        return this.http.get<BannersResponse>(`${API_URL}/banners`, {
            params: {
                limit,
                offset,
            },
        });
    }

}