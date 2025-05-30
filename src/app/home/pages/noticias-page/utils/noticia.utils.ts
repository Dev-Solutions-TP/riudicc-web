import { computed, Signal } from '@angular/core';
import { NoticiaEntity } from '../interfaces/noticia.interface';
import { Institucion } from '@home/pages/instituciones/interfaces/aliados.interface';


// Traducción según idioma actual
export function getTraduccionNoticia(
    institucion: Signal<NoticiaEntity | undefined>,
    idiomaActual: Signal<string>
) {
    return computed(() => {
        const data = institucion();
        const lang = idiomaActual();

        if (!data) return undefined;

        return (
            data.traducciones.find(t => t.idioma === lang) ??
            data.traducciones[0]
        );
    });
}

export function getTraduccionInstitucion(
    institucion: Signal<Institucion | undefined>,
    idiomaActual: Signal<string>
) {
    return computed(() => {
        const data = institucion();
        const lang = idiomaActual();
        if (!data) return undefined;

        return (
            data.traducciones.find(t => t.idioma === lang) ??
            data.traducciones[0]
        );
    });
}

// Imagen principal (puede ajustarse si deseas una lógica más específica)
export function getImagenPrincipaNoticia(institucion: Signal<NoticiaEntity | undefined>,) {
    return computed(() => institucion()?.images?.[0]);
}

// ISO de país para banderas
export function getCountryCode(pais: string): string {
    const mapping: Record<string, string> = {
        'Ecuador': 'ec',
        'México': 'mx',
        'Dominican Republic': 'do',
        'España': 'es',
    };
    return mapping[pais.trim()]?.toLowerCase() || 'un';
}

// Abrir enlace en nueva pestaña
export function abrirEnlace(url: string): void {
    window.open(url, '_blank');
}
