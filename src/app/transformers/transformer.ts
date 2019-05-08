export interface Trans {
  id?: number;
  name?: string;
  vehicleGroup?: string;
  vehicleType?: string;
  vehicleModel?: string;
  gear?: string[];
  status?: string;
  faction?: string;
}

export interface VehicleTypes {
  group?: string;
  type?: string;
  model?: string;
}

export interface Faction {
  id?: number;
  name?: string;
}
