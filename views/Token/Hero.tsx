/* eslint-disable @next/next/no-img-element */
import { useAppContext } from "../../context/AppContext";
import { KashiPair } from "../../types/KashiPair";

const Hero = ({ data }: { data?: KashiPair }) => {
  const { tokenUtilService } = useAppContext();
  const handleLogoError = (event: React.SyntheticEvent) => {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = "/icon-quiz.jpg";
  };

  return (
    <div className="bg-black">
      <div className="container px-4 mx-auto py-24">
        {!data ? (
          <div className="col-span-2 items-center flex">
            <div>
              <div className="inline-block loading-black h-8 w-8 rounded-full"></div>
              <div className="-ml-2 inline-block loading-black h-8 w-8 rounded-full"></div>
            </div>
            <div className="ml-2">
              <div>
                <div className="inline-block loading-black h-8 w-40 rounded"></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="col-span-2 items-center flex">
            <div>
              <img
                src={tokenUtilService.logo(data?.asset?.id)}
                width="30px"
                height="30px"
                className="inline-block rounded-full"
                onError={handleLogoError}
                alt={data?.symbol}
              />
              <img
                src={tokenUtilService.logo(data?.collateral?.id)}
                width="30px"
                height="30px"
                onError={handleLogoError}
                className="inline-block -ml-2 rounded-full"
                alt={data?.symbol}
              />
            </div>
            <div className="ml-2">
              <h2 className="text-white text-3xl font-medium">
                {tokenUtilService.pairSymbol(
                  data?.asset?.symbol,
                  data?.collateral?.symbol
                )}
              </h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
