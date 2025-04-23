import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'appointments',
    loadChildren: () => import('./appointments/appointments.module').then(m => m.AppointmentsModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'servicios',
    loadChildren: () => import('./servicios/servicios.module').then(m => m.ServiciosModule)
  },
  {
    path: 'resenas', loadChildren: () => import('./resenas/resenas.module').then(m => m.ResenasModule)
  },

  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },

  { path: '**', redirectTo: '/auth/login' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
