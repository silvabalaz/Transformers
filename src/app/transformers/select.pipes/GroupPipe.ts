import {Pipe, PipeTransform} from '@angular/core';
import {VehicleTypes} from '../transformer';
@Pipe ({
  name : 'grouppipe'
})
export class GroupPipe implements PipeTransform {
  transform(vehicleTypes: VehicleTypes[], group: string ): VehicleTypes[] {
    if (!vehicleTypes || !group) {
      return vehicleTypes;
    }
    return vehicleTypes.filter(items => items.group === group);
  }
}
