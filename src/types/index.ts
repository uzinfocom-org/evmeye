import { z } from 'zod';

export const NetworkSchema = z.object({
  label: z.string(),
  url: z.string(),
});
export type TNetwork = z.infer<typeof NetworkSchema>;
