import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { MultiSelectListComponent } from './multi-select-list/multi-select-list.component';
import { TextFilterPipe } from './multi-select-list/text-filter.pipe';

@NgModule({
  imports: [FormsModule, BrowserModule],
  declarations: [MultiSelectListComponent, TextFilterPipe],
  exports: [MultiSelectListComponent, TextFilterPipe]
})
export class MultiSelectListModule {
}