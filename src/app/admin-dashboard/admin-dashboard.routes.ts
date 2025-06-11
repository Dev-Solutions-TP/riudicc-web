import { Routes } from '@angular/router';
import { IsAdminGuard, IsAdminOrOwnerGuard } from '@auth/guards/is-admin.guard';
import { AdminDashboardLayoutComponent } from './layouts/admin-dashboard-layout/admin-dashboard-layout.component';
import { NoticiasAdminPageComponent } from './pages/noticias-admin-page/noticias-admin-page.component';
import { BannersAdminPageComponent } from './pages/banner-admin-page copy/banners-admin-page.component';
import { InstitucionesAdminPageComponent } from './pages/instituciones-admin-page/instituciones-admin-page.component';
import { IsOwnerGuard } from '@auth/guards/is-admin-owner.guard';
import { NoticiaDetailsComponent } from './pages/noticias/noticia-admin-page/noticia-details/noticia-details.component';


export const adminDashboardRoutes: Routes = [
  {
    path: '',
    component: AdminDashboardLayoutComponent,
    canMatch: [IsAdminOrOwnerGuard],
    children: [
      {
        path: 'banners',
        component: BannersAdminPageComponent,
        canMatch: [IsAdminGuard],
      },
      {
        path: 'banners/:id',
        component: NoticiasAdminPageComponent,
        canMatch: [IsAdminGuard],

      },
      {
        path: 'noticias',
        component: NoticiasAdminPageComponent,
        canMatch: [IsAdminOrOwnerGuard],

      },
      {
        path: 'noticias/:id',
        component: NoticiaDetailsComponent,
        canMatch: [IsAdminOrOwnerGuard],
      },

      {
        path: 'universidades',
        component: InstitucionesAdminPageComponent,
        canMatch: [IsAdminOrOwnerGuard],

      },
      {
        path: 'universidades/:id',
        component: NoticiasAdminPageComponent,
        canMatch: [IsAdminOrOwnerGuard],
      },
      {
        path: '**',
        redirectTo: 'universidades',
      },
    ],
  },
];

export default adminDashboardRoutes;
