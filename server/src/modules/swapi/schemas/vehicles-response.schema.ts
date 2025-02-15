import { z } from 'zod';

export const VehiclesResponseSchema = z.object({
  message: z.string(), // "ok"
  result: z.object({
    properties: z.object({
      model: z.string(), // "t-47 airspeeder"
      vehicle_class: z.string(), // "airspeeder"
      manufacturer: z.string(), // "Incom corporation"
      cost_in_credits: z.string(), // "unknown"
      length: z.string(), // "4.5"
      crew: z.string(), // "2"
      passengers: z.string(), // "0"
      max_atmosphering_speed: z.string(), // "650"
      cargo_capacity: z.string(), // "10"
      consumables: z.string(), // "none"
      films: z.array(z.string()), // [] (empty array)
      pilots: z.array(z.string()), // ["https://www.swapi.tech/api/people/1", "https://www.swapi.tech/api/people/18"]
      created: z.string().datetime(), // "2020-09-17T17:46:31.415Z"
      edited: z.string().datetime(), // "2020-09-17T17:46:31.415Z"
      name: z.string(), // "Snowspeeder"
      url: z.string().url(), // "https://www.swapi.tech/api/vehicles/14"
    }),
    description: z.string(), // "A vehicle"
    _id: z.string(), // "5f63a160cf50d100047f9800"
    uid: z.string(), // "14"
    __v: z.number(), // 0
  }),
});

export type VehiclesResponse = z.infer<typeof VehiclesResponseSchema>;

export type VehiclesResult = z.infer<
  typeof VehiclesResponseSchema.shape.result
>;
