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
    console.log('faction' + faction);
    console.log('transformers[0].faction' + transformers[0].faction);
    console.log('transformers[0].faction === faction' + transformers[0].faction === faction);
    return transformers.filter(items => items.faction === faction);
  }
}
