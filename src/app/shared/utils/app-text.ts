

import { IdiomaSoportado } from "@shared/services/localization.service";

export type AppTextEntry = Record<IdiomaSoportado, string>;

export const AppText = {
    app: {
        viewMore: {
            es: 'Ver más',
            en: 'More',
            fr: 'Voir plus',
        },
        showMap: {
            es: 'Ver mapa',
            en: 'Show map',
            fr: 'Voir la carte',
        },
        about: {
            es: 'Acerca de',
            en: 'About',
            fr: 'À propos',
        },
        enlacesRelacionados: {
            es: 'Enlaces relacionados',
            en: 'Related links',
            fr: 'Liens connexes',
        },
        sociosRelacionados: {
            es: 'Socios relacionados',
            en: 'Related partners',
            fr: 'Partenaires associés',
        },
    },
    home: {
        intro: {
            es: 'Bienvenido a RIUDICC',
            en: 'Welcome to RIUDICC',
            fr: 'Bienvenue à RIUDICC',
        },
        cta: {
            es: 'Explora más',
            en: 'Explore more',
            fr: 'Explorez davantage',
        },
    },
    noticias: {

    }
} satisfies Record<string, Record<string, AppTextEntry>>;
