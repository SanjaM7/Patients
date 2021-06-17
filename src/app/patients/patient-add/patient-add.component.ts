import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { Observable, of, Subscription } from 'rxjs';
import { DoctorService } from 'src/app/doctors/doctor.service';
import { Doctors } from 'src/app/doctors/models/doctors';
import { AddressesComponent } from '../addresses/addresses.component';
import { Address } from '../models/address';
import { Patient } from '../models/patient';
import { PatientListItemWithDoctor } from '../models/patient-list-item-with-doctor';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-patient-add',
  templateUrl: './patient-add.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PatientAddComponent implements OnInit, AfterViewInit, OnDestroy {

  form!: FormGroup;
  maxDate = new Date();
  doctors$: Observable<Doctors[]> = of();
  subscription!: Subscription;

  _patient!: PatientListItemWithDoctor;
  @Input() set patient(value: PatientListItemWithDoctor) {
     this._patient = value;
  }

  @Input() disabled: boolean = false;
  @ViewChild(AddressesComponent) addressesComponent!: AddressesComponent;

  constructor(
    private formBuilder: FormBuilder,
    private doctorsService: DoctorService,
    private patientService: PatientService,
    private router: Router) { }

  ngOnInit(): void {
    this.initPatientAddForm();
    this.getDoctors();
  }

  private getDoctors() {
    this.doctors$ = this.doctorsService.doctors$;
  }

  private initPatientAddForm(): void {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      vatCode: [''],
      email: ['', [Validators.required, RxwebValidators.email()]],
      doctor: ['', Validators.required],
    })

    this.addVatCodeValidator();
  }

  private addVatCodeValidator(): void {
    this.subscription = this.form.controls.birthDate.valueChanges.subscribe((birthDate: Date) => {
      if(!birthDate) {
        return;
      }

      const numberOfYears = this.calculateNumberOfYears(birthDate.getFullYear());
      if (numberOfYears > 18) {
        this.form.controls.vatCode.setValidators(Validators.required);
      } else {
        this.form.controls.vatCode.setValidators(null);
      }
      this.form.controls.vatCode.updateValueAndValidity();
    });
  }

  private calculateNumberOfYears(birthYear: number): number {
    const curentYear = (new Date()).getFullYear();
    return curentYear - birthYear;
  }

  ngAfterViewInit(): void {
    this.addAddressesForm();
    this.disableForm();
    this.populatePatientForm(this._patient);
  }
  
  private addAddressesForm() {
    this.addressesComponent.form.setParent(this.form);
    this.form.addControl('addresses', this.addressesComponent.form);
  }

  private populatePatientForm(patient: PatientListItemWithDoctor) {
    this.form.controls.firstName.setValue(patient.firstName);
    this.form.controls.lastName.setValue(patient.lastName);
    this.form.controls.lastName.setValue(patient.lastName);
  }

  disableForm(): void {
    if(this.disabled === true) {
      this.form.disable();
      this.addressesComponent.form.disable();
    }
  }

  savePatient(): void {
    const firstName: string = this.form.controls.firstName.value;
    const lastName: string = this.form.controls.lastName.value;
    const doctor: number = this.form.controls.doctor.value;
    const addresses: Address[] = this.form.controls.addresses.value;

    const patient = new Patient(firstName, lastName, doctor, addresses);
    this.patientService.savePatient(patient)
      .subscribe(patient => this.router.navigateByUrl('/'));
  }

  ngOnDestroy(): void {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
