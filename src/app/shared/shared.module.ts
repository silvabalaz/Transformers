import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
