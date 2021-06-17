import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PatientListItemWithDoctor } from '../models/patient-list-item-with-doctor';

@Component({
  templateUrl: './patient-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PatientDialogComponent implements OnInit {
  patientListItemWithDoctor!: PatientListItemWithDoctor;

  constructor(
    public dialogRef: MatDialogRef<PatientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PatientListItemWithDoctor
    ) {
      this.patientListItemWithDoctor = data;
    }

  ngOnInit(): void {
  }

}
