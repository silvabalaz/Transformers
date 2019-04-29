import {Pipe, PipeTransform} from '@angular/core';
import {VehicleTypes} from '../transformer';

@Pipe ({
  name : 'typepipe'
})
export class TypePipe implements PipeTransform {
  transform(vehicleTypes: VehicleTypes[], type: string): VehicleTypes[] {
    if (!vehicleTypes || !type) {
      return vehicleTypes;
    }
    return vehicleTypes.filter(items => items.type === type);
  }
}
