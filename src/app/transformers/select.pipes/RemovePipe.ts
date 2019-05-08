import {Pipe, PipeTransform} from '@angular/core';
import {Trans, VehicleTypes} from '../transformer';

@Pipe({
  name: 'removepipe'
})
export class RemovePipe implements PipeTransform {
  transform(vehicleTypes: VehicleTypes[], selected: VehicleTypes): VehicleTypes[] {
    if (!vehicleTypes || !selected) {
      return vehicleTypes;
    }
    console.log('faction' + selected);
    console.log('vehicleTypes[0] + vehicleTypes[0].selected');
    return vehicleTypes.filter(items => items.group === selected);
  }
}
