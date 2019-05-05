import {Pipe, PipeTransform} from '@angular/core';
import {Trans} from '../transformer';

@Pipe ({
  name : 'searchpipe'
})
export class SearchPipe implements PipeTransform {
  transform(transformers: Trans[], searchName: string): Trans[] {
    if (!transformers || !searchName) {
      return transformers;
    }
    return transformers.filter(items => items.name === searchName);
  }
}
