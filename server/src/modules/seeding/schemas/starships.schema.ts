import { z } from 'zod';

export const StarshipSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  model: z.string(),
  starshipClass: z.string(),
  manufacturer: z.string(),
  costInCredits: z.string(),
  length: z.string(),
  crew: z.string(),
  passengers: z.string(),
  maxAtmospheringSpeed: z.string(),
  hyperdriveRating: z.string(),
  MGLT: z.string(),
  cargoCapacity: z.string(),
  consumables: z.string(),
  pilotsIds: z.array(z.string()),
  created: z.string(),
  edited: z.string(),
});

export type StarshipType = z.infer<typeof StarshipSchema>;
