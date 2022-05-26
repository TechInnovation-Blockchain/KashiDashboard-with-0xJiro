import { ChainId } from "@sushiswap/core-sdk";

export function useActiveWeb3React() {
  return {
    chainId: ChainId.ETHEREUM,
  };
}

export default useActiveWeb3React;
