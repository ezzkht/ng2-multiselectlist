import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'textFilter',
  pure: true
})
export class TextFilterPipe implements PipeTransform {
    transform(items: any, filter: any): any {
        if (filter && Array.isArray(items) && items.length) {
            let filterKeys = Object.keys(filter);
            return items.filter(item =>
                filterKeys.reduce((pre, cur) =>
                    pre && 
                    item[cur].toLowerCase().includes(filter[cur].toLowerCase()),
                    true
                )
            );
        }
    
        return items;
    }
}