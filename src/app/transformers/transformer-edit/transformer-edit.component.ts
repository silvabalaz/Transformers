import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Trans, VehicleTypes} from '../transformer';
import {TransformerService} from '../transformer.service';
import {ActivatedRoute, Router} from '@angular/router';
import {any} from 'codelyzer/util/function';

@Component({
  /*selector: 'app-pm-transformer-edit',*/
  templateUrl: './transformer-edit.component.html',
  styleUrls: ['./transformer-edit.component.css']
})
export class TransformerEditComponent implements OnInit {
  pageTitle = 'Transformer Edit';
  errorMessage: string;
  transformerForm: FormGroup;
  transformer: Trans | null;
  vehicleType: VehicleTypes;
  group: string[];
  type: string[];
  model: string[];
  /*vehicleType: any [] = [
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
  ];*/

  constructor(private fb: FormBuilder,
              private transformerService: TransformerService,
              private route: ActivatedRoute,
              private router: Router
              ) {
  }

  ngOnInit(): void {
    this.transformerForm = this.fb.group({
      name: '',
      vehicleGroup: '',
      vehicleType: '',
      vehicleModel: '',
      gear: [''],
      status: ''
    });
    this.getTransformer();

  }
  getTransformer(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.transformerService.getTransformer(id)
      .subscribe(transformer => {
            this.transformer = transformer;
            this.displayTransformer(this.transformer);
       });
  }
/*  getVehicleTypes(): void {
    this.transformerService.getVehicleTypes()
      .subscribe((vehicleType => {
        this.vehicleTypes = vehicleTypes;
        this.group.push(this.vehicleType.group);
        this.type.push(this.vehicleType.type);
        this.model.push(this.vehicleType.model);
      }));
  }*/

/*  saveTransformer(): void {
    this.transformerService.updateTransformer(this.transformer)
      .subscribe(() => this.onBack());
  }*/
  onBack(): void {
    this.router.navigate(['/transformers']);
  }
  displayTransformer(transformer: Trans): void {
    // Set the local transformer property
    this.transformer = transformer;

    if (this.transformer) {
      // Reset the form back to pristine
      this.transformerForm.reset();
      this.pageTitle = `Edit Transformer: ${this.transformer.name}`;
      // Update the data on the form
      this.transformerForm.patchValue({
        name: this.transformer.name,
        vehicleGroup: this.transformer.vehicleGroup,
        vehicleType: this.transformer.vehicleType,
        vehicleModel: this.transformer.vehicleModel,
        gear: this.transformer.gear,
        status: this.transformer.status
      });
    }
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
        this.transformerService.updateTransformer(p).subscribe(
          transformer => this.transformerService.changeSelectedTransformer(transformer),
          (err: any) => this.errorMessage = err.error
        );
        }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }



}
