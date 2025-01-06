import { z } from 'zod';

export const SpeciesResponseSchema = z.object({
  message: z.string(), // "ok"
  result: z.object({
    properties: z.object({
      classification: z.string(), // "mammal"
      designation: z.string(), // "sentient"
      average_height: z.string(), // "100"
      average_lifespan: z.string(), // "unknown"
      hair_colors: z.string(), // "none"
      skin_colors: z.string(), // "brown, purple, grey, red"
      eye_colors: z.string(), // "yellow, blue"
      homeworld: z.string().url(), // "https://www.swapi.tech/api/planets/14"
      language: z.string(), // "Dugese"
      people: z.array(z.string().url()), // ["https://www.swapi.tech/api/people/41"]
      created: z.string().datetime(), // "2025-01-06T01:13:23.567Z"
      edited: z.string().datetime(), // "2025-01-06T01:13:23.567Z"
      name: z.string(), // "Dug"
      url: z.string().url(), // "https://www.swapi.tech/api/species/14"
    }),
    description: z.string(), // "A species within the Star Wars universe"
    _id: z.string(), // "5f63a135cf50d100047f9775"
    uid: z.string(), // "14"
    __v: z.number(), // 0
  }),
});

export type SpeciesResponse = z.infer<typeof SpeciesResponseSchema>;

export type SpeciesResult = z.infer<typeof SpeciesResponseSchema.shape.result>;
