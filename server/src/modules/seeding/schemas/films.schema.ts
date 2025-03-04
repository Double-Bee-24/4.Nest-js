import { z } from 'zod';

export const FilmSchema = z.object({
  id: z.string(),
  title: z.string(),
  episodeId: z.number(),
  openingCrawl: z.string(),
  director: z.string(),
  producer: z.string(),
  releaseDate: z.string(),
  created: z.string().datetime(),
  edited: z.string().datetime(),
  description: z.string(),
  charactersIds: z.array(z.string()),
  planetsIds: z.array(z.string()),
  starshipsIds: z.array(z.string()),
  vehiclesIds: z.array(z.string()),
  speciesIds: z.array(z.string()),
});

export type FilmType = z.infer<typeof FilmSchema>;
