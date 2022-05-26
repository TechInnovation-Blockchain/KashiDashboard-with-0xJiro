// import { useMemo } from "react";
// import {
//   useMasterChefContract,
//   useMasterChefV2Contract,
//   useMiniChefContract,
//   useOldFarmsContract,
// } from "../../hooks/useContract";
// import { Chef } from "./enum";

// export function useChefContract(chef: Chef) {
//   const masterChefContract = useMasterChefContract();
//   const masterChefV2Contract = useMasterChefV2Contract();
//   const miniChefContract = useMiniChefContract();
//   const oldFarmsContract = useOldFarmsContract();
//   const contracts = useMemo(
//     () => ({
//       [Chef.MASTERCHEF]: masterChefContract,
//       [Chef.MASTERCHEF_V2]: masterChefV2Contract,
//       [Chef.MINICHEF]: miniChefContract,
//       [Chef.OLD_FARMS]: oldFarmsContract,
//     }),
//     [
//       masterChefContract,
//       masterChefV2Contract,
//       miniChefContract,
//       oldFarmsContract,
//     ]
//   );
//   return useMemo(() => {
//     return contracts[chef];
//   }, [contracts, chef]);
// }

// export function useChefContracts(chefs: Chef[]) {
//   const masterChefContract = useMasterChefContract();
//   const masterChefV2Contract = useMasterChefV2Contract();
//   const miniChefContract = useMiniChefContract();
//   const oldFarmsContract = useOldFarmsContract();
//   const contracts = useMemo(
//     () => ({
//       [Chef.MASTERCHEF]: masterChefContract,
//       [Chef.MASTERCHEF_V2]: masterChefV2Contract,
//       [Chef.MINICHEF]: miniChefContract,
//       [Chef.OLD_FARMS]: oldFarmsContract,
//     }),
//     [
//       masterChefContract,
//       masterChefV2Contract,
//       miniChefContract,
//       oldFarmsContract,
//     ]
//   );
//   return chefs.map((chef) => contracts[chef]);
// }

// const toRet: any[] = [];
export default {};
