import { z } from 'zod';

export const PersonSchema = z.object({
  id: z.string(),
  name: z.string(),
  height: z.string(),
  mass: z.string(),
  hairColor: z.string(),
  skinColor: z.string(),
  eyeColor: z.string(),
  birthYear: z.string(),
  gender: z.string(),
  homeworldId: z.string(),
  description: z.string(),
  created: z.string().datetime(),
  edited: z.string().datetime(),
});

export type PersonType = z.infer<typeof PersonSchema>;
