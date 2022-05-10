import { useQuery } from "@apollo/client";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAppContext } from "../../context/AppContext";
import { getKashiPairsQuery } from "../../graphql/explore";
import { KashiPairsByToken } from "../../types/KashiPair";
import BaseLayout from "../Layouts/BaseLayout";
import Hero from "./Hero";
import Market from "./Market";

const Home: NextPage = () => {
  const {
    loading: loadingToken,
    error,
    data: dataKashiPairs,
  } = useQuery(getKashiPairsQuery);
  const [calculating, setCalculating] = useState(true);
  const [pricesMap, setPricesMap] = useState<{ [key: string]: BigInt }>({});
  const [kashiPairsByTokens, setKashiPairsByTokens] = useState<
    KashiPairsByToken[]
  >([]);
  const { coinGeckoService, calculateService } = useAppContext();
  const loading = loadingToken || calculating;

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  useEffect(() => {
    if (dataKashiPairs) {
      if (dataKashiPairs.kashiPairs) {
        setDataKashiPairs();
      }
    }
  }, [dataKashiPairs]);

  const setDataKashiPairs = async () => {
    const { kashiPairs } = dataKashiPairs;
    const symbols = calculateService.extractKashiPairAssetSymbols(kashiPairs);
    const pricesMap = await coinGeckoService.getPrices(symbols);
    setPricesMap(pricesMap);

    const { kashiPairsByTokens } =
      calculateService.calculateKashiPairPricesGroupByAsset(
        kashiPairs,
        pricesMap
      );
    setCalculating(false);
    setKashiPairsByTokens(
      kashiPairsByTokens.sort((a, b) => (a.totalAsset > b.totalAsset ? -1 : 1))
    );
  };

  return (
    <>
      <Head>
        <title>Kashi Market - Explore</title>
      </Head>
      <BaseLayout>
        <Hero />
        <Market data={kashiPairsByTokens} loading={loading} />
      </BaseLayout>
    </>
  );
};

export default Home;
