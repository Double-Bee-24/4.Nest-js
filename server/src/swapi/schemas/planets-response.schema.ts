import { z } from 'zod';

export const PlanetsResponseSchema = z.object({
  message: z.string(), // "ok"
  result: z.object({
    properties: z.object({
      diameter: z.string(), // "10200"
      rotation_period: z.string(), // "24"
      orbital_period: z.string(), // "4818"
      gravity: z.string(), // "1 standard"
      population: z.string(), // "1000"
      climate: z.string(), // "temperate, tropical"
      terrain: z.string(), // "jungle, rainforests"
      surface_water: z.string(), // "8"
      created: z.string().datetime(), // "2025-01-06T01:13:23.565Z"
      edited: z.string().datetime(), // "2025-01-06T01:13:23.565Z"
      name: z.string(), // "Yavin IV"
      url: z.string().url(), // "https://www.swapi.tech/api/planets/3"
    }),
    description: z.string(), // "A planet."
    _id: z.string(), // "5f7254c11b7dfa00041c6fb0"
    uid: z.string(), // "3"
    __v: z.number(), // 0
  }),
});

export type PlanetsResponse = z.infer<typeof PlanetsResponseSchema>;

export type PlanetsResult = z.infer<typeof PlanetsResponseSchema.shape.result>;
