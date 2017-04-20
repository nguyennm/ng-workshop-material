import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from "app/about/about.component";
import { CollectionComponent } from "app/collection/collection.component";
import { BookDetailGuard } from "app/book-guard.service";
import { BookDetailComponent } from "app/book-detail/book-detail.component";


const routes: Routes = [
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'collection',
    component: CollectionComponent
  },
  {
    path: 'collection/:id',
    canActivate: [BookDetailGuard],
    component: BookDetailComponent
  },
  {
    path: '',
    redirectTo: '/about',
    pathMatch: 'full'
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
