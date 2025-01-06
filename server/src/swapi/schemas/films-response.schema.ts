import { z } from 'zod';

export const FilmsResponseSchema = z.object({
  message: z.string(), // "ok"
  result: z.object({
    properties: z.object({
      characters: z.array(z.string().url()), // Array of URLs for characters
      planets: z.array(z.string().url()), // Array of URLs for planets
      starships: z.array(z.string().url()), // Array of URLs for starships
      vehicles: z.array(z.string().url()), // Array of URLs for vehicles
      species: z.array(z.string().url()), // Array of URLs for species
      created: z.string().datetime(), // "2025-01-06T01:13:23.553Z"
      edited: z.string().datetime(), // "2025-01-06T01:13:23.553Z"
      producer: z.string(), // "Gary Kurtz, Rick McCallum"
      title: z.string(), // "A New Hope"
      episode_id: z.number(), // 4
      director: z.string(), // "George Lucas"
      release_date: z.string(), // "1977-05-25"
      opening_crawl: z.string(), // Opening crawl text of the film
      url: z.string().url(), // "https://www.swapi.tech/api/films/1"
    }),
    description: z.string(), // "A Star Wars Film"
    _id: z.string(), // "5f63a117cf50d100047f9762"
    uid: z.string(), // "1"
    __v: z.number(), // 0
  }),
});

export type FilmsResponse = z.infer<typeof FilmsResponseSchema>;

export type FilmsResult = z.infer<typeof FilmsResponseSchema.shape.result>;
