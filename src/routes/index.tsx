import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import HomePage from "@/pages/HomePage";
import ActivitiesPage from "@/pages/Activities/ActivitiesPage";
import ActivityDetailPage from "@/pages/Activities/ActivityDetailPage";
import GalleryPage from "@/pages/Gallery/GalleryPage";
import EventGalleryHubPage from "@/pages/Gallery/EventGalleryHubPage";
import GalleryDetailPage from "@/pages/Gallery/GalleryDetailPage";
import EventsPage from "@/pages/Events/EventsPage";
import EventDetailPage from "@/pages/Events/EventDetailPage";
import PeoplePage from "@/pages/People/PeoplePage";
import AchievementsPage from "@/pages/AchievementsPage";
import ContactPage from "@/pages/ContactPage";
import NotFoundPage from "@/pages/NotFoundPage";

// Lazy-loaded: sole owner of recharts (~105 kB gz). Never in the initial bundle.
const StatsPage = lazy(() => import("@/pages/Stats/StatsPage"));

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/activities" element={<ActivitiesPage />} />
    <Route path="/activities/:slug" element={<ActivityDetailPage />} />
    <Route path="/stats" element={<Suspense fallback={null}><StatsPage /></Suspense>} />
    <Route path="/gallery" element={<GalleryPage />} />
    <Route path="/gallery/events" element={<EventGalleryHubPage />} />
    <Route path="/gallery/events/:slug" element={<GalleryDetailPage kind="event" />} />
    <Route path="/gallery/:slug" element={<GalleryDetailPage kind="activity" />} />
    <Route path="/events" element={<EventsPage />} />
    <Route path="/events/:slug" element={<EventDetailPage />} />
    <Route path="/people" element={<PeoplePage />} />
    {/* R38: both legacy paths redirect to /people with replace so the back button isn't trapped. */}
    <Route path="/people/incharges" element={<Navigate to="/people" replace />} />
    <Route path="/people/committee" element={<Navigate to="/people" replace />} />
    <Route path="/achievements" element={<AchievementsPage />} />
    <Route path="/contact" element={<ContactPage />} />
    {/* FAB's dead /report link — belt-and-braces redirect. */}
    <Route path="/report" element={<Navigate to="/contact" replace />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default AppRoutes;

