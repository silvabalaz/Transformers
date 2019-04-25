export interface Trans {
  id?: number;
  name?: string;
  vehicleGroup?: string;
  vehicleType?: string;
  vehicleModel?: string;
  gear?: string[];
  status?: string;
}

export interface VehicleTypes {
  group?: string;
  type?: string;
  model?: string;
}

