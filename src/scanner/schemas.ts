import { z } from 'zod';

export const blockSchema = z.object({
  hash: z.string(),
  number: z.number(),
  timestamp: z.number(),
  parentHash: z.string(),
  nonce: z.string(),
  difficulty: z.bigint(),
  gasLimit: z.bigint(),
  gasUsed: z.bigint(),
  miner: z.string(),
  extraData: z.string(),
  baseFeePerGas: z.bigint().nullable(),
  transactions: z.string().array(),
});

export type TBlock = z.infer<typeof blockSchema>;
