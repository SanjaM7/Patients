import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PatientListItemWithDoctor } from '../models/patient-list-item-with-doctor';
import { PatientDialogComponent } from '../patient-dialog/patient-dialog.component';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PatientListComponent implements OnInit {

  displayedColumns: string[] = ['lastName', 'firstName', 'registeredDate', 'doctor', 'phone', 'email', 'street', 'city', 'zipcode', 'country', 'actions'];
  patientsDataSource!: MatTableDataSource<PatientListItemWithDoctor>
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  
  constructor(
    private patientService: PatientService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.patientService.patientsWithDoctor$.subscribe(patientsWithDoctor => {
      this.patientsDataSource = new MatTableDataSource(patientsWithDoctor);
    });
  }

  ngAfterViewInit(): void {
    this.patientsDataSource.paginator = this.paginator;
  }

  openPatientModal(patient: PatientListItemWithDoctor): void {
    const dialogRef = this.dialog.open(PatientDialogComponent, {
      width: '1250px',
      data: patient
    });
  }
}
