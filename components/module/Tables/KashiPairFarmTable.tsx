/* eslint-disable @next/next/no-img-element */
import { BigNumber } from "ethers";
import { useRouter } from "next/router";
import numeral from "numeral";
import React, { useEffect, useState } from "react";
import { FaSortDown, FaSortUp } from "react-icons/fa";
import { useAppContext } from "../../../context/AppContext";
import { formatNumber, formatPercent } from "../../../sushi/functions/format";
import { KashiPair } from "../../../types/KashiPair";

type OrderBy = "asset" | "collateral" | "tvl" | "apr" | "";
type OrderDirection = "asc" | "desc";

const MarketTableHead = ({
  onSort,
  orderBy,
  orderDirection,
}: {
  onSort: (orderBy: OrderBy) => void;
  orderBy: OrderBy;
  orderDirection: OrderDirection;
}) => {
  const iconByDirection = {
    asc: <FaSortUp className="inline-block" />,
    desc: <FaSortDown className="inline-block" />,
  };

  return (
    <tr className="text-sm border-t text-slate-400">
      <td className="py-2 pl-8 pr-2">
        <span
          onClick={() => {
            onSort("asset");
          }}
          className="cursor-pointer"
        >
          Asset{orderBy === "asset" && iconByDirection[orderDirection]}
        </span>
        /
        <span
          onClick={() => {
            onSort("collateral");
          }}
          className="cursor-pointer"
        >
          Collateral
          {orderBy === "collateral" && iconByDirection[orderDirection]}
        </span>
      </td>
      <td
        className="p-2 text-right"
        onClick={() => {
          onSort("tvl");
        }}
      >
        <span className="cursor-pointer">
          TVL
          {orderBy === "tvl" && iconByDirection[orderDirection]}
        </span>
      </td>
      <td className="p-2 text-right">
        <span>Rewards</span>
      </td>
      <td
        className="pl-2 pr-8 py-2 text-right"
        onClick={() => {
          onSort("apr");
        }}
      >
        <span className="cursor-pointer">
          APR
          {orderBy === "apr" && iconByDirection[orderDirection]}
        </span>
      </td>
    </tr>
  );
};

const MarketTableRowLoading = () => (
  <tr className="border-t border-l-2 border-transparent cursor-pointer border-t-gray-200 hover:border-l-primary1-400">
    <td className="py-3 pl-8 pr-2">
      <div className="md:flex">
        <div>
          <div className="inline-block w-8 h-8 rounded-full loading"></div>
          <div className="inline-block w-8 h-8 -ml-2 rounded-full loading"></div>
        </div>
        <div className="md:ml-2">
          <div>
            <div className="inline-block w-24 h-5 rounded loading"></div>
          </div>
          <div>
            <div className="inline-block w-12 h-4 rounded loading"></div>
          </div>
        </div>
      </div>
    </td>
    <td className="px-2 py-3 text-right">
      <div>
        <div className="inline-block w-32 h-5 rounded loading"></div>
      </div>
    </td>
    <td className="px-2 py-3 text-right">
      <div>
        <div className="inline-block w-32 h-5 rounded loading"></div>
      </div>
    </td>
    <td className="pl-2 pr-8 py-3 text-right">
      <div className="inline-block w-12 h-5 rounded loading"></div>
    </td>
  </tr>
);

const MarketTableRow = ({ data, index }: { data: any; index: number }) => {
  const { tokenUtilService, handleLogoError } = useAppContext();
  const router = useRouter();
  const goto = (route: string) => {
    router.push(route);
  };

  return (
    <tr
      onClick={() => goto(`/pair/${data.pair.id}`)}
      className="border-t border-l-2 border-transparent cursor-pointer border-t-gray-200 hover:border-l-primary1-400"
    >
      <td className="py-3 pl-8 pr-2">
        <div className="md:flex">
          <div className="flex">
            <img
              src={tokenUtilService.logo(data.pair.asset?.symbol)}
              className="inline-block w-8 h-8 rounded-full"
              onError={handleLogoError}
              alt={data.pair.asset?.symbol}
            />
            <img
              src={tokenUtilService.logo(data.pair.collateral?.symbol)}
              onError={handleLogoError}
              className="inline-block w-8 h-8 -ml-2 rounded-full"
              alt={data.pair.asset?.symbol}
            />
          </div>
          <div className="text-sm md:text-base md:ml-2">
            {tokenUtilService.pairSymbol(
              data.pair.asset?.symbol,
              data.pair.collateral?.symbol
            )}
          </div>
        </div>
      </td>
      <td className="px-2 py-3 text-right">
        <div>{formatNumber(data.tvl, true)}</div>
      </td>
      <td className="px-2 py-3 text-right">
        <div>
          {data?.rewards?.map((reward: any, i: number) => (
            <div
              key={i}
              className="flex gap-1 text-high-emphesis justify-end items-center"
            >
              {formatNumber(reward.rewardPerDay)}
              <img
                src={tokenUtilService.logo(reward.currency.symbol)}
                className="inline-block w-4 h-4 rounded-full"
                onError={handleLogoError}
                alt={data.pair.asset?.symbol}
              />
            </div>
          ))}
        </div>
      </td>
      <td className="pl-2 pr-8 py-3 text-right">
        {data?.tvl !== 0
          ? data?.roiPerYear > 10000
            ? ">10,000%"
            : formatPercent(data?.roiPerYear * 100)
          : "_"}
      </td>
    </tr>
  );
};

const KashiPairFarmTable = ({
  title = "All Markets",
  loading = false,
  data = [],
}: {
  title: string;
  loading?: boolean;
  data: any[];
}) => {
  const [orderBy, setOrderBy] = useState<OrderBy>("");
  const [orderDirection, setOrderDirection] = useState<OrderDirection>("desc");

  const [fullList, setFullList] = useState<any[]>([]);
  const [sortedList, setSortedList] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const { tokenUtilService } = useAppContext();

  useEffect(() => {
    setFullList(data);
  }, [data]);

  useEffect(() => {
    let newSortedList = [...fullList];
    const compareFuncs = {
      asset: {
        asc: (a: any, b: any) =>
          (a.pair.asset?.symbol.toLowerCase() || "").localeCompare(
            b.pair.asset?.symbol.toLowerCase() || ""
          ),
        desc: (a: any, b: any) =>
          (b.pair.asset?.symbol.toLowerCase() || "").localeCompare(
            a.pair.asset?.symbol.toLowerCase() || ""
          ),
      },
      collateral: {
        asc: (a: any, b: any) =>
          (a.pair.collateral?.symbol.toLowerCase() || "").localeCompare(
            b.pair.collateral?.symbol.toLowerCase() || ""
          ),
        desc: (a: any, b: any) =>
          (b.pair.collateral?.symbol.toLowerCase() || "").localeCompare(
            a.pair.collateral?.symbol.toLowerCase() || ""
          ),
      },
      tvl: {
        asc: (a: any, b: any) => (a.tvl < b.tvl ? -1 : 1),
        desc: (a: any, b: any) => (a.tvl > b.tvl ? -1 : 1),
      },
      apr: {
        asc: (a: any, b: any) =>
          a.rewardAprPerDay < b.rewardAprPerDay ? -1 : 1,
        desc: (a: any, b: any) =>
          a.rewardAprPerDay > b.rewardAprPerDay ? -1 : 1,
      },
    };

    if (orderBy) {
      newSortedList.sort(compareFuncs[orderBy][orderDirection]);
    }
    setSortedList(newSortedList);
  }, [fullList, orderBy, orderDirection]);

  const handleSort = (orderField: OrderBy) => {
    if (orderBy === orderField) {
      setOrderDirection(orderDirection === "asc" ? "desc" : "asc");
      return;
    }
    setOrderBy(orderField);
    setOrderDirection("desc");
  };

  const handleSearchChange = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    setSearch(target.value);
  };

  return (
    <div className="overflow-x-auto bg-white border rounded shadow-md">
      <h3 className="px-8 py-4 font-semibold">{title}</h3>
      <div className="px-4 pb-2">
        <input
          type="text"
          className="w-full p-2 border rounded focus:outline-primary1"
          placeholder="Search by Asset/Collateral..."
          onChange={handleSearchChange}
        />
      </div>
      <table className="w-full pair-market-table">
        <thead>
          <MarketTableHead
            onSort={handleSort}
            orderBy={orderBy}
            orderDirection={orderDirection}
          />
        </thead>
        {loading ? (
          <tbody>
            <MarketTableRowLoading />
            <MarketTableRowLoading />
            <MarketTableRowLoading />
            <MarketTableRowLoading />
          </tbody>
        ) : (
          <tbody>
            {sortedList
              .filter((value) => {
                const token = tokenUtilService.pairSymbol(
                  value.pair.asset?.symbol,
                  value.pair.collateral?.symbol
                );
                if (token) {
                  return token.toLowerCase().indexOf(search.toLowerCase()) >= 0;
                }
                return false;
              })
              .map((data, index) => (
                <MarketTableRow key={`${data.id}`} data={data} index={index} />
              ))}
          </tbody>
        )}
      </table>
    </div>
  );
};
export default KashiPairFarmTable;
