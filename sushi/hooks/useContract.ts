export default {}
// import { Contract } from '@ethersproject/contracts'
// import {
//   BAR_ADDRESS,
//   BENTOBOX_ADDRESS,
//   BORING_HELPER_ADDRESS,
//   CHAIN_KEY,
//   ChainId,
//   CHAINLINK_ORACLE_ADDRESS,
//   ENS_REGISTRAR_ADDRESS,
//   FACTORY_ADDRESS,
//   MAKER_ADDRESS,
//   MASTERCHEF_ADDRESS,
//   MASTERCHEF_V2_ADDRESS,
//   MERKLE_DISTRIBUTOR_ADDRESS,
//   MINICHEF_ADDRESS,
//   MULTICALL2_ADDRESS,
//   ROUTER_ADDRESS,
//   SUSHI_ADDRESS,
//   TIMELOCK_ADDRESS,
//   WNATIVE_ADDRESS,
// } from '@sushiswap/core-sdk'
// import { STOP_LIMIT_ORDER_ADDRESS } from '@sushiswap/limit-order-sdk'
// import MISO from '@sushiswap/miso/exports/all.json'
// import ConstantProductPoolArtifact from '@sushiswap/trident/artifacts/contracts/pool/constant-product/ConstantProductPool.sol/ConstantProductPool.json'
// import TRIDENT from '@sushiswap/trident/exports/all.json'
// import { Pool, PoolType } from '@sushiswap/trident-sdk'
// import { OLD_FARMS } from 'app/config/farms'
// import {
//   ARGENT_WALLET_DETECTOR_ABI,
//   ARGENT_WALLET_DETECTOR_MAINNET_ADDRESS,
// } from 'app/constants/abis/argent-wallet-detector'
// import BAR_ABI from 'app/constants/abis/bar.json'
// import BENTOBOX_ABI from 'app/constants/abis/bentobox.json'
// import BORING_HELPER_ABI from 'app/constants/abis/boring-helper.json'
// import CHAINLINK_ORACLE_ABI from 'app/constants/abis/chainlink-oracle.json'
// import CLONE_REWARDER_ABI from 'app/constants/abis/clone-rewarder.json'
// import COMPLEX_REWARDER_ABI from 'app/constants/abis/complex-rewarder.json'
// import DASHBOARD_ABI from 'app/constants/abis/dashboard.json'
// import EIP_2612_ABI from 'app/constants/abis/eip-2612.json'
// import ENS_PUBLIC_RESOLVER_ABI from 'app/constants/abis/ens-public-resolver.json'
// import ENS_ABI from 'app/constants/abis/ens-registrar.json'
// import { ERC20_BYTES32_ABI } from 'app/constants/abis/erc20'
// import ERC20_ABI from 'app/constants/abis/erc20.json'
// import FACTORY_ABI from 'app/constants/abis/factory.json'
// import INARI_ABI from 'app/constants/abis/inari.json'
// import MULTICALL_ABI from 'app/constants/abis/interface-multicall.json'
// import KASHI_REPOSITORY_ABI from 'app/constants/abis/kashi-repository.json'
// import LIMIT_ORDER_ABI from 'app/constants/abis/limit-order.json'
// import LIMIT_ORDER_HELPER_ABI from 'app/constants/abis/limit-order-helper.json'
// import MAKER_ABI from 'app/constants/abis/maker.json'
// import MASTERCHEF_ABI from 'app/constants/abis/masterchef.json'
// import MASTERCHEF_V2_ABI from 'app/constants/abis/masterchef-v2.json'
// import MEOWSHI_ABI from 'app/constants/abis/meowshi.json'
// import MERKLE_DISTRIBUTOR_ABI from 'app/constants/abis/merkle-distributor.json'
// import MINICHEF_ABI from 'app/constants/abis/minichef-v2.json'
// import MISO_HELPER_ABI from 'app/constants/abis/miso-helper.json'
// import MULTICALL2_ABI from 'app/constants/abis/multicall2.json'
// import ROUTER_ABI from 'app/constants/abis/router.json'
// import SUSHI_ABI from 'app/constants/abis/sushi.json'
// import SUSHIROLL_ABI from 'app/constants/abis/sushi-roll.json'
// import TIMELOCK_ABI from 'app/constants/abis/timelock.json'
// import UNI_FACTORY_ABI from 'app/constants/abis/uniswap-v2-factory.json'
// import IUniswapV2PairABI from 'app/constants/abis/uniswap-v2-pair.json'
// import WETH9_ABI from 'app/constants/abis/weth.json'
// import ZENKO_ABI from 'app/constants/abis/zenko.json'
// import { poolEntityMapper } from 'app/features/trident/poolEntityMapper'
// import { getContract } from 'app/functions'
// import { useActiveWeb3React } from 'app/services/web3'
// import { useMemo } from 'react'

// const UNI_FACTORY_ADDRESS = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f'

// export function useEIP2612Contract(tokenAddress?: string): Contract | null {
//   return useContract(tokenAddress, EIP_2612_ABI, false)
// }

// // returns null on errors
// export function useContract<T extends Contract = Contract>(
//   addressOrAddressMap: string | { [chainId: number]: string } | undefined,
//   ABI: any,
//   withSignerIfPossible = true
// ): T | null {
//   const { library, account, chainId } = useActiveWeb3React()

//   return useMemo(() => {
//     if (!addressOrAddressMap || !ABI || !library || !chainId) return null
//     let address: string | undefined
//     if (typeof addressOrAddressMap === 'string') address = addressOrAddressMap
//     else address = addressOrAddressMap[chainId]
//     if (!address) return null
//     try {
//       return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined)
//     } catch (error) {
//       console.error('Failed to get contract', error)
//       return null
//     }
//   }, [addressOrAddressMap, ABI, library, chainId, withSignerIfPossible, account]) as T
// }

// export function useTokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
//   return useContract(tokenAddress, ERC20_ABI, withSignerIfPossible)
// }

// export function useWETH9Contract(withSignerIfPossible?: boolean): Contract | null {
//   const { chainId } = useActiveWeb3React()
//   return useContract(chainId ? WNATIVE_ADDRESS[chainId] : undefined, WETH9_ABI, withSignerIfPossible)
// }

// export function useArgentWalletDetectorContract(): Contract | null {
//   const { chainId } = useActiveWeb3React()
//   return useContract(
//     chainId === ChainId.ETHEREUM ? ARGENT_WALLET_DETECTOR_MAINNET_ADDRESS : undefined,
//     ARGENT_WALLET_DETECTOR_ABI,
//     false
//   )
// }

// export function useENSRegistrarContract(withSignerIfPossible?: boolean): Contract | null {
//   const { chainId } = useActiveWeb3React()
//   return useContract(chainId ? ENS_REGISTRAR_ADDRESS[chainId] : undefined, ENS_ABI, withSignerIfPossible)
// }

// export function useENSResolverContract(address: string | undefined, withSignerIfPossible?: boolean): Contract | null {
//   return useContract(address, ENS_PUBLIC_RESOLVER_ABI, withSignerIfPossible)
// }

// export function useBytes32TokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
//   return useContract(tokenAddress, ERC20_BYTES32_ABI, withSignerIfPossible)
// }

// export function usePairContract(pairAddress?: string, withSignerIfPossible?: boolean): Contract | null {
//   return useContract(pairAddress, IUniswapV2PairABI, withSignerIfPossible)
// }

// export function useMerkleDistributorContract(): Contract | null {
//   const { chainId } = useActiveWeb3React()
//   return useContract(chainId ? MERKLE_DISTRIBUTOR_ADDRESS[chainId] : undefined, MERKLE_DISTRIBUTOR_ABI, true)
// }

// export function useProtocolMerkleDistributorContract(): Contract | null {
//   const { chainId } = useActiveWeb3React()
//   return useContract(chainId ? '0x1026cbed7b7E851426b959BC69dcC1bf5876512d' : undefined, MERKLE_DISTRIBUTOR_ABI, true)
// }

// export function useKashiRepositoryContract(): Contract | null {
//   const { chainId } = useActiveWeb3React()
//   return useContract(chainId ? '0x400AFAbFB249210E08A8dfC429FfE20d32245f57' : undefined, KASHI_REPOSITORY_ABI, false)
// }

// export function useBoringHelperContract(): Contract | null {
//   const { chainId } = useActiveWeb3React()
//   // TODO ramin update in sdk
//   return useContract(
//     chainId
//       ? chainId === ChainId.KOVAN
//         ? '0x5bd6e4eFA335192FDA5D6B42a344ccA3d45894B8'
//         : BORING_HELPER_ADDRESS[chainId]
//       : undefined,
//     BORING_HELPER_ABI,
//     false
//   )
// }

// export function useMulticall2Contract() {
//   const { chainId } = useActiveWeb3React()
//   return useContract(chainId ? MULTICALL2_ADDRESS[chainId] : undefined, MULTICALL2_ABI, false)
// }

// const MULTICALL_ADDRESS = {
//   [ChainId.ETHEREUM]: '0x1F98415757620B543A52E61c46B32eB19261F984',
//   [ChainId.ROPSTEN]: '0x1F98415757620B543A52E61c46B32eB19261F984',
//   [ChainId.RINKEBY]: '0x1F98415757620B543A52E61c46B32eB19261F984',
//   [ChainId.GÖRLI]: '0x1F98415757620B543A52E61c46B32eB19261F984',
//   [ChainId.KOVAN]: '0x1F98415757620B543A52E61c46B32eB19261F984',
//   [ChainId.MATIC]: '0x1F98415757620B543A52E61c46B32eB19261F984',
//   [ChainId.ARBITRUM]: '0xadF885960B47eA2CD9B55E6DAc6B42b7Cb2806dB',
//   [ChainId.AVALANCHE]: '0x8C0F842791F03C095b6c633759224FcC9ACe68ea',
//   [ChainId.BSC]: '0x47A307e3167820daf22a377D777371753758f59c',
//   [ChainId.FANTOM]: '0xB1395e098c0a847CC719Bcf1Fc8114421a9F8232',
//   [ChainId.CELO]: '0x3d0B3b816DC1e0825808F27510eF7Aa5E3136D75',
//   [ChainId.HARMONY]: '0xaAB49386BFcB605F853763Ea382B91C9c83b9Ac5',
//   [ChainId.MOONRIVER]: '0x8C8BF5Dea280A1eC68219D66E8A21E60585830F5',
//   [ChainId.XDAI]: '0x2B75358D07417D4e895c952Ca84A44E63AEBE3Dd',
//   [ChainId.TELOS]: '0x64e1E895866B3126f8f2E2912B475FDB35b2F315',
//   [ChainId.FUSE]: '0x393B6DC9B00E18314888678721eC0e923FC5f49D',
//   [ChainId.OKEX]: '0x8C8BF5Dea280A1eC68219D66E8A21E60585830F5',
//   [ChainId.HECO]: '0x64e1E895866B3126f8f2E2912B475FDB35b2F315',
//   [ChainId.PALM]: '0x4d4A0D45a98AE8EC25b359D93A088A87BC9eF70b',
// }

// export function useInterfaceMulticall(): Contract | null | undefined {
//   return useContract(MULTICALL_ADDRESS, MULTICALL_ABI, false)
// }

// export function useSushiContract(withSignerIfPossible = true): Contract | null {
//   const { chainId } = useActiveWeb3React()
//   return useContract(chainId ? SUSHI_ADDRESS[chainId] : undefined, SUSHI_ABI, withSignerIfPossible)
// }

// export function useMasterChefContract(withSignerIfPossible?: boolean): Contract | null {
//   const { chainId } = useActiveWeb3React()
//   return useContract(chainId ? MASTERCHEF_ADDRESS[chainId] : undefined, MASTERCHEF_ABI, withSignerIfPossible)
// }

// export function useMasterChefV2Contract(withSignerIfPossible?: boolean): Contract | null {
//   const { chainId } = useActiveWeb3React()
//   return useContract(chainId ? MASTERCHEF_V2_ADDRESS[chainId] : undefined, MASTERCHEF_V2_ABI, withSignerIfPossible)
// }
// export function useMiniChefContract(withSignerIfPossible?: boolean): Contract | null {
//   const { chainId } = useActiveWeb3React()
//   return useContract(chainId ? MINICHEF_ADDRESS[chainId] : undefined, MINICHEF_ABI, withSignerIfPossible)
// }

// export function useOldFarmsContract(withSignerIfPossibe?: boolean): Contract | null {
//   const { chainId } = useActiveWeb3React()
//   return useContract(chainId ? OLD_FARMS[chainId] : undefined, MINICHEF_ABI, withSignerIfPossibe)
// }
