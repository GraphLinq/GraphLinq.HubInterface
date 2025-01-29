import { providers, ethers } from "ethers";

export class FundraiserManager {
  private library: any;
  private walletClient: any;

  constructor(library: any, walletClient: any) {
    this.library = library;
    this.walletClient = walletClient;
  }

  private async getSigner() {
    if (!this.walletClient) {
      throw new Error("Wallet client is not connected");
    }
    const ethersProvider = new providers.Web3Provider(
      this.walletClient.transport
    );
    return ethersProvider.getSigner();
  }

  async failFundraiser(fundraiserAddr: string): Promise<void> {
    console.log("Failing Fundraiser");
    const signer = await this.getSigner();
    await this.library.cancelFundraiser(signer, fundraiserAddr);
    console.log("Fundraiser canceled the fundraiser successfully");
  }

  async finalizeFundraiser(
    fundraiserAddr: string,
    saleToken: string,
    soldAmount: bigint
  ): Promise<void> {
    console.log("Finalizing Fundraiser");
    const signer = await this.getSigner();
    await this.library.approveERC20(
      signer,
      saleToken,
      fundraiserAddr,
      soldAmount
    );
    await this.library.finalizeFundraiser(signer, fundraiserAddr);
    console.log("Fundraiser finalized successfully");
  }

  async createSwapPair(
    fundraiserAddr: string,
    saleToken: string,
    raiseToken: string,
    decimals: number,
    raiseTokenSymbol: string
  ): Promise<void> {
    console.log("Initializing Swap Pair");
    const signer = await this.getSigner();
    const initialRaiseTokenLiquidity = ethers.utils.parseUnits("10", decimals);
    const requiredSaleTokens = await this.library.getSaleTokenLiquidityInfo(
      fundraiserAddr,
      initialRaiseTokenLiquidity
    );

    await this.library.approveERC20(
      signer,
      saleToken,
      fundraiserAddr,
      requiredSaleTokens
    );

    if (raiseTokenSymbol !== "WETH") {
      await this.library.approveERC20(
        signer,
        raiseToken,
        fundraiserAddr,
        initialRaiseTokenLiquidity
      );
    }

    await this.library.initSwapPair(
      signer,
      fundraiserAddr,
      -887220,
      887220,
      initialRaiseTokenLiquidity
    );
    console.log("Swap Pair initialized successfully");
  }

  async contribute(
    fundraiserAddr: string,
    amount: string,
    decimals: number
  ): Promise<void> {
    console.log("Contributing to Fundraiser");
    const signer = await this.getSigner();
    const contributionAmount = ethers.utils.parseUnits(amount, decimals);
    await this.library.contribute(signer, fundraiserAddr, contributionAmount);
    console.log("Contribution successful");
  }

  async claimBack(fundraiserAddr: string): Promise<void> {
    console.log("Claiming back funds");
    const signer = await this.getSigner();
    await this.library.claimFunds(signer, fundraiserAddr);
    console.log("Funds claimed back successfully");
  }

  async claimTokens(fundraiserAddr: string): Promise<void> {
    console.log("Claiming tokens");
    const signer = await this.getSigner();
    await this.library.claimTokens(signer, fundraiserAddr);
    console.log("Tokens claimed successfully");
  }

  async claimVestedTokens(fundraiserAddr: string): Promise<void> {
    console.log("Claiming vested tokens");
    const signer = await this.getSigner();
    await this.library.claimVested(signer, fundraiserAddr);
    console.log("Vested tokens claimed successfully");
  }
}
