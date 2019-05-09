import {Component, OnDestroy, OnInit} from '@angular/core';
import {Faction, Trans} from '../transformer';
import {Subscription} from 'rxjs';
import {TransformerService} from '../transformer.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-pm-transformer-list',
  templateUrl: './transformer-list.component.html',
  styleUrls: ['./transformer-list.component.css']
})
export class TransformerListComponent implements OnInit, OnDestroy {
  pageTitle = 'Transformer list';
  errorMessage: string;
  searchForm: FormGroup;
  searchTerm = '';
  factions: Faction[];
  faction: string;

  transformers: Trans[];
  transformer: Trans;
  selectedTransformer: Trans | null;
  sub: Subscription;

  constructor(private fb: FormBuilder,
              private transformerService: TransformerService) { }

  ngOnInit(): void {
    this.sub = this.transformerService.selectedTransformerChanges$.subscribe(
      selectedTransformer => this.selectedTransformer = selectedTransformer
    );

    this.transformerService.getTransformers().subscribe(
      (transformers: Trans[]) => this.transformers = transformers,
      (err: any) => this.errorMessage = err.error
    );
    this.searchForm = this.fb.group({
      searchTerm: '',
      factions: ['']
    });
    this.factions = this.getFactions();
  }

  onChanges(val: any): void {
      this.searchTerm = val.target.value;
  }
  getFactions(): Faction[] {
    return [
      {
        id: 0,
        name: 'Autobots'
      }, {
        id: 1,
        name: 'Decepticons'
      }
    ];
  }
  checkFaction(val: any): void {
    this.faction = val.target.value;
  }
  ngOnDestroy(): void {
    console.log('OnDestroy transformer-list component');
    this.sub.unsubscribe();
  }
  newTransformer(id: number): void {
    console.log('newTransformer transformer-list component');
    this.transformerService.changeSelectedTransformer(this.transformerService.newTransformer(id));
  }
}
