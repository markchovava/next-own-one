
import Banner from "@/_components/banners/Banner";
import BrandSection from "@/_components/sections/BrandSection";
import ContactSection from "@/_components/sections/ContactSection";
import FeatureSection from "@/_components/sections/FeatureSection";
import ListSection from "@/_components/sections/ListSection";
import Spacer from "@/_components/spacers/Spacer";




export default function Home() {
  return (
    <>
      <Banner />

      <FeatureSection />

      <ListSection />

      <BrandSection />

      <Spacer />

      <ContactSection />



    </>
  );
}
