import Dexie, { Table } from 'dexie';
import { TBlock } from '@/scanner/schemas';

export class Database extends Dexie {
  public blocks!: Table<TBlock, 'string'>;

  constructor(networkId: string) {
    super(`evmeye-${networkId}`);
    this.version(1).stores({
      blocks: 'number,hash,timestamp,parentHash',
    });
  }
}
