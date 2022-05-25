import Head from "next/head";
import BaseLayout from "../Layouts/BaseLayout";
import Hero from "./Hero";

const Farm = () => {
  return (
    <>
      <Head>
        <title>Kashi Market - Farm</title>
      </Head>
      <BaseLayout>
        <Hero />
        <div className="h-96"></div>
        <div className="h-96"></div>
      </BaseLayout>
    </>
  );
};
export default Farm;
