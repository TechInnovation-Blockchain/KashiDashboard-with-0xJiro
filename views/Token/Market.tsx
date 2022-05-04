import PairCard from "../../components/module/Cards/PairCard";
import TokenCard from "../../components/module/Cards/TokenCard";
import PairCollateralPieChart from "../../components/module/Charts/PairCollateralPieChart";
import PairInterestPerSecondDayDataChart from "../../components/module/Charts/PairInteresetPerSecondDayDataChart";
import PairSupplyBorrowDayDataChart from "../../components/module/Charts/PairSupplyBorrowDayDataChart";
import PairUtilizationDayDataChart from "../../components/module/Charts/PairUtilizationDayDataChart";
import { KashiPair } from "../../types/KashiPair";
import { KashiPairDayDataMap } from "../../types/KashiPairDayData";
import { Token } from "../../types/Token";

const Market = ({
  token,
  totalAsset = BigInt(0),
  totalBorrow = BigInt(0),
  kashiPairs,
  kashiPairDayData,
}: {
  token?: Token;
  totalAsset?: BigInt;
  totalBorrow?: BigInt;
  kashiPairs?: KashiPair[];
  kashiPairDayData?: KashiPairDayDataMap[];
}) => {
  return (
    <>
      <div className="container mx-auto -mt-16 px-4 mb-16">
        <TokenCard
          data={token}
          totalAsset={totalAsset}
          totalBorrow={totalBorrow}
          containerClass="mb-4"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <PairCollateralPieChart
            title="Supply"
            type={"supply"}
            data={kashiPairs}
          />
          <PairCollateralPieChart
            title="Asset"
            type={"asset"}
            data={kashiPairs}
          />
          <PairCollateralPieChart
            title="Borrow"
            type={"borrow"}
            data={kashiPairs}
          />
        </div>
      </div>
    </>
  );
};

export default Market;
