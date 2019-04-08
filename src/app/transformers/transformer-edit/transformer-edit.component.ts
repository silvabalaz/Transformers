import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-pm-transformer-edit',
  templateUrl: './transformer-edit.component.html',
  styleUrls: ['./transformer-edit.component.css']
})
export class TransformerEditComponent implements OnInit, OnDestroy {
  pageTitle = 'Transformer Edit';
  errorMessage = '';
  transformerForm: FormGroup;

  transformer?: Transformer;
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
        maxlength: 'Transformert name cannot exceed 50 characters.'
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



}
