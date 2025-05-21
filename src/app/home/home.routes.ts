import { Routes } from "@angular/router";
import { HomeLayoutComponent } from "./layouts/home-layout/home-layout.component";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { AboutPageComponent } from "./pages/about-page/about-page.component";
import { NormativaPageComponent } from "./pages/normativa-page/normativa-page.component";
import { SociedaEuPageComponent } from "./pages/sociedad-eu-page/sociedad-eu-page.component";
import { AliadosPageComponent } from "./pages/aliados/instituciones-page.component";
import { EventosPagesComponent } from "./pages/eventos-pages/eventos-pages.component";
import { NoticiasPageComponent } from "./pages/noticias-page/noticias-page.component";
import { NotFoundPageComponent } from "./pages/not-found-page/not-found-page.component";

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
                component: AliadosPageComponent,
            },
            {
                path: 'eu',
                title: 'Sociedad Europea',

                component: SociedaEuPageComponent,
            },

            {
                path: 'events',
                title: 'Eventos',
                component: EventosPagesComponent,
            },
            {
                path: 'news',
                title: 'Noticias',
                component: NoticiasPageComponent,
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