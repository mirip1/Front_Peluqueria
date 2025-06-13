import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilComponent } from './perfil/perfil.component';
import { UserAdminComponent } from './admin/user-admin/user-admin.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';

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
    path: 'citas',
    loadChildren: () => import('./citas/citas.module').then(m => m.CitasModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'servicios',
    loadChildren: () => import('./servicios/servicios.module').then(m => m.ServiciosModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'resenas', loadChildren: () => import('./resenas/resenas.module').then(m => m.ResenasModule)
  },

  { path: 'perfil', component: PerfilComponent,
    canActivate: [AuthGuard]
  },

  { path: '', redirectTo: '/auth/login', pathMatch: 'full', },

  { path: 'forgot-password', component: ForgotPasswordComponent },


  {
    path: 'admin/usuarios',
    component: UserAdminComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN'] }
  },


  { path: '**', redirectTo: '/auth/login' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
