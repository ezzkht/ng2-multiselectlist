import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { MultiSelectListModule } from './multi-select-list.module';

@Component({
    selector: 'my-app',
    templateUrl: './app/app.component.html'
})
export class AppComponent { 
    countries: Array<any>;
  company: any;

  constructor() {
    this.countries = [
        {id: 1, name: 'United States'},
        {id: 2, name: 'Canada'},
        {id: 3, name: 'Brazil'},
        {id: 4, name: 'Mexico'},
        {id: 5, name: 'United Kingdom'},
        {id: 6, name: 'Italy'},
        {id: 7, name: 'Germany'},
        {id: 8, name: 'France'},
        {id: 9, name: 'Ukraine'},
        {id: 10, name: 'Russia'}
    ];
    
    this.company = {
        id: 1, 
        name: "XYZ Co. Ltd.",
        branches: [this.countries[0], this.countries[1], this.countries[4]]
    };
  }
}
