import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitasCalendarComponent } from './components/citas-calendar/citas-calendar.component';

const routes: Routes = [
  { path: '', component: CitasCalendarComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CitasRoutingModule { }
