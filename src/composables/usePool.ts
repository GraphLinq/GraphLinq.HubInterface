import { GLQCHAIN_POOL_NFT_ADDRESS, NULL_ADDRESS, UNISWAP_POOL_FACTORY_ADDRESS } from "@constants/index";
import { Contract, ethers } from "ethers";
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import univ3prices from '@thanpolas/univ3prices';
import { abi as IUniswapV3FactoryABI } from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Factory.sol/IUniswapV3Factory.json';
import { abi as IUniswapV3PoolABI } from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json';
import ERC20 from "../contracts/ERC20.json";

import { useEthersSigner } from "./useEthersProvider";
import useRpcProvider from "./useRpcProvider";

const nftContractABI = [
  "function balanceOf(address owner) external view returns (uint256 balance)",
  "function tokenOfOwnerByIndex(address owner, uint256 index) external view returns (uint256 tokenId)",
];

const usePool = () => {
  const { address: account } = useAccount();
  const rpcProvider = useRpcProvider();
  const injectedProvider = useEthersSigner();
  const provider = injectedProvider ? injectedProvider : rpcProvider;



  const [tokenIds, setTokenIds] = useState<string[]>([]);

  useEffect(() => {
    const findAllTokenIds = async () => {
      try {
        const nftContract = new Contract(
            GLQCHAIN_POOL_NFT_ADDRESS,
            nftContractABI,
            provider
          );

        const balance = await nftContract.balanceOf(account);
        const ids = [];

        for (let index = 0; index < balance.toNumber(); index++) {
          const tokenId = await nftContract.tokenOfOwnerByIndex(account, index);
          ids.push(tokenId.toString());
        }

        setTokenIds(ids);
      } catch (error) {
        console.error("Error getting pools :", error);
      }
    };

    findAllTokenIds();
  }, [account, provider]);

  const askForAllowance = async (tokenAddress: string, amount: string, targetContract: ethers.Contract) => {
    let allowance = "0";
    const tokenContract = new Contract(tokenAddress, ERC20, provider);
    if (tokenContract) {
      const requiredAmount = parseFloat(amount);
      allowance = await tokenContract.allowance(
        account,
        targetContract.address
      );

      const allowanceDecimal = parseFloat(
        ethers.utils.formatEther(allowance.toString())
      );

      if (allowanceDecimal < requiredAmount) {
        // setPending(
        //   "Allowance pending, please allow the use of your token balance for the contract..."
        // );
        const approveTx = await tokenContract.approve(
            targetContract.address,
          ethers.utils.parseEther(requiredAmount.toString())
        );
        // setPending("Waiting for confirmations...");
        await approveTx.wait();
        // setPending(
        //   "Allowance successfully increased, waiting for deposit transaction..."
        // );
      }
    }
  }

  const deployOrGetPool = async (tokenA: string, tokenB: string, amountA: string, amountB: string, feeInPercent: string) => {
    try {
      const tokens = tokenA < tokenB ? [tokenA, tokenB] : [tokenB, tokenA];
      const fee = parseFloat(feeInPercent) * 10000;
      const amountAFormatted = ethers.utils.parseEther(amountA);
      const amountBFormatted = ethers.utils.parseEther(amountB);

      const uniswapFactoryContract = new Contract(
        UNISWAP_POOL_FACTORY_ADDRESS,
        IUniswapV3FactoryABI,
        provider
      );

      const existingPoolAddress = await uniswapFactoryContract.getPool(tokens[0], tokens[1], fee, {gasLimit: 40000});
      console.log(existingPoolAddress);
      if (existingPoolAddress !== NULL_ADDRESS) {
        console.log(`Pool already exists at address: ${existingPoolAddress}`);
        const poolContract = new Contract(existingPoolAddress, IUniswapV3PoolABI, provider);

        console.log('askForAllowance tokenA');
        await askForAllowance(tokenA, amountA, poolContract);
        console.log('askForAllowance tokenB');
        await askForAllowance(tokenB, amountB, poolContract);
        console.log('askForAllowance end');

        const sqrtPrice = univ3prices.utils.encodeSqrtRatioX96(amountAFormatted, amountBFormatted);
        const tx = await poolContract.initialize(sqrtPrice.toString(), {gasLimit: 40000});
        await tx.wait();

        console.log(`Pool successfully initialized with base price ${amountAFormatted} VS ${amountBFormatted} !`);
      } else {
        console.log('Deploying pool...');
        const tx = await uniswapFactoryContract.createPool(tokens[0], tokens[1], fee, {gasLimit: 40000});
        const receipt = await tx.wait();

        const poolAddressEvent = receipt.events?.find((e) => e.event === 'PoolCreated');
        if (poolAddressEvent) {
          console.log(`Pool deployed at address: ${poolAddressEvent.args.pool}`);
        } else {
          console.log('PoolCreated event not found in transaction receipt.');
        }
      }
    } catch (error) {
      console.error('Failed to deploy/get pool:', error);
    }
  };

  return { tokenIds, deployOrGetPool };
};

export default usePool;
