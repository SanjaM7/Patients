import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  typeSubscription!: Subscription;
  phoneSubscription!: Subscription;
  _homeAddress: boolean = true;
  @Input() set homeAddress(value: boolean) {
     this._homeAddress = value;
     this.setHomeAddressControls();
     this.changeDetectionRef.detectChanges();
  }
  @Input() set disabled(value: boolean) {
    if(value){
      this.form?.disable();
    }
  }

  constructor(
    private formBuilder: FormBuilder,
    private changeDetectionRef: ChangeDetectorRef
    ) { }

  get type(): AbstractControl {
    return this.form.controls.type;
  }

  get phone(): AbstractControl {
    return this.form.controls.phone;
  }

  get street(): AbstractControl {
    return this.form.controls.street;
  }

  get city(): AbstractControl {
    return this.form.controls.city;
  }

  get zipcode(): AbstractControl {
    return this.form.controls.zipcode;
  }

  get country(): AbstractControl {
    return this.form.controls.country;
  }

  ngOnInit(): void {
    this.initAddressForm();
  }

  private setHomeAddressControls(): void {
    if(this._homeAddress) {
      this.type.setValue('HOME');
      this.type.updateValueAndValidity();
    }
  }

  private initAddressForm() {
    this.form = this.formBuilder.group({
        type: ['', [Validators.required]],
        phone: ['', [
          Validators.required, 
          Validators.pattern(/^\+?[0-9\s]+$/)
        ]],
        street: ['', Validators.required],
        city: ['', Validators.required],
        zipcode: ['', Validators.required],
        country: ['', Validators.required]
    })

    this.addNameControl();
    this.phoneNumberRemoveSpaces();
  }

  private addNameControl(): void {
    this.typeSubscription = this.type.valueChanges
      .subscribe(type => {
        if (type === 'WORK' || type === 'RELATIVE') {
          this.form.addControl('name', this.formBuilder.control(''));
        } else {
          this.form.removeControl('name')
        }
      })
  }

  onPrefixToPhoneNumberOnBlur(): void {
    if(this.phone.value.charAt(0) != '+') {
      const phoneNumberWithPrefix = `+39${this.form.controls.phone.value}`; 
      this.phone.setValue(phoneNumberWithPrefix);
    }
  }

  // TODO: find a way to see spaces on input but remove them in control
  private phoneNumberRemoveSpaces(): void {
    this.phoneSubscription = this.phone.valueChanges.subscribe(phoneNumber => {
      let phoneNumberSpacesRemoved = phoneNumber.replace(/\s/g, "");
      this.phone.setValue(phoneNumberSpacesRemoved, { emitEvent: false });
    })
  }

  ngOnDestroy(): void {
    if(this.typeSubscription) {
      this.typeSubscription.unsubscribe();
    }
    if(this.phoneSubscription) {
      this.phoneSubscription.unsubscribe();
    }
  }
}
