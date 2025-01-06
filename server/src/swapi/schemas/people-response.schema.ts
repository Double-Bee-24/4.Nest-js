import { z } from 'zod';

export const PeopleResponseSchema = z.object({
  message: z.string(), // "ok"
  result: z.object({
    properties: z.object({
      height: z.string(), // "172"
      mass: z.string(), // "77"
      hair_color: z.string(), // "blond"
      skin_color: z.string(), // "fair"
      eye_color: z.string(), // "blue"
      birth_year: z.string(), // "19BBY"
      gender: z.string(), // "male"
      created: z.string().datetime(), // "2025-01-05T00:40:27.777Z"
      edited: z.string().datetime(), // "2025-01-05T00:40:27.777Z"
      name: z.string(), // "Luke Skywalker"
      homeworld: z.string().url(), // URL
      url: z.string().url(), // URL
    }),
    description: z.string(), // "A person within the Star Wars universe"
    _id: z.string(), // "5f63a36eee9fd7000499be42"
    uid: z.string(), // "1"
    __v: z.number(), // 0
  }),
});

export type PeopleResponse = z.infer<typeof PeopleResponseSchema>;

export type PeopleResult = z.infer<typeof PeopleResponseSchema.shape.result>;
