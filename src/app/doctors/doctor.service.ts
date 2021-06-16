import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Doctors } from './mocks/doctors.mock.data';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor() { }

  doctors$ = of(Doctors);
}
