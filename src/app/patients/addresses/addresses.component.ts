import { ChangeDetectionStrategy, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AddressComponent } from '../address/address.component';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressesComponent implements OnInit {

  form!: FormGroup;
  subscription!: Subscription;
  private _addressesComponents!: QueryList<AddressComponent>;
  @ViewChildren(AddressComponent)set addressesComponents(value: QueryList<AddressComponent>) {
    this._addressesComponents = value;
    this.addAddressesForm();
  }

  get addresses(): FormArray {
    return this.form.controls.addresses as FormArray;
  }

  get addressesControls(): FormGroup[] {
    return this.addresses.controls as FormGroup[];
  }

  constructor(private formBuilder: FormBuilder) { }
  
    ngOnInit(): void {
      this.initAddressesForm();
    }
    
    private initAddressesForm(): void {
      this.form = this.formBuilder.group({
        addresses: this.formBuilder.array([])
      });
    }
  
    createAddress(): FormGroup {
      return this.formBuilder.group({
        type: ['', [Validators.required]],
      })
    }
  
    addAddress(): void {
      this.addresses.push(this.createAddress());
      this.addNameControl();
    }

    private addAddressesForm(): void {
      this._addressesComponents.forEach(addressInstance => {
        this.addAddressForm(addressInstance);
      });
    }

    addAddressForm(addressInstance: AddressComponent): void {
      addressInstance.form.setParent(this.form);

      this.addressesControls.forEach(formGroup => {
        formGroup.addControl('homeAddress', addressInstance.form)
      })
    }
    
  private addNameControl(): void {
    this.unsubscribe();
    this.addressesControls.forEach(formGroup => {
      this.subscription = formGroup.controls.type.valueChanges
        .subscribe(type => {
          if (type === 'WORK' || type === 'CLOSERELATIVE') {
            formGroup.addControl('name', this.formBuilder.control(''));
          } else {
            formGroup.removeControl('name');
          }
        })
    })
  }

  private unsubscribe(): void {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }
}
