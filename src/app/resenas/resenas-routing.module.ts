import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResenasListComponent } from './components/resenas-list/resenas-list.component';

const routes: Routes = [
  { path: '', component: ResenasListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResenasRoutingModule { }
