import { z } from 'zod';

export const NetworkSchema = z.object({
  id: z.string().uuid(),
  label: z.string(),
  url: z.string(),
});
export type TNetwork = z.infer<typeof NetworkSchema>;
