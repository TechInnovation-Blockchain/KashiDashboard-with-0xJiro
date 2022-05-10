/* eslint-disable @next/next/no-img-element */
import { BigNumber } from "ethers";
import Link from "next/link";
import numeral from "numeral";
import React, { useEffect, useState } from "react";
import { FaSortDown, FaSortUp } from "react-icons/fa";
import InfiniteScroll from "react-infinite-scroller";
import { useAppContext } from "../../../context/AppContext";
import { KashiPair } from "../../../types/KashiPair";

type OrderBy =
  | "asset"
  | "collateral"
  | "totalSupply"
  | "totalAsset"
  | "supplyAPY"
  | "totalBorrow"
  | "borrowAPY"
  | "";
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
    <div className="grid w-full grid-cols-10 px-8 py-2 text-sm text-slate-400">
      <div className="col-span-2">
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
      </div>
      <div
        className="col-span-2 text-right"
        onClick={() => {
          onSort("totalSupply");
        }}
      >
        <span className="cursor-pointer">
          Total Supply
          {orderBy === "totalSupply" && iconByDirection[orderDirection]}
        </span>
      </div>
      <div
        className="col-span-2 text-right"
        onClick={() => {
          onSort("totalAsset");
        }}
      >
        <span className="cursor-pointer">
          Total Available
          {orderBy === "totalAsset" && iconByDirection[orderDirection]}
        </span>
      </div>
      <div
        className="col-span-1 text-right"
        onClick={() => {
          onSort("supplyAPY");
        }}
      >
        <span className="cursor-pointer">
          Supply APY
          {orderBy === "supplyAPY" && iconByDirection[orderDirection]}
        </span>
      </div>
      <div
        className="col-span-2 text-right"
        onClick={() => {
          onSort("totalBorrow");
        }}
      >
        <span className="cursor-pointer">
          Total Borrow
          {orderBy === "totalBorrow" && iconByDirection[orderDirection]}
        </span>
      </div>
      <div
        className="col-span-1 text-right"
        onClick={() => {
          onSort("borrowAPY");
        }}
      >
        <span className="cursor-pointer">
          Borrow APY
          {orderBy === "borrowAPY" && iconByDirection[orderDirection]}
        </span>
      </div>
    </div>
  );
};

const MarketTableRowLoading = () => (
  <div className="grid items-center w-full grid-cols-10 px-8 py-3 border-t border-l-2 border-transparent cursor-pointer border-t-gray-200 hover:border-l-emerald-400">
    <div className="flex items-center col-span-2">
      <div>
        <div className="inline-block w-8 h-8 rounded-full loading"></div>
        <div className="inline-block w-8 h-8 -ml-2 rounded-full loading"></div>
      </div>
      <div className="ml-2">
        <div>
          <div className="inline-block w-24 h-5 rounded loading"></div>
        </div>
        <div>
          <div className="inline-block w-12 h-4 rounded loading"></div>
        </div>
      </div>
    </div>
    <div className="col-span-2 text-right">
      <div>
        <div className="inline-block w-32 h-5 rounded loading"></div>
      </div>
      <div>
        <div className="inline-block h-4 rounded loading w-28"></div>
      </div>
    </div>
    <div className="col-span-2 text-right">
      <div>
        <div className="inline-block w-32 h-5 rounded loading"></div>
      </div>
      <div>
        <div className="inline-block h-4 rounded loading w-28"></div>
      </div>
    </div>
    <div className="col-span-1 text-right">
      <div className="inline-block w-12 h-5 rounded loading"></div>
    </div>
    <div className="col-span-2 text-right">
      <div>
        <div className="inline-block w-32 h-5 rounded loading"></div>
      </div>
      <div>
        <div className="inline-block h-4 rounded loading w-28"></div>
      </div>
    </div>
    <div className="col-span-1 text-right">
      <div className="inline-block w-12 h-5 rounded loading"></div>
    </div>
  </div>
);

const MarketTableRow = ({
  data,
  index,
}: {
  data: KashiPair;
  index: number;
}) => {
  const { tokenUtilService, handleLogoError } = useAppContext();

  return (
    <Link href={`/pair/${data.id}`}>
      <a className="grid items-center w-full grid-cols-10 px-8 py-3 border-t border-l-2 border-transparent cursor-pointer border-t-gray-200 hover:border-l-emerald-400">
        <div className="flex items-center col-span-2">
          <div>
            <img
              src={tokenUtilService.logo(data.asset?.symbol)}
              width="30px"
              height="30px"
              className="inline-block rounded-full"
              onError={handleLogoError}
              alt={data?.symbol}
            />
            <img
              src={tokenUtilService.logo(data.collateral?.symbol)}
              width="30px"
              height="30px"
              onError={handleLogoError}
              className="inline-block -ml-2 rounded-full"
              alt={data?.symbol}
            />
          </div>
          <div className="ml-2">
            <div>
              {tokenUtilService.pairSymbol(
                data.asset?.symbol,
                data.collateral?.symbol
              )}
            </div>
          </div>
        </div>
        <div className="col-span-2 text-right">
          <div>
            {numeral(
              BigNumber.from(data?.totalAsset)
                .add(BigNumber.from(data.totalBorrow))
                .toNumber() / 100
            ).format("$0,.00")}
          </div>
          <div className="text-xs text-gray-400">
            {numeral(
              BigNumber.from(data?.totalAssetElastic)
                .add(BigNumber.from(data.totalBorrowElastic))
                .div(
                  BigNumber.from("10").pow(
                    Number(data.asset?.decimals || 0) - 2
                  )
                )
                .toNumber() / 100
            ).format("0,.00")}
            &nbsp;
            {data.asset?.symbol}
          </div>
        </div>
        <div className="col-span-2 text-right">
          <div>
            {numeral(BigNumber.from(data?.totalAsset).toNumber() / 100).format(
              "$0,.00"
            )}
          </div>
          <div className="text-xs text-gray-400">
            {numeral(
              BigNumber.from(data?.totalAssetElastic)
                .div(
                  BigNumber.from("10").pow(
                    Number(data.asset?.decimals || 0) - 2
                  )
                )
                .toNumber() / 100
            ).format("0,.00")}
            &nbsp;
            {data.asset?.symbol}
          </div>
        </div>
        <div className="col-span-1 text-right">
          {numeral(
            BigNumber.from(data?.supplyAPR)
              .div(BigNumber.from("1000000000000"))
              .toNumber() / 100000
          ).format("%0.00")}
        </div>
        <div className="col-span-2 text-right">
          <div>
            {numeral(BigNumber.from(data?.totalBorrow).toNumber() / 100).format(
              "$0,.00"
            )}
          </div>
          <div className="text-xs text-gray-400">
            {numeral(
              BigNumber.from(data?.totalBorrowElastic)
                .div(
                  BigNumber.from("10").pow(
                    Number(data.asset?.decimals || 0) - 2
                  )
                )
                .toNumber() / 100
            ).format("0,.00")}
            &nbsp;
            {data.asset?.symbol}
          </div>
        </div>
        <div className="col-span-1 text-right">
          {numeral(
            BigNumber.from(data?.borrowAPR)
              .div(BigNumber.from("1000000000000"))
              .toNumber() / 100000
          ).format("%0.00")}
        </div>
      </a>
    </Link>
  );
};

const PairMarketTable = ({
  title = "All Markets",
  loading = false,
  data = [],
}: {
  title: string;
  loading?: boolean;
  data: KashiPair[];
}) => {
  const [orderBy, setOrderBy] = useState<OrderBy>("");
  const [orderDirection, setOrderDirection] = useState<OrderDirection>("desc");

  const [fullList, setFullList] = useState<KashiPair[]>([]);
  const [sortedList, setSortedList] = useState<KashiPair[]>([]);
  const [list, setList] = useState<KashiPair[]>([]);
  const [isMore, setMore] = useState(false);

  useEffect(() => {
    setFullList(data);
  }, [data]);

  useEffect(() => {
    let newSortedList = [...fullList];
    const compareFuncs = {
      asset: {
        asc: (a: KashiPair, b: KashiPair) =>
          (a.asset?.symbol.toLowerCase() || "").localeCompare(
            b.asset?.symbol.toLowerCase() || ""
          ),
        desc: (a: KashiPair, b: KashiPair) =>
          (b.asset?.symbol.toLowerCase() || "").localeCompare(
            a.asset?.symbol.toLowerCase() || ""
          ),
      },
      collateral: {
        asc: (a: KashiPair, b: KashiPair) =>
          (a.collateral?.symbol.toLowerCase() || "").localeCompare(
            b.collateral?.symbol.toLowerCase() || ""
          ),
        desc: (a: KashiPair, b: KashiPair) =>
          (b.collateral?.symbol.toLowerCase() || "").localeCompare(
            a.collateral?.symbol.toLowerCase() || ""
          ),
      },
      totalSupply: {
        asc: (a: KashiPair, b: KashiPair) =>
          BigNumber.from(a.totalAsset)
            .add(BigNumber.from(a.totalBorrow))
            .lte(
              BigNumber.from(b.totalAsset).add(BigNumber.from(b.totalBorrow))
            )
            ? -1
            : 1,
        desc: (a: KashiPair, b: KashiPair) =>
          BigNumber.from(a.totalAsset)
            .add(BigNumber.from(a.totalBorrow))
            .gte(
              BigNumber.from(b.totalAsset).add(BigNumber.from(b.totalBorrow))
            )
            ? -1
            : 1,
      },
      totalAsset: {
        asc: (a: KashiPair, b: KashiPair) =>
          BigNumber.from(a.totalAsset).lte(BigNumber.from(b.totalAsset))
            ? -1
            : 1,
        desc: (a: KashiPair, b: KashiPair) =>
          BigNumber.from(a.totalAsset).gte(BigNumber.from(b.totalAsset))
            ? -1
            : 1,
      },
      totalBorrow: {
        asc: (a: KashiPair, b: KashiPair) =>
          BigNumber.from(a.totalBorrow).lte(BigNumber.from(b.totalBorrow))
            ? 1
            : -1,
        desc: (a: KashiPair, b: KashiPair) =>
          BigNumber.from(a.totalBorrow).gte(BigNumber.from(b.totalBorrow))
            ? -1
            : 1,
      },
      supplyAPY: {
        asc: (a: KashiPair, b: KashiPair) =>
          BigNumber.from(a.supplyAPR).lte(BigNumber.from(b.supplyAPR)) ? -1 : 1,
        desc: (a: KashiPair, b: KashiPair) =>
          BigNumber.from(a.supplyAPR).gte(BigNumber.from(b.supplyAPR)) ? -1 : 1,
      },
      borrowAPY: {
        asc: (a: KashiPair, b: KashiPair) =>
          BigNumber.from(a.borrowAPR).lte(BigNumber.from(b.borrowAPR)) ? -1 : 1,
        desc: (a: KashiPair, b: KashiPair) =>
          BigNumber.from(a.borrowAPR).gte(BigNumber.from(b.borrowAPR)) ? -1 : 1,
      },
    };

    if (orderBy) {
      newSortedList.sort(compareFuncs[orderBy][orderDirection]);
    }
    setSortedList(newSortedList);
  }, [fullList, orderBy, orderDirection]);

  useEffect(() => {
    setList([]);
  }, [sortedList]);

  const handleLoadMore = () => {
    if (isMore) return;
    setMore(true);
    if (list.length < sortedList.length) {
      const start = list.length;
      const end = Math.min(start + 20, sortedList.length);
      const newList = [...list, ...sortedList.slice(start, end)];
      setList(newList);
    }
    setMore(false);
  };

  const handleSort = (orderField: OrderBy) => {
    if (orderBy === orderField) {
      setOrderDirection(orderDirection === "asc" ? "desc" : "asc");
      return;
    }
    setOrderBy(orderField);
    setOrderDirection("desc");
  };

  return (
    <div className="bg-white border rounded shadow-md">
      <h3 className="px-8 py-4 font-semibold border-b">{title}</h3>
      <MarketTableHead
        onSort={handleSort}
        orderBy={orderBy}
        orderDirection={orderDirection}
      />
      {loading ? (
        <>
          <MarketTableRowLoading />
          <MarketTableRowLoading />
          <MarketTableRowLoading />
          <MarketTableRowLoading />
        </>
      ) : (
        <InfiniteScroll
          loadMore={handleLoadMore}
          hasMore={list.length < data.length}
          useWindow
          threshold={10}
        >
          {list.map((data, index) => (
            <MarketTableRow key={`${index}`} data={data} index={index} />
          ))}
        </InfiniteScroll>
      )}
    </div>
  );
};
export default PairMarketTable;
