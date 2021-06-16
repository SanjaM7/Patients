import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { AddressComponent } from '../address/address.component';
import { AddressesComponent } from '../addresses/addresses.component';
import { Doctors } from '../mocks/doctors.mock.data';

@Component({
  selector: 'app-patient-add',
  templateUrl: './patient-add.component.html',
  styleUrls: ['./patient-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PatientAddComponent implements OnInit, AfterViewInit {

  form!: FormGroup;
  maxDate = new Date();
  doctors = Doctors;
  @ViewChild(AddressComponent) addressComponent!: AddressComponent;
  @ViewChild(AddressesComponent) addressesComponent!: AddressesComponent;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initPatientAddForm();
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
    this.form.controls.birthDate.valueChanges.subscribe((birthDate: Date) => {
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
  }
  
  private addAddressForm() {
    this.addressComponent.form.setParent(this.form);
    this.form.addControl('homeAddress', this.addressComponent.form);
  }

  private addAddressesForm() {
    this.addressesComponent.form.setParent(this.form);
    this.form.addControl('addresses', this.addressesComponent.form);
  }

  savePatient(): void {
    console.log(this.form.value);
  }
}
