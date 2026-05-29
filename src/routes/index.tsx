import { Route, Routes } from "react-router-dom";

import ActivitiesPage from "@/pages/Activities/ActivitiesPage";
import ActivityDetailPage from "@/pages/Activities/ActivityDetailPage";
import AchievementsPage from "@/pages/AchievementsPage";
import ContactPage from "@/pages/ContactPage";
import EventsPage from "@/pages/EventsPage";
import GalleryPage from "@/pages/Gallery/GalleryPage";
import HomePage from "@/pages/HomePage";
import PeoplePage from "@/pages/PeoplePage";
import StatsPage from "@/pages/StatsPage";
import ActivityGalleryPage from "@/pages/Gallery/ActivityGalleryPage";
import EventGalleryHubPage from "@/pages/Gallery/EventGalleryHubPage";
import EventGalleryPage from "@/pages/Gallery/EventGalleryPage";

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
      <Route
        path="/gallery/:slug"
        element={<ActivityGalleryPage />}
      />
      <Route
        path="/gallery/events"
        element={<EventGalleryHubPage />}
      />
      <Route
        path="/gallery/events/:slug"
        element={<EventGalleryPage />}
      />
    </Routes>
  );
};

export default AppRoutes;