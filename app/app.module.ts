import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { MultiSelectListModule } from './multi-select-list.module';
import { AppComponent }  from './app.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, MultiSelectListModule ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
