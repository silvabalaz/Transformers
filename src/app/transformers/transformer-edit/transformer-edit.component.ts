import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Trans, VehicleTypes} from '../transformer';
import {TransformerService} from '../transformer.service';
import {ActivatedRoute, Router} from '@angular/router';

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
  vehicleTypes: VehicleTypes[];
  group: string[];
  type: string[];
  model: string[];
  filteredGroup: any;
  filteredType: any;
  filteredModel: any;
  data: VehicleTypes[] = [
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

  constructor(private fb: FormBuilder,
              private transformerService: TransformerService,
              private route: ActivatedRoute,
              private router: Router
              ) {
  }

  ngOnInit(): void {
    this.transformerForm = this.fb.group({
      name: '',
      vehicleGroup: [''],
      vehicleType: [''],
      vehicleModel: [''],
      vehicleTypes: [''],
      gear: [''],
      status: ''
    });
    this.getTransformer();
    this.vehicleTypes = this.getVehicleTypes();
  }
  getTransformer(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.transformerService.getTransformer(id)
      .subscribe(transformer => {
            this.transformer = transformer;
            this.displayTransformer(this.transformer);
       });
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
/*  getVehicleTypes(): void {
    this.transformerService.getVehicleTypes()
      .subscribe(( vehicleTypes => this.vehicleTypes = this.data ));
  }*/
/*  getVehicleTypes(): void {
    for (let  i = 0; i < this.data.length; i++ ) {
      console.log('This vehicle types ' + this.data[i].group);
      console.log('This vehicle types ' + this.data[i].type);
      console.log('This vehicle types ' + this.data[i].model);
  /!*  this.group.push(this.vehicleTypes[i].group);
      this.type.push(this.vehicleTypes[i].type);
      this.model.push(this.vehicleTypes[i].model);*!/
      this.group = ['Ana', 'Ana'];
      this.type = ['Banana', 'Banana', 'Lana'];
      this.model = [''];
    }
    this.displayVehicleTypes(this.group, this.type, this.model);
  }*/
/*  saveTransformer(): void {
    this.transformerService.updateTransformer(this.transformer)
      .subscribe(() => this.onBack());
  }*/
  onBack(): void {
    this.router.navigate(['/transformers']);
  }
/*  displayVehicleTypes(group: string[], type: string [], model: string[]): void {
    this.filteredGroup = new Set(group);
    this.filteredType = new Set(type);
    this.filteredModel = new Set(model);
    this.vehicleTypesGroup = Array.from(this.filteredGroup);
    // this.vehicleTypesType = searchForType(this.vehicleTypesGroup);
    // this.vehicleTypesModel = searchForModel(this.vehicleTypesType);
  }*/
/*  searchForType(vehicleTypesGroup: string[]): string[] {

    vehicleTypesType: string[]
    for(let i; i < this.data.length; i++)
       if(this.data[i].group === vehicleTypesGroup ) {
         vehicleTypesType.push(this.data[i].type);
       }

    return vehicleTypesType;
  }*/
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
