import { z } from 'zod';

export const StarshipsResponseSchema = z.object({
  message: z.string(), // "ok"
  result: z.object({
    properties: z.object({
      model: z.string(), // "DS-1 Orbital Battle Station"
      starship_class: z.string(), // "Deep Space Mobile Battlestation"
      manufacturer: z.string(), // "Imperial Department of Military Research, Sienar Fleet Systems"
      cost_in_credits: z.string(), // "1000000000000"
      length: z.string(), // "120000"
      crew: z.string(), // "342,953"
      passengers: z.string(), // "843,342"
      max_atmosphering_speed: z.string(), // "n/a"
      hyperdrive_rating: z.string(), // "4.0"
      MGLT: z.string(), // "10"
      cargo_capacity: z.string(), // "1000000000000"
      consumables: z.string(), // "3 years"
      pilots: z.array(z.string()), // [] (empty array)
      created: z.string().datetime(), // "2020-09-17T17:55:06.604Z"
      edited: z.string().datetime(), // "2020-09-17T17:55:06.604Z"
      name: z.string(), // "Death Star"
      url: z.string().url(), // "https://www.swapi.tech/api/starships/9"
    }),
    description: z.string(), // "A Starship"
    _id: z.string(), // "5f63a34fee9fd7000499be21"
    uid: z.string(), // "9"
    __v: z.number(), // 0
  }),
});

export type StarshipsResponse = z.infer<typeof StarshipsResponseSchema>;

export type StarshipsResult = z.infer<
  typeof StarshipsResponseSchema.shape.result
>;
