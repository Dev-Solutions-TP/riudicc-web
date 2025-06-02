import { Routes } from "@angular/router";
import { LogiPageComponent } from "./pages/logi-page/logi-page.component";
import { AuthLayoutComponent } from "./layout/auth-layout/auth-layout.component";


export const authRoutes: Routes = [

    {
        path: '',
        component: AuthLayoutComponent,
        children: [
            {
                path: 'login',
                component: LogiPageComponent

            },
            {
                path: '**',
                redirectTo: 'login',
            }
        ]
    }
];

export default authRoutes;
