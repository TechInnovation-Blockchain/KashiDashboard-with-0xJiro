import { ChainId } from "@sushiswap/core-sdk";
import Head from "next/head";
import KashiPairFarmTable from "../../components/module/Tables/KashiPairFarmTable";
import { PairType } from "../../sushi/features/onsen/enum";
import useFarmRewards from "../../sushi/hooks/useFarmRewards";
import BaseLayout from "../Layouts/BaseLayout";
import Hero from "./Hero";
import Market from "./Market";

const Farm = () => {
  const data = useFarmRewards({ chainId: ChainId.ETHEREUM });
  const kashiFarms = data.filter(
    (item) => item.pair.type === PairType.KASHI && item.rewardAprPerDay > 0
  );
  return (
    <>
      <Head>
        <title>Kashi Market - Farm</title>
      </Head>
      <BaseLayout>
        <Hero />
        <Market
          data={kashiFarms}
          loading={!kashiFarms || kashiFarms.length === 0}
        />
      </BaseLayout>
    </>
  );
};
export default Farm;
