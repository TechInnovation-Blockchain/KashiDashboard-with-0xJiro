import TokenMarketTable from "../../components/module/Tables/TokenMarketTable";
import { KashiPairsByToken } from "../../types/KashiPair";

const Market = ({
  loading,
  data,
}: {
  loading: boolean;
  data: KashiPairsByToken[];
}) => {
  return (
    <>
      <div className="max-w-6xl px-4 mx-auto mb-24 -mt-14">
        <TokenMarketTable title={"All Markets"} loading={loading} data={data} />
      </div>
    </>
  );
};

export default Market;
