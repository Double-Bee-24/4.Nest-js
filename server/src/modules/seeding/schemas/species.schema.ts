import { z } from 'zod';

export const SpeciesSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  classification: z.string(),
  designation: z.string(),
  averageHeight: z.string(),
  averageLifespan: z.string(),
  hairColors: z.string(),
  skinColors: z.string(),
  eyeColors: z.string(),
  homeworldId: z.string(),
  language: z.string(),
  peopleIds: z.array(z.string()),
  created: z.string(),
  edited: z.string(),
});

export type SpeciesType = z.infer<typeof SpeciesSchema>;
