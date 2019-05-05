import {Component, Input, OnInit} from '@angular/core';

@Component({
  templateUrl: './transformer-shell.component.html'
})
export class TransformerShellComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  console.log('InInit shell transformer');
  }
}
