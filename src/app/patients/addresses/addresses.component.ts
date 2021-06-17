import { AfterViewInit, Component, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { AddressComponent } from '../address/address.component';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  // TODO: Fix for push change detection
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressesComponent implements AfterViewInit {

  form!: FormGroup;
  @ViewChild('container', { read: ViewContainerRef }) container!: ViewContainerRef;

  get addresses(): FormArray {
    return this.form.controls.addresses as FormArray;
  }

  get addressesControls(): FormGroup[] {
    return this.addresses.controls as FormGroup[];
  }

  constructor(
    private formBuilder: FormBuilder,
    private componentFactoryResolver: ComponentFactoryResolver) { }
  
  ngAfterViewInit(): void {
    this.initAddressesForm();
  }
    
  private initAddressesForm(): void {
    this.form = this.formBuilder.group({
      addresses: this.formBuilder.array([])
    });

    this.addAddress(true);
  }
    
  addAddress(homeAddress: boolean = false): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(AddressComponent);
    const componentRef = this.container.createComponent(componentFactory);
    // TODO: Remove this timeout
    setTimeout(() => {
      componentRef.instance.form.setParent(this.form);
      this.addresses.push(componentRef.instance.form);
      componentRef.instance.homeAddress = homeAddress;
    }, 150)
  }

  disable() {
    this.form.disable();
    // this.addressesControls.forEach(formGroup => {
    //   formGroup.disable();
    // });
  }
}
