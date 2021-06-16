import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressesComponent } from './addresses/addresses.component';
import { PatientAddComponent } from './patient-add/patient-add.component';
import { PatientListComponent } from './patient-list/patient-list.component';

const routes: Routes = [
  {
    path: 'add',
    component: PatientAddComponent
  },
  { 
    path: 'list', 
    component: PatientListComponent 
  },
  { 
    path: 'addresses', 
    component: AddressesComponent 
  },
  {
    path: '',
    redirectTo: '/patients/list',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientsRoutingModule { }
