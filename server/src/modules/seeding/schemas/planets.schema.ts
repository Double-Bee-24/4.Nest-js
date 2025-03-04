import { z } from 'zod';

export const PlanetSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  diameter: z.string(),
  rotationPeriod: z.string(),
  orbitalPeriod: z.string(),
  gravity: z.string(),
  population: z.string(),
  climate: z.string(),
  terrain: z.string(),
  surfaceWater: z.string(),
  created: z.string(),
  edited: z.string(),
});

export type PlanetType = z.infer<typeof PlanetSchema>;
