import { Database } from '@/db';
import { ethers } from 'ethers';
import * as Rx from 'rxjs';
import * as RxOperators from 'rxjs/operators';
import { blockSchema } from './schemas';

export class Scanboi {
  private readonly cleanup = new Rx.Subscription(() => {});

  public readonly blockNumber: Rx.Observable<number>;
  private readonly blockNumberSubject = new Rx.BehaviorSubject<number>(-1);

  constructor(
    private provider: ethers.JsonRpcProvider,
    private db: Database,
  ) {
    console.log(`Scanboi initialized with RPC URL ${provider._getConnection().url}`);

    this.blockNumber = this.blockNumberSubject.asObservable();
    this.cleanup.add(this.blockNumberSubject);

    this.initSubscriptions();
  }

  private initSubscriptions() {
    this.cleanup.add(this.fetchBlockNumber$().subscribe(this.blockNumberSubject));
  }

  public fetchBlocksFromLatest$(take: number) {
    return this.blockNumber.pipe(
      RxOperators.filter((blockNumber) => blockNumber > -1),
      RxOperators.switchMap((blockNumber) =>
        this.fetchBlocksReverse$(blockNumber).pipe(
          RxOperators.take(take),
          RxOperators.filter((block) => block != null),
          RxOperators.map((block) => block as ethers.Block),
        ),
      ),
      // @ts-expect-error
      RxOperators.scan((acc, value) => [...acc, value], []),
    );
  }

  public fetchBlockNumber$() {
    // return Rx.interval(5 * 1000)
    return Rx.of(0).pipe(
      RxOperators.startWith(0),
      RxOperators.mergeMap(() => this.provider.getBlockNumber()),
    );
  }

  public fetchBlocks$(startFrom = 0) {
    return Rx.defer(() => this.fetchBlock$(startFrom)).pipe(
      RxOperators.expand(([blockNumber]) => this.fetchBlock$(blockNumber + 1)),
      RxOperators.map((value) => value[1]),
    );
  }

  public fetchBlocksReverse$(startFrom = 0) {
    return Rx.defer(() => this.fetchBlock$(startFrom)).pipe(
      RxOperators.expand(([blockNumber]) =>
        blockNumber < 0 ? Rx.EMPTY : this.fetchBlock$(blockNumber - 1),
      ),
      RxOperators.map((value) => value[1]),
    );
  }

  public fetchBlock$(blockNumber = 0) {
    return Rx.from(
      (async (): Promise<ethers.Block | Rx.Observable<never>> => {
        const results = await this.db.blocks
          .where('number')
          .equals(blockNumber)
          .toArray();

        if (results.length > 0) {
          return new ethers.Block(results[0], this.provider);
        }

        console.log('fetching blockNumber', blockNumber);
        const block = await this.provider.getBlock(blockNumber);

        if (block == null) return Rx.EMPTY;

        try {
          await this.db.blocks.bulkAdd([blockSchema.parse(block)]);
        } catch (e) {
          console.error('Dexie.js error: ', e, block);
        }

        return block;
      })(),
    ).pipe(
      RxOperators.map((block) => [blockNumber, block] as [number, ethers.Block | null]),
      RxOperators.retry(5),
    );
  }

  public dispose() {
    this.provider.removeAllListeners();
    this.cleanup.unsubscribe();
  }
}
