// src/pages/HomePage.tsx
// Slice 7: hero + pulse strip only. Other homepage bands compose back in
// during slices 8 (activities), 9 (events), A (focus), B (impact),
// C (gallery), D (people/wins/join).
import Hero from "@/components/sections/Hero";
import LivePulseStrip from "@/components/sections/LivePulseStrip";
import ActivitiesRail from "@/components/sections/ActivitiesRail";
import FeaturedEvent from "@/components/sections/FeaturedEvent";
import FocusScene from "@/components/sections/FocusScene";
import ImpactScene from "@/components/sections/ImpactScene";
import GalleryReel from "@/components/sections/GalleryReel";
import PeoplePreview from "@/components/sections/PeoplePreview";
import AchievementsBoard from "@/components/sections/AchievementsBoard";
import JoinCta from "@/components/sections/JoinCta";

function HomePage() {
  return (
    <>
      <Hero />
      <LivePulseStrip />
      <FocusScene />
      <ActivitiesRail />
      <FeaturedEvent />
      <PeoplePreview />
      <ImpactScene />
      <GalleryReel />
      <AchievementsBoard />
      <JoinCta />
    </>
  );
}

export default HomePage;

