import { Route, Routes } from "react-router-dom";

import ActivitiesPage from "@/pages/Activities/ActivitiesPage";
import ActivityDetailPage from "@/pages/Activities/ActivityDetailPage";
import AchievementsPage from "@/pages/AchievementsPage";
import ContactPage from "@/pages/ContactPage";
import EventsPage from "@/pages/EventsPage";
import GalleryPage from "@/pages/GalleryPage";
import HomePage from "@/pages/HomePage";
import PeoplePage from "@/pages/PeoplePage";
import StatsPage from "@/pages/StatsPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/activities" element={<ActivitiesPage />} />
      <Route path="/activities/:slug" element={<ActivityDetailPage />} />
      <Route path="/stats" element={<StatsPage />} />
      <Route path="/gallery" element={<GalleryPage />} />
      <Route path="/events" element={<EventsPage />} />
      <Route path="/people" element={<PeoplePage />} />
      <Route path="/achievements" element={<AchievementsPage />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  );
};

export default AppRoutes;