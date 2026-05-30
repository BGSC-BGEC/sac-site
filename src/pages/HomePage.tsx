import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#060913] font-sans antialiased text-slate-100">
      
      {/* 1. HERO SECTION */}
      <section 
        style={{
          backgroundImage: `linear-gradient(to right, rgba(6, 9, 19, 0.9) 40%, rgba(6, 9, 19, 0.4)), url('../1-78.jpg.png')`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center', 
          backgroundRepeat: 'no-repeat'
        }} 
        className="w-full min-h-[65vh] flex flex-col justify-center px-8 md:px-16 lg:px-24 border-b border-slate-800/40"
      >
        <div className="max-w-2xl space-y-4">
          <p className="text-xs font-bold tracking-widest text-cyan-400 uppercase">
            BITS Pilani Goa Campus
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl leading-tight">
            Sports Activities Centre
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed max-w-lg">
            Discover sports facilities, campus events, achievements,
            fitness initiatives, and the SAC community — all in one place.
          </p>
        </div>
      </section>

      {/* 2. NEW TO CAMPUS SECTION */}
      <section className="mx-auto max-w-7xl px-4 pt-8 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-slate-800/80 bg-[#0d1527]/40 backdrop-blur-sm p-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
            <h2 className="text-xs font-black tracking-wider text-cyan-400 uppercase whitespace-nowrap">
              New to Campus?
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Welcome to BITS Pilani Goa Campus! Explore our sports facilities,
              join campus events, and connect with the SAC community to make the
              most of your time here.
            </p>
          </div>
          <button className="flex items-center gap-1.5 text-xs font-semibold text-white hover:text-cyan-400 transition-colors whitespace-nowrap border border-slate-700/60 rounded-lg px-4 py-1.5 bg-slate-900/30 self-start sm:self-auto">
            Explore Now 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
          </button>
        </div>
      </section>

      {/* 3. DASHBOARD CONTENT GRID (EXPLORE ACTIVITIES & UPCOMING EVENTS) */}
      <section className="mx-auto max-w-7xl px-4 py-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: EXPLORE ACTIVITIES (Spans 2 columns on desktop screens) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white tracking-tight">Explore Activities</h3>
            <Link to="/activities" className="text-[11px] font-medium text-slate-400 hover:text-white border border-slate-800 rounded-lg px-3 py-1 bg-[#0b1120]/50 transition-colors">
              View All
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Card 1: Basketball */}
            <div className="overflow-hidden rounded-xl border border-slate-800/70 bg-[#0b1120]/80 shadow-md">
              <div className="relative aspect-[16/10] w-full bg-slate-900 flex items-center justify-center border-b border-slate-800/50">
                {/* ⬇️ CHANGE THE SRC ATTRIBUTE BELOW TO YOUR LOCAL BASKETBALL IMAGE PATH ⬇️ */}
                <img src="../7-40.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
                
              </div>
              <div className="p-4 space-y-2">
                <span className="inline-block rounded bg-purple-500/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-purple-400">
                  Recreation
                </span>
                <h4 className="text-sm font-bold text-white">Snooker</h4>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 pt-1">
                  <span className="font-medium">Everyday</span>
                  <span className="text-slate-600">•</span>
                  <span>10:00 AM - 9:00 PM</span>
                </div>
              </div>
            </div>

            {/* Card 3: Gym & Fitness */}
            <div className="overflow-hidden rounded-xl border border-slate-800/70 bg-[#0b1120]/80 shadow-md">
              <div className="relative aspect-[16/10] w-full bg-slate-900 flex items-center justify-center border-b border-slate-800/50">
                {/* ⬇️ CHANGE THE SRC ATTRIBUTE BELOW TO YOUR LOCAL GYM IMAGE PATH ⬇️ */}
                <img src="../2-70.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
                
              </div>
              <div className="p-4 space-y-2">
                <span className="inline-block rounded bg-emerald-500/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-400">
                  Sports
                </span>
                <h4 className="text-sm font-bold text-white">Badminton</h4>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 pt-1">
                  <span className="font-medium">Everyday</span>
                  <span className="text-slate-600">•</span>
                  <span>10:00 AM - 9:00 PM</span>
                </div>
              </div>
            </div>

            {/* Card 4: Table Tennis */}
            <div className="overflow-hidden rounded-xl border border-slate-800/70 bg-[#0b1120]/80 shadow-md">
              <div className="relative aspect-[16/10] w-full bg-slate-900 flex items-center justify-center border-b border-slate-800/50">
                {/* ⬇️ CHANGE THE SRC ATTRIBUTE BELOW TO YOUR LOCAL TABLE TENNIS IMAGE PATH ⬇️ */}
                <img src="../download.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
            
              </div>
              <div className="p-4 space-y-2">
                <span className="inline-block rounded bg-purple-500/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-purple-400">
                  Recreation
                </span>
                <h4 className="text-sm font-bold text-white">Table Tennis</h4>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 pt-1">
                  <span className="font-medium">Mon - Fri</span>
                  <span className="text-slate-600">•</span>
                  <span>4:00 PM - 6:00 PM</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: UPCOMING EVENTS (Spans 1 column on desktop screens) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white tracking-tight">Upcoming Events</h3>
            <Link to="/events" className="text-[11px] font-medium text-slate-400 hover:text-white border border-slate-800 rounded-lg px-3 py-1 bg-[#0b1120]/50 transition-colors">
              View All
            </Link>
          </div>

          <div className="space-y-3">
            
            {/* Event Item 1 */}
            <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-800/70 bg-[#0b1120]/80 p-3.5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-center justify-center rounded-lg bg-[#141d30] border border-slate-800 h-12 w-12 text-center shrink-0">
                  <span className="text-base font-bold text-white leading-none">24</span>
                  <span className="text-[9px] uppercase text-cyan-400 font-extrabold tracking-wider mt-1">May</span>
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white line-clamp-1">SAC Annual Sports Meet</h5>
                  <p className="text-[10px] text-slate-400 mt-0.5">24 May 2025 • 8:00 AM • SAC Grounds</p>
                </div>
              </div>
              <span className="rounded bg-purple-500/10 px-2 py-0.5 text-[9px] font-bold tracking-wide text-purple-400 uppercase shrink-0">
                Meet
              </span>
            </div>

            {/* Event Item 2 */}
            <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-800/70 bg-[#0b1120]/80 p-3.5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-center justify-center rounded-lg bg-[#141d30] border border-slate-800 h-12 w-12 text-center shrink-0">
                  <span className="text-base font-bold text-white leading-none">07</span>
                  <span className="text-[9px] uppercase text-cyan-400 font-extrabold tracking-wider mt-1">Jun</span>
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white line-clamp-1">Inter-Hostel Basketball Tournament</h5>
                  <p className="text-[10px] text-slate-400 mt-0.5">07 Jun 2025 • 4:00 PM • Basketball Court</p>
                </div>
              </div>
              <span className="rounded bg-orange-500/10 px-2 py-0.5 text-[9px] font-bold tracking-wide text-orange-400 uppercase shrink-0">
                Tournament
              </span>
            </div>

            {/* Event Item 3 */}
            <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-800/70 bg-[#0b1120]/80 p-3.5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-center justify-center rounded-lg bg-[#141d30] border border-slate-800 h-12 w-12 text-center shrink-0">
                  <span className="text-base font-bold text-white leading-none">21</span>
                  <span className="text-[9px] uppercase text-cyan-400 font-extrabold tracking-wider mt-1">Jun</span>
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white line-clamp-1">Yoga & Wellness Workshop</h5>
                  <p className="text-[10px] text-slate-400 mt-0.5">21 Jun 2025 • 7:30 AM • Activity Room</p>
                </div>
              </div>
              <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[9px] font-bold tracking-wide text-emerald-400 uppercase shrink-0">
                Workshop
              </span>
            </div>

          </div>
        </div>

      </section>

    </div>
  );
};

export default HomePage;