import { Routes } from '@angular/router';

export function extractRoutes(routes: Routes, parentPath: string = ''): { title: string, path: string }[] {
    const result: { title: string, path: string }[] = [];

    for (const route of routes) {
        const fullPath = route.path ? `${parentPath}/${route.path}`.replace(/\/\/+/g, '/') : parentPath;

        if (route.title && typeof route.title === 'string' && route.path !== 'news' && route.path !== 'events' && route.path !== '**') {
            result.push({ title: route.title, path: fullPath });
        }

        if (route.children) {
            result.push(...extractRoutes(route.children, fullPath));
        }
    }

    return result;
}

