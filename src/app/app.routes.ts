import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/components/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/home/home.component')
          .then(c => c.HomeComponent)
      },

      {
        path: 'about',
        loadComponent: () =>
          import('./features/about/about.component')
          .then(c => c.AboutComponent)
      },

      {
        path: 'experience',
        loadComponent: () =>
          import('./features/experience/experience.component')
          .then(c => c.ExperienceComponent)
      },

      {
        path: 'projects',
        loadComponent: () =>
          import('./features/projects/projects.component')
          .then(c => c.ProjectsComponent)
      },

      {
        path: 'projects/:id',
        loadComponent: () =>
          import('./features/project-detail/project-detail.component')
          .then(c => c.ProjectDetailComponent)
      },

      {
        path: 'contact',
        loadComponent: () =>
          import('./features/contact/contact.component')
          .then(c => c.ContactComponent)
      }
    ]
  }
];