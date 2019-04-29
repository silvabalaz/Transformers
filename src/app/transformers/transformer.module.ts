import {RouterModule, Routes} from '@angular/router';
import {TransformerEditComponent} from './transformer-edit/transformer-edit.component';
import {NgModule} from '@angular/core';
import {TransformerListComponent} from './transformer-list/transformer-list.component';
import {TransformerShellComponent} from './transformer-shell/transformer-shell.component';
import {SharedModule} from '../shared/shared.module';
import {TransformerEditShellComponent} from './transformer-edit-shell/transformer-edit-shell.component';
import {TransformerAddComponent} from './transformer-add/transformer-add.component';
import {TypePipe} from './select.pipes/TypePipe';
import {GroupPipe} from './select.pipes/GroupPipe';

const transformerRoutes: Routes = [
  { path: '', component: TransformerShellComponent },
  { path: ':id', component: TransformerEditComponent }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(transformerRoutes)
  ],
  declarations: [
    GroupPipe,
    TypePipe,
    TransformerShellComponent,
    TransformerListComponent,
    TransformerAddComponent,
    TransformerEditShellComponent,
    TransformerEditComponent
  ],
  exports: [
    GroupPipe,
    TypePipe
  ]
})
export class TransformerModule {
}
