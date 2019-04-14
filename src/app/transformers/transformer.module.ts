import {RouterModule, Routes} from '@angular/router';
import {TransformerEditComponent} from './transformer-edit/transformer-edit.component';
import {NgModule} from '@angular/core';
import {TransformerListComponent} from './transformer-list/transformer-list.component';
import {TransformerShellComponent} from './transformer-shell/transformer-shell.component';
import {SharedModule} from './shared/shared.module';

const Routes: Routes = [
  { path: '', component: TransformerShellComponent }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(this.transformerRoutes)
  ],
  declarations: [
    TransformerShellComponent,
    TransformerListComponent,
    TransformerEditComponent
  ]
})
export class TransformerModule {
}
