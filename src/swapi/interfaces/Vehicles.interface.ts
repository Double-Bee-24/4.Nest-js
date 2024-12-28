export interface VehiclesResponse {
  properties: {
    model: string;
    vehicle_class: string;
    manufacturer: string;
    cost_in_credits: string;
    length: string;
    crew: string;
    passengers: string;
    max_atmosphering_speed: string;
    cargo_capacity: string;
    consumables: string;
    films: string[];
    pilots: string[];
    created: string;
    edited: string;
    name: string;
    url: string;
  };
  description: string;
  uid: string;
}
