import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./modules/pages/home/home.component').then((c) => c.HomeComponent)
    },
    {
        path: 'exam',
        loadComponent: () => import('./modules/pages/exam/exam.component').then((c) => c.ExamComponent)
    },
    {
        path: 'results',
        loadComponent: () => import('./modules/pages/results/results.component').then((c) => c.ResultsComponent)
    }
];
