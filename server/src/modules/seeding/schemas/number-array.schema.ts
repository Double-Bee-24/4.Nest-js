import { z } from 'zod';

export const NumberArraySchema = z.array(z.number());
