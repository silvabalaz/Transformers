import {Pipe, PipeTransform} from '@angular/core';
import {Trans} from '../transformer';

@Pipe({
  name: 'filterpipe'
})
export class FilterPipe implements PipeTransform {
  transform(transformers: Trans[], faction: string): Trans[] {
    if (!transformers || !faction) {
      return transformers;
    }
    return transformers.filter(items => items.faction === faction);
  }
}
