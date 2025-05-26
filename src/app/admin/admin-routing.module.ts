import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAdminComponent } from './user-admin/user-admin.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { ServiciosAdminComponent } from './servicios-admin/servicios-admin.component';
import { CitasAdminComponent } from './citas-admin/citas-admin.component';
import { HorarioAdminComponent } from './horario-admin/horario-admin.component';
import { PeluqueriaAdminComponent } from './peluqueria-admin/peluqueria-admin.component';

const routes: Routes = [
  {
    path: 'usuarios',
    component: UserAdminComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN'] }
  },
  {
    path: 'servicios',
    component: ServiciosAdminComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN'] }
  },
  {
    path: 'citas',
    component: CitasAdminComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN'] }
  },
  {
    path: 'horarios',
    component: HorarioAdminComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN'] }
  },
  {
    path: 'peluqueria',
    component: PeluqueriaAdminComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN'] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
