import { ChainId } from "@sushiswap/core-sdk";
import Head from "next/head";
import { PairType } from "../../sushi/features/onsen/enum";
import useFarmRewards from "../../sushi/hooks/useFarmRewards";
import BaseLayout from "../Layouts/BaseLayout";
import Hero from "./Hero";

const Farm = () => {
  const data = useFarmRewards({ chainId: ChainId.ETHEREUM });
  const kashiFarms = data.filter((item) => item.pair.type === PairType.KASHI);
  return (
    <>
      <Head>
        <title>Kashi Market - Farm</title>
      </Head>
      <BaseLayout>
        <Hero />
      </BaseLayout>
    </>
  );
};
export default Farm;
