import { Routes } from "@angular/router";
import { HomeLayoutComponent } from "./layouts/home-layout/home-layout.component";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { AboutPageComponent } from "./pages/about-page/about-page.component";
import { NormativaPageComponent } from "./pages/normativa-page/normativa-page.component";
import { SociedaEuPageComponent } from "./pages/sociedad-eu-page/sociedad-eu-page.component";
import { InstitucionesPageComponent } from "./pages/instituciones/instituciones-page.component";
import { EventosPagesComponent } from "./pages/eventos-pages/eventos-pages.component";

import { NotFoundPageComponent } from "./pages/not-found-page/not-found-page.component";
import { InstitucionPageComponent } from "./pages/instituciones/pages/institucion/institucion-page.component";

import { NoticiasPageComponent } from "@noticias/noticias-page.component";
import { NoticiaPageComponent } from "@noticias/pages/noticia-page/noticia-page.component";




export const homeRoutes: Routes = [
    {
        path: '',
        component: HomeLayoutComponent,
        children: [
            {
                path: '',
                title: 'Home',
                component: HomePageComponent,
            },
            {
                path: 'about',
                title: 'Sobre RIUDICC',
                component: AboutPageComponent,
            },
            {
                path: 'regulations',
                title: 'Normativa',
                component: NormativaPageComponent,
            },
            {
                path: 'partners',
                title: 'Aliados Estrategicos',
                children: [
                    {
                        path: '',
                        component: InstitucionesPageComponent, // listado de instituciones
                    },
                    {
                        path: ':idSlug',
                        component: InstitucionPageComponent, // detalle de una institución
                    }
                ]
            },



            {
                path: 'events',
                title: 'Eventos',
                component: EventosPagesComponent,
            },
            {
                path: 'news',
                title: 'Noticias',
                children: [
                    {
                        path: '',
                        component: NoticiasPageComponent,

                    },
                    {
                        path: ':idSlug',
                        component: NoticiaPageComponent, // detalle de una institución
                    }
                ]
            },
            {
                path: 'eu',
                title: 'Sociedad Europea',

                component: SociedaEuPageComponent,
            },
            // {
            //     path: 'news/:id',
            //     component: NoticiasPageComponent,
            // }
            {
                path: '**',
                component: NotFoundPageComponent,
            }
        ],
    },
    {
        path: "**",
        redirectTo: '',
    }
]

export default homeRoutes;