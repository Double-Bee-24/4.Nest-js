import { z } from 'zod';

export const numberArraySchema = z.array(z.number());
