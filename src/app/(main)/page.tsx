
import Banner from "@/_components/banners/Banner";
import BrandSection from "@/_components/sections/BrandSection";
import ContactSection from "@/_components/sections/ContactSection";
import FeatureSection from "@/_components/sections/FeatureSection";
import ListSection from "@/_components/sections/ListSection";
import Spacer from "@/_components/spacers/Spacer";
import { carByNumAction } from "../admin/_data/actions/CarActions";
import { brandAllAction } from "../admin/_data/actions/BrandActions";
import { appInfoViewAction } from "../admin/_data/actions/AppInfoActions";




export default async function Page() {
  const [carData, brandData, appData] = await Promise.all([
    carByNumAction(12),
    brandAllAction(),
    appInfoViewAction()
  ])

  return (
    <>
      <Banner />

      {/* <FeatureSection /> */}

      <ListSection dbData={carData} />

      <BrandSection dbData={brandData} />

      <Spacer />

      <ContactSection dbData={appData} />



    </>
  );
}
