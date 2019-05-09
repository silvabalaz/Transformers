import { InMemoryDbService } from 'angular-in-memory-web-api';

import {Trans, VehicleTypes} from './transformer';

export class TransformerData implements InMemoryDbService {

  createDb() {
    const transformers: Trans[] = [
      /*{
        id: 0,
        name: 'Optimus Prime',
        vehicleGroup: 'Land',
        vehicleType: 'Truck',
        vehicleModel: 'Western Star 5700',
        gear: ['sword', 'shield'],
        status: 'OK'
      },
      {
        id: 1,
        name: 'Bumblebee',
        vehicleGroup: 'Land',
        vehicleType: 'Car',
        vehicleModel: 'Camaro',
        gear: ['machine gun'],
        status: 'INJURED'
      },
      {
        id: 2,
        name: 'Megatron',
        vehicleGroup: 'Air',
        vehicleType: 'Plane',
        vehicleModel: 'Sukhoi',
        gear: ['canon'],
        status: 'MIA'
      }*/
    ];
    return {transformers};

    const vehicleTypes: VehicleTypes[] = [
      {
        group: 'Air',
        type: 'Plane',
        model: 'F-22'
      },
      {
        group: 'Air',
        type: 'Plane',
        model: 'Sukhoi'
      },
      {
        group: 'Air',
        type: 'Plane',
        model: 'MiG'
      },
      {
        group: 'Air',
        type: 'Helicopter',
        model: 'Apache'
      },
      {
        group: 'Air',
        type: 'Helicopter',
        model: 'Kamov'
      },
      {
        group: 'Sea',
        type: 'Boat',
        model: 'Sailboat'
      },
      {
        group: 'Sea',
        type: 'Boat',
        model: 'Jetboat'
      },
      {
        group: 'Sea',
        type: 'Submarine',
        model: 'Standard'
      },
      {
        group: 'Land',
        type: 'Car',
        model: 'Camaro'
      },
      {
        group: 'Land',
        type: 'Car',
        model: 'AMG GT R'
      },
      {
        group: 'Land',
        type: 'Car',
        model: 'Lamborghini'
      },
      {
        group: 'Land',
        type: 'Truck',
        model: 'Unimog'
      },
      {
        group: 'Land',
        type: 'Truck',
        model: 'Western Star 5700'
      }
    ];
    return {vehicleTypes};
  }
}
