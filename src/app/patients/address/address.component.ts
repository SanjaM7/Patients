import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  subscription!: Subscription;
  constructor(private formBuilder: FormBuilder) { }

  get phoneNumber(): AbstractControl {
    return this.form.controls.phoneNumber;
  }

  get street(): AbstractControl {
    return this.form.controls.street;
  }

  get city(): AbstractControl {
    return this.form.controls.city;
  }

  get zipCode(): AbstractControl {
    return this.form.controls.zipCode;
  }

  get country(): AbstractControl {
    return this.form.controls.country;
  }

  ngOnInit(): void {
    this.initAddressForm();
  }

  private initAddressForm() {
    this.form = this.formBuilder.group({
        phoneNumber: ['', [ Validators.required]],
        street: ['', Validators.required],
        city: ['', Validators.required],
        zipCode: ['', Validators.required],
        country: ['', Validators.required]
    })

    this.phoneNumberRemoveSpaces();
  }

  onPrefixToPhoneNumberOnBlur(): void {
    if(this.phoneNumber.value.charAt(0) != '+') {
      const phoneNumberWithPrefix = `+39${this.form.controls.phoneNumber.value}`; 
      this.phoneNumber.setValue(phoneNumberWithPrefix);
    }
  }

  // TODO: find a way to see spaces on input but remove them in control
  // TODO: regex pattern
  private phoneNumberRemoveSpaces(): void {
    this.subscription = this.phoneNumber.valueChanges.subscribe(phoneNumber => {
      let phoneNumberSpacesRemoved = phoneNumber.replace(/\s/g, "");
      this.phoneNumber.setValue(phoneNumberSpacesRemoved, { emitEvent: false });
    })
  }

  ngOnDestroy(): void {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
