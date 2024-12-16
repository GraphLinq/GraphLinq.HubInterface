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
    const ethersProvider = new providers.Web3Provider(this.walletClient.transport);
    return ethersProvider.getSigner();
  }

  async failFundraiser(fundraiserAddr: string): Promise<void> {
    console.log("Failing Fundraiser");
    try {
      const signer = await this.getSigner();
      await this.library.cancelFundraiser(signer, fundraiserAddr);
      console.log("Fundraiser canceled the fundraiser successfully");
    } catch (error) {
      console.error("Error failing fundraiser:", error);
    }
  }

  async finalizeFundraiser(
    fundraiserAddr: string,
    saleToken: string,
    soldAmount: bigint
  ): Promise<void> {
    console.log("Finalizing Fundraiser");
    try {
      const signer = await this.getSigner();
      await this.library.approveERC20(signer, saleToken, fundraiserAddr, soldAmount);
      await this.library.finalizeFundraiser(signer, fundraiserAddr);
      console.log("Fundraiser finalized successfully");
    } catch (error) {
      console.error("Error finalizing fundraiser:", error);
    }
  }

  async createSwapPair(
    fundraiserAddr: string,
    saleToken: string,
    raiseToken: string,
    decimals: number,
    raiseTokenSymbol: string
  ): Promise<void> {
    console.log("Initializing Swap Pair");
    try {
      const signer = await this.getSigner();
      const initialRaiseTokenLiquidity = ethers.parseUnits("10", decimals);
      const requiredSaleTokens = await this.library.getSaleTokenLiquidityInfo(
        fundraiserAddr,
        initialRaiseTokenLiquidity
      );

      await this.library.approveERC20(signer, saleToken, fundraiserAddr, requiredSaleTokens);

      if (raiseTokenSymbol !== "WETH") {
        await this.library.approveERC20(signer, raiseToken, fundraiserAddr, initialRaiseTokenLiquidity);
      }

      await this.library.initSwapPair(signer, fundraiserAddr, -887220, 887220, initialRaiseTokenLiquidity);
      console.log("Swap Pair initialized successfully");
    } catch (error) {
      console.error("Error initializing swap pair:", error);
    }
  }

  async contribute(fundraiserAddr: string, amount: string, decimals: number): Promise<void> {
    console.log("Contributing to Fundraiser");
    try {
      const signer = await this.getSigner();
      const contributionAmount = ethers.parseUnits(amount, decimals);
      await this.library.contribute(signer, fundraiserAddr, contributionAmount);
      console.log("Contribution successful");
    } catch (error) {
      console.error("Error contributing to fundraiser:", error);
    }
  }

  async claimBack(fundraiserAddr: string): Promise<void> {
    console.log("Claiming back funds");
    try {
      const signer = await this.getSigner();
      await this.library.claimFunds(signer, fundraiserAddr);
      console.log("Funds claimed back successfully");
    } catch (error) {
      console.error("Error claiming back funds:", error);
    }
  }

  async claimTokens(fundraiserAddr: string): Promise<void> {
    console.log("Claiming tokens");
    try {
      const signer = await this.getSigner();
      await this.library.claimTokens(signer, fundraiserAddr);
      console.log("Tokens claimed successfully");
    } catch (error) {
      console.error("Error claiming tokens:", error);
    }
  }

  async claimVestedTokens(fundraiserAddr: string): Promise<void> {
    console.log("Claiming vested tokens");
    try {
      const signer = await this.getSigner();
      await this.library.claimVested(signer, fundraiserAddr);
      console.log("Vested tokens claimed successfully");
    } catch (error) {
      console.error("Error claiming vested tokens:", error);
    }
  }
}
