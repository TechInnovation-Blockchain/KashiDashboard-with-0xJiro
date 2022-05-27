import KashiPairFarmTable from "../../components/module/Tables/KashiPairFarmTable";

const Market = ({ loading, data }: { loading: boolean; data: any[] }) => {
  return (
    <>
      <div className="mt-12 mb-24 max-w-6xl mx-auto px-4">
        <KashiPairFarmTable
          title={"All Markets"}
          loading={loading}
          data={data}
        />
      </div>
    </>
  );
};

export default Market;
