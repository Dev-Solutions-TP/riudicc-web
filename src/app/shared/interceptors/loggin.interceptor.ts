import { HttpEvent, HttpEventType, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { Observable, tap } from "rxjs";



export function logginInterceptor(
    req: HttpRequest<unknown>,
    next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {

    return next(req).pipe(
        tap((event) => {
            if (event.type === HttpEventType.Response) {
                console.log('Request made to:', req.url);
                console.log('Request satatus:', event.status);
            }
        })
    );
}   
