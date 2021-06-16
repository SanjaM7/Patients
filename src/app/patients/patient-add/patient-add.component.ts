import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { Observable, of, Subscription } from 'rxjs';
import { DoctorService } from 'src/app/doctors/doctor.service';
import { Doctors } from 'src/app/doctors/models/doctors';
import { AddressComponent } from '../address/address.component';
import { AddressesComponent } from '../addresses/addresses.component';
import { PatientListItemWithDoctor } from '../models/patient-list-item-with-doctor';

@Component({
  selector: 'app-patient-add',
  templateUrl: './patient-add.component.html',
  styleUrls: ['./patient-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PatientAddComponent implements OnInit, AfterViewInit, OnDestroy {

  form!: FormGroup;
  maxDate = new Date();
  doctors$: Observable<Doctors[]> = of();
  subscription!: Subscription;
  @Input() patient?: PatientListItemWithDoctor;
  @Input() disabled: boolean = false;
  @ViewChild(AddressComponent) addressComponent!: AddressComponent;
  @ViewChild(AddressesComponent) addressesComponent!: AddressesComponent;

  constructor(
    private formBuilder: FormBuilder,
    private doctorsService: DoctorService) { }

  ngOnInit(): void {
    this.initPatientAddForm();
    this.getDoctors();
    console.log(this.patient);
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
    this.addAddressForm();
    this.addAddressesForm();
    this.disableForm();
  }
  
  private addAddressForm() {
    this.addressComponent.form.setParent(this.form);
    this.form.addControl('homeAddress', this.addressComponent.form);
  }

  private addAddressesForm() {
    this.addressesComponent.form.setParent(this.form);
    this.form.addControl('addresses', this.addressesComponent.form);
  }

  disableForm() {
    if(this.disabled === true) {
      this.form.disable();
    }
  }

  savePatient(): void {
    // const firstName = this.form.controls.firstName.value;
    // const lastName = this.form.controls.lastName.value;
    // const doctor = this.form.controls.doctor.value;
    // let addresses = [];

    // const patient = new Patient(firstName, lastName, doctor)
    console.log(this.form.value);
  }

  ngOnDestroy(): void {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
