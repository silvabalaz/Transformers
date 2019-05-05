import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Trans, VehicleTypes} from '../transformer';
import {TransformerService} from '../transformer.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-pm-transformer-edit',
  templateUrl: './transformer-edit.component.html',
  styleUrls: ['./transformer-edit.component.css']
})
export class TransformerEditComponent implements OnInit {
  pageTitle = 'Transformer Edit';
  errorMessage: string;
  transformerForm: FormGroup;
  transformer: Trans | null;
  vehicleTypes: VehicleTypes[];
  vehicleTypesChanged: VehicleTypes[];
  sub: Subscription;

  constructor(private fb: FormBuilder,
              private transformerService: TransformerService,
              private route: ActivatedRoute,
              private router: Router
              ) {
              }

  ngOnInit(): void {
    this.transformerForm = this.fb.group({
      name: ['', Validators.required],
      vehicleGroup: [{value: '', disabled: true}, Validators.required],
      vehicleType: [{value: '', disabled: true}, Validators.required],
      vehicleModel: [{value: '', disabled: true}, Validators.required],
      gear: [''],
      status: ['', Validators.required]
    });
    this.sub = this.transformerService.selectedTransformerChanges$.subscribe(
      selectedTransformer => this.displayTransformer(selectedTransformer)
    );
    this.vehicleTypes = this.getVehicleTypes();
    this.vehicleTypesChanged = this.vehicleTypes;
    this.getTransformer();
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
  removeDuplicates(duplicates: VehicleTypes[], filtered: VehicleTypes[]): void {
      for (const element1 of duplicates) {
        for (const element2 of filtered) {
          if (element1.group === element2.group) {
            filtered.splice(filtered.indexOf(element2), 1);
            break;
          }
        }
      }
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

  onBack(): void {
    this.router.navigate(['/transformers']);
  }

  displayTransformer(transformer: Trans): void {
    // Set the local transformer property
    this.transformer = transformer;
    // Reset the form back to pristine
    this.transformerForm.reset();
    // Display the appropriate page title
    if (this.transformer) {
      if (this.transformer.name === 'New') {
        this.pageTitle = 'Add Transformer';
      } else {
        this.pageTitle = `Edit Transformer: ${this.transformer.name}`;
      }
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
        const p = {...this.transformer, ...this.transformerForm.value};
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
      } else {
        this.errorMessage = 'Please correct the validation errors.';
      }
    }

  }

}
