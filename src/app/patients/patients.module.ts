import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { AddressComponent } from './address/address.component';
import { AddressesComponent } from './addresses/addresses.component';
import { PatientAddComponent } from './patient-add/patient-add.component';
import { PatientDialogComponent } from './patient-dialog/patient-dialog.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientsRoutingModule } from './patients-routing.module';
import { DoctorsModule } from '../doctors/doctors.module';

@NgModule({
  declarations: [
    PatientListComponent,
    PatientAddComponent,
    AddressesComponent,
    AddressComponent,
    PatientDialogComponent,
  ],
  imports: [
    CommonModule,
    PatientsRoutingModule,
    MatTableModule,
    ReactiveFormsModule,
    FormsModule,
    RxReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatIconModule,
    MatDialogModule,
    FlexLayoutModule,
    DoctorsModule
  ],
})
export class PatientsModule { }
