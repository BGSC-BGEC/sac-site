import { Route, Routes } from "react-router-dom";

import ActivitiesPage from "@/pages/Activities/ActivitiesPage";
import ActivityDetailPage from "@/pages/Activities/ActivityDetailPage";
import AchievementsPage from "@/pages/AchievementsPage";
import ContactPage from "@/pages/ContactPage";
import DashboardPage from "@/pages/DashboardPage";
import EventsPage from "@/pages/Events/EventsPage";
import GalleryPage from "@/pages/Gallery/GalleryPage";
import HomePage from "@/pages/HomePage";
import PeoplePage from "@/pages/People/PeoplePage";
import StatsPage from "@/pages/Stats/StatsPage";
import SacStatsPage from "@/pages/Stats/SacStatsPage";
import ActivityGalleryPage from "@/pages/Gallery/ActivityGalleryPage";
import EventGalleryHubPage from "@/pages/Gallery/EventGalleryHubPage";
import EventGalleryPage from "@/pages/Gallery/EventGalleryPage";
import EventDetailPage from "@/pages/Events/EventDetailPage";
import InchargesPage from "@/pages/People/InchargesPage";
import CommitteePage from "@/pages/People/CommitteePage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/activities" element={<ActivitiesPage />} />
      <Route path="/activities/:slug" element={<ActivityDetailPage />} />
      <Route path="/stats" element={<StatsPage />} />
      <Route path="/stats/sac" element={<SacStatsPage />} />
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
      <Route
        path="/events/:slug"
        element={<EventDetailPage />}
      />
      <Route
        path="/people/incharges"
        element={<InchargesPage />}
      />
      <Route
        path="/people/committee"
        element={<CommitteePage />}
      />
    </Routes>
  );
};

export default AppRoutes;
