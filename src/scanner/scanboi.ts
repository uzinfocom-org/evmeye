import { ethers } from 'ethers';

export class Scanboi {
  constructor(private provider: ethers.JsonRpcProvider) {
    console.log(`Scanboi initialized with RPC URL ${provider._getConnection().url}`);
  }

  public dispose() {
    this.provider.removeAllListeners();
  }
}
