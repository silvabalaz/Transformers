import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Trans} from '../transformer';
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
  sub: Subscription;

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
    const id = +this.route.snapshot.paramMap.get('id');
    this.pageTitle += ': ${id}';
  }
  onBack(): void {
    this.router.navigate(['/transformers']);
  }
   displayTransformer(transformer: Trans): void {
    // Set the local transformer property
    this.transformer = transformer;

    if (this.transformer) {
      // Reset the form back to pristine
      this.transformerForm.reset();

      // Display the appropriate page title
      if (this.transformer.id === 0) {
        this.pageTitle = 'Add Transformer';
      } else {
        this.pageTitle = `Edit Transformer: ${this.transformer.name}`;
      }

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
