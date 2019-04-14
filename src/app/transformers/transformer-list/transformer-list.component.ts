import {Component, OnDestroy, OnInit} from '@angular/core';
import {Trans} from '../transformer';
import {Subscription} from 'rxjs';
import {TransformerService} from '../transformer.service';

@Component({
  selector: 'app-pm-transformer-list',
  templateUrl: './transformer-list.component.html',
  styleUrls: ['./transformer-list.component.css']
})
export class TransformerListComponent implements OnInit, OnDestroy {
  pageTitle = 'Transformers';
  errorMessage: string;

  displayId: boolean;

  transformers: Trans[];

  // Used to highlight the selected transformer in the list
  selectedTransformer: Trans | null;
  sub: Subscription;

  constructor(private transformerService: TransformerService) { }

  ngOnInit(): void {
    this.sub = this.transformerService.selectedTransformerChanges$.subscribe(
      selectedTransformer => this.selectedTransformer = selectedTransformer
    );

    this.transformerService.getTransformer().subscribe(
      (transformers: Trans[]) => this.transformers = transformers,
      (err: any) => this.errorMessage = err.error
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  checkChanged(value: boolean): void {
    this.displayId = value;
  }

  newTransformer(): void {
    this.transformerService.changeSelectedTransformer(this.transformerService.newTransformer());
  }

  transformerSelected(transformer: Trans): void {
    this.transformerService.changeSelectedTransformer(transformer);
  }

}
