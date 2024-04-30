import PagesLayout from "@/layout/PagesLayout";
import dynamic from "next/dynamic";

const CareerPage = () => {
  const BackgroundSection = dynamic(() => import("@/sections/home/background"));
  const WorksSection = dynamic(() => import("@/sections/career/works"));
  const CareerSection = dynamic(() => import("@/sections/career/career"));

  return (
    <PagesLayout>
      <BackgroundSection page />

      <CareerSection />

      <WorksSection />
    </PagesLayout>
  );
};

export default CareerPage;
