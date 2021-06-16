import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DoctorService } from '../doctors/doctor.service';
import { Patients } from './mocks/patients-mock-data';
import { PatientListItemWithDoctor } from './models/patient-list-item-with-doctor';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private doctorService: DoctorService) { }

  patients$ = of(Patients);

  patientsWithDoctor$: Observable<PatientListItemWithDoctor[]> = combineLatest([
    this.patients$,
    this.doctorService.doctors$
  ]).pipe(
    map(([patients, doctors]) => {
      let patientsWithDoctor: PatientListItemWithDoctor[] = [];
      patients.map(patient => {
        const doctorFound =  doctors.find(doctor => patient.doctor === doctor.id) || null;
        if(!doctorFound) {
          return;
        }

        const doctorName = `${doctorFound!.firstName} ${doctorFound!.lastName}`;
        const patientWithDoctor = {
          ...patient,
          doctor: doctorName
        } as PatientListItemWithDoctor;

        patientsWithDoctor.push(patientWithDoctor);
      })
      return patientsWithDoctor;
    })
  )
}

