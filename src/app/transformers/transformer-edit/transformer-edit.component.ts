import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {TransformerService} from '../transformer.service';
import {GenericValidator} from '../../shared/generic-validator';
import {Trans} from '../transformer';

@Component({
  selector: 'app-pm-transformer-edit',
  templateUrl: './transformer-edit.component.html',
  styleUrls: ['./transformer-edit.component.css']
})
export class TransformerEditComponent implements OnInit, OnDestroy {
  pageTitle = 'Transformer Edit';
  errorMessage = '';
  transformerForm: FormGroup;

  transformer?: Trans;
  sub: Subscription;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(private fb: FormBuilder,
              private transformerService: TransformerService) {

    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      name: {
        required: 'Transformer name is required.',
        minlength: 'Transformer name must be at least three characters.',
        maxlength: 'Transformer name cannot exceed 50 characters.'
      },
      vehicleGroup: {
        required: 'Vehicle group is required.'
      }
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    // Define the form group
    this.transformerForm = this.fb.group({
      name: ['', [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)]],
      vehicleGroup: ['', Validators.required],
      vehicleType: '',
      vehicleModel: '',
      gear: [''],
      status: ''
    });

    // Watch for changes to the currently selected transformer
    this.sub = this.transformerService.selectedTransformerChanges$.subscribe(
      selectedTransformer => this.displayTransformer(selectedTransformer)
    );

    // Watch for value changes
    this.transformerForm.valueChanges.subscribe(
      value => this.displayMessage = this.genericValidator.processMessages(this.transformerForm)
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  // Also validate on blur
  // Helpful if the user tabs through required fields
  blur(): void {
    this.displayMessage = this.genericValidator.processMessages(this.transformerForm);
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
        name: this.transformer.name
      });
    }
  }

  cancelEdit(): void {
    // Redisplay the currently selected transformer
    // replacing any edits made
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
