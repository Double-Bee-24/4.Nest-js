import { z } from 'zod';

export const VehicleSchema = z.object({
  id: z.string(),
  name: z.string(),
  model: z.string(),
  manufacturer: z.string(),
  costInCredits: z.string(),
  length: z.string(),
  maxAtmospheringSpeed: z.string(),
  crew: z.string(),
  passengers: z.string(),
  cargoCapacity: z.string(),
  consumables: z.string(),
  vehicleClass: z.string(),
  pilotsIds: z.array(z.string()),
  filmsIds: z.array(z.string()),
  created: z.string(),
  edited: z.string(),
});

export type VehicleType = z.infer<typeof VehicleSchema>;
