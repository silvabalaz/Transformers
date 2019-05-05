import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Trans, VehicleTypes} from '../transformer';
import {Subscription} from 'rxjs';
import {TransformerService} from '../transformer.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-pm-transformer-add',
  templateUrl: './transformer-add.component.html',
  styleUrls: ['./transformer-add.component.css']
})
export class TransformerAddComponent implements OnInit, OnDestroy {
  pageTitle = 'Transformer Add';
  errorMessage: string;
  transformerForm: FormGroup;
  transformer: Trans | null;
  sub: Subscription;
  vehicleTypes: VehicleTypes[];
  vehicleTypesChanged: VehicleTypes[];

  constructor(private fb: FormBuilder,
              private transformerService: TransformerService) {

  }
  ngOnInit(): void {
    this.transformerForm = this.fb.group({
      name: ['', Validators.required],
      vehicleGroup: ['', Validators.required],
      vehicleType: ['', Validators.required],
      vehicleModel: ['', Validators.required],
      gear: ['', Validators.required],
      status: ['', Validators.required]
    });

    this.sub = this.transformerService.selectedTransformerChanges$.subscribe(
      selectedTransformer => this.displayTransformer(selectedTransformer)
    );
    this.vehicleTypes = this.getVehicleTypes();
    this.vehicleTypesChanged = this.vehicleTypes;
  }
  getVehicleTypes(): VehicleTypes[] {
    return [
      {
        group: 'Air',
        type: 'Plane',
        model: 'F-22'
      },
      {
        group: 'Air',
        type: 'Plane',
        model: 'Sukhoi'
      },
      {
        group: 'Air',
        type: 'Plane',
        model: 'MiG'
      },
      {
        group: 'Land',
        type:  'Truck',
        model: 'Western Star 5700'
      }
    ];
  }
  changeByGroup(val: any): void {
    console.log('val.target.options' + val.target.options );
    console.log('val.target.options[]' +  val.target.options[val.target.options.selectedIndex].text);
    const filterBy = val.target.options[val.target.options.selectedIndex].text;
    const filteredGroup = this.vehicleTypes.filter(items => items.group === filterBy);
    // this.removeDuplicates(this.vehicleTypes, this.filtered);
    this.vehicleTypesChanged = filteredGroup;
    this.transformer.vehicleGroup = filterBy;
    this.transformer.vehicleType = '';
    this.transformer.vehicleModel = '';
    this.displayTransformer(this.transformer);
    console.log(this.vehicleTypesChanged.values());
  }
  changeByType(val: any): void {
    const filterBy = val.target.options[val.target.options.selectedIndex].text;
    const filteredType = new Set(this.vehicleTypesChanged.filter(items => items.type === filterBy));
    console.log('filteredType' + filteredType);
    this.vehicleTypesChanged = this.vehicleTypesChanged.filter(items => items.type === filterBy);
    this.transformer.vehicleType = filterBy;
    this.displayTransformer(this.transformer);
    console.log(this.vehicleTypesChanged.values());
  }
  changeByModel(val: any): void {
    const filterBy = val.target.options[val.target.options.selectedIndex].text;
    this.transformer.vehicleModel = filterBy;
    this.displayTransformer(this.transformer);
    console.log(this.vehicleTypesChanged.values());
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  displayTransformer(transformer: Trans): void {
    // Set the local transformer property
    this.transformer = transformer;

    if (this.transformer) {
      if (this.transformer.name === 'New') {
        // Reset the form back to pristine
        this.transformerForm.reset();
        // Update the data on the form
        this.transformerForm.patchValue({
          name: this.transformer.name,
          vehicleGroup: this.transformer.vehicleGroup,
          vehicleType: this.transformer.vehicleType,
          vehicleModel: this.transformer.vehicleModel,
          gear: this.transformer.gear,
          status: this.transformer.status
        });
      } else {
        this.transformerSelected(this.transformer);
      }
    }
  }
  transformerSelected(transformer: Trans): void {
    this.transformerService.changeSelectedTransformer(transformer);
  }

  cancelEdit(): void {
    // Redisplay the currently selected transformer
    this.displayTransformer(this.transformer);
  }

  saveTransformer(): void {
    if (this.transformerForm.valid) {
      if (this.transformerForm.dirty) {
        // Copy over all of the original product properties
        // Then copy over the values from the form
        // This ensures values not on the form, such as the Id, are retained
        const p = { ...this.transformer, ...this.transformerForm.value };
        if (p.id === 0) {
          this.transformerService.createTransformer(p).subscribe(
            transformer => this.transformerService.changeSelectedTransformer(transformer),
            (err: any) => this.errorMessage = err.error
          );
        } else {
          this.transformerService.updateTransformer(p).subscribe(
            transformer => this.transformerService.changeSelectedTransformer(transformer),
            (err: any) => this.errorMessage = err.error
          );
        }
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }



}
