import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pm-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']


})
export class MenuComponent implements OnInit {
  pageTitle = 'Transformers';
  constructor(private router: Router) { }

  ngOnInit() {
  }

}
