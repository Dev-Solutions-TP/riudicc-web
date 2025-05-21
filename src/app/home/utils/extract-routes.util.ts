import { Routes } from '@angular/router';

// export function extractRoutes(routes: Routes, parentPath: string = ''): { title: string, path: string }[] {
//     const result: { title: string, path: string }[] = [];

//     for (const route of routes) {
//         const fullPath = route.path ? `${parentPath}/${route.path}`.replace(/\/\/+/g, '/') : parentPath;

//         if (route.title && typeof route.title === 'string' && route.path !== 'news' && route.path !== 'events' && route.path !== '**') {
//             result.push({ title: route.title, path: fullPath });
//         }

//         if (route.children) {
//             result.push(...extractRoutes(route.children, fullPath));
//         }
//     }

//     return result;
// }

export function extractRoutes(
    routes: Routes,
    parentPath: string = ''
): { key: string, path: string }[] {
    const result: { key: string, path: string }[] = [];

    for (const route of routes) {
        const fullPath = route.path
            ? `${parentPath}/${route.path}`.replace(/\/\/+/g, '/')
            : parentPath;

        // Usa la ruta como key, o 'home' para la raíz
        const key = route.path && route.path.length > 0 ? route.path : 'home';

        // Solo agrega si la ruta tiene título (opcional)
        if (route.title && typeof route.title === 'string' && route.path !== '**' && route.path !== 'news' && route.path !== 'events' && route.path !== 'regulations') {
            result.push({ key, path: fullPath });
        }

        if (route.children) {
            result.push(...extractRoutes(route.children, fullPath));
        }
    }

    return result;
}
