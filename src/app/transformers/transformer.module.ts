import {RouterModule, Routes} from '@angular/router';
import {TransformerEditComponent} from './transformer-edit/transformer-edit.component';
import {NgModule} from '@angular/core';
import {TransformerListComponent} from './transformer-list/transformer-list.component';
import {TransformerShellComponent} from './transformer-shell/transformer-shell.component';
import {TransformerAddComponent} from './transformer-add/transformer-add.component';
import {SearchPipe} from './select.pipes/SearchPipe';
import {FilterPipe} from './select.pipes/FilterPipe';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

const transformerRoutes: Routes = [
  { path: '', component: TransformerShellComponent },
  { path: ':id', component: TransformerEditComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(transformerRoutes),
    ReactiveFormsModule,
    CommonModule
  ],
  declarations: [
    FilterPipe,
    SearchPipe,
    TransformerShellComponent,
    TransformerListComponent,
    TransformerAddComponent,
    TransformerEditComponent
  ],
  exports: [
    FilterPipe,
    SearchPipe
  ]
})
export class TransformerModule {
}
