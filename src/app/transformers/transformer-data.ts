import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Trans } from './transformer';

export class TransformerData implements InMemoryDbService {

  createDb() {
    const transformers: Trans[] = [
        {
          id: 0,
          name: 'Optimus Prime',
          vehicleGroup: 'Land',
          vehicleType: 'Truck',
          vehicleModel: 'Western Star 5700',
          gear: ['sword', 'shield'],
          status: 'OK'},
        {
          id: 1,
          name: 'Bumblebee',
          vehicleGroup: 'Land',
          vehicleType: 'Car',
          vehicleModel: 'Camaro',
          gear: ['machine gun'],
          status: 'INJURED'},
        {
          id: 2,
          name: 'Megatron',
          vehicleGroup: 'Air',
          vehicleType: 'Plane',
          vehicleModel: 'Sukhoi',
          gear: ['canon'],
          status: 'MIA'}
          ];
    return { transformers };
  }
}
