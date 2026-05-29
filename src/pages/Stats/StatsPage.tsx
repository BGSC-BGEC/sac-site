import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const StatsPage = () => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Global Dropdown Control Hub
  const [globalMonth, setGlobalMonth] = useState('May');
  const [isGlobalMonthOpen, setIsGlobalMonthOpen] = useState(false);

  // 📊 CENTRAL DATA LAYER (Generates unique data configurations for each month selection)
  const getGlobalData = (month) => {
    const idx = months.indexOf(month) + 1 || 5; 
    const scale = 1 + (idx * 0.04) - ((idx % 3) * 0.05);
    
    return {
      activeStudents: Math.floor(1100 * scale),
      totalHours: Math.floor(10800 * scale),
      topActivity: idx % 2 === 0 ? 'Gym & Fitness' : 'Basketball',
      avgSessions: (2.8 * scale).toFixed(1),
      activitiesConducted: Math.floor(18 + (idx % 4) * 3),
      
      studentsChange: (10.2 + (idx % 3) * 1.1).toFixed(1),
      hoursChange: (7.1 + (idx % 2) * 0.8).toFixed(1),
      sessionsChange: (0.2 + (idx % 4) * 0.1).toFixed(1),
      
      bars: {
        basketball: Math.min(95, Math.floor(65 * scale)),
        swimming: Math.min(95, Math.floor(50 * scale)),
        gym: Math.min(95, Math.floor(55 * scale)),
        badminton: Math.min(95, Math.floor(35 * scale)),
        football: Math.min(95, Math.floor(30 * scale)),
        yoga: Math.min(95, Math.floor(20 * scale)),
        tt: Math.min(95, Math.floor(15 * scale)),
      },
      table: [
        { name: 'Basketball', part: Math.floor(110 * scale), sess: Math.floor(40 * scale), hrs: Math.floor(290 * scale), avg: (3.5 * scale).toFixed(1), color: 'bg-orange-400' },
        { name: 'Gym & Fitness', part: Math.floor(85 * scale), sess: Math.floor(55 * scale), hrs: Math.floor(410 * scale), avg: (4.2 * scale).toFixed(1), color: 'bg-emerald-400' },
        { name: 'Swimming', part: Math.floor(70 * scale), sess: Math.floor(32 * scale), hrs: Math.floor(250 * scale), avg: (3.0 * scale).toFixed(1), color: 'bg-blue-400' },
        { name: 'Football', part: Math.floor(60 * scale), sess: Math.floor(26 * scale), hrs: Math.floor(190 * scale), avg: (2.6 * scale).toFixed(1), color: 'bg-red-400' },
        { name: 'Badminton', part: Math.floor(45 * scale), sess: Math.floor(22 * scale), hrs: Math.floor(160 * scale), avg: (2.2 * scale).toFixed(1), color: 'bg-yellow-400' },
      ]
    };
  };

  const getDonutData = (month) => {
    const len = month.length;
    if (len % 3 === 0) return { sports: 50, fitness: 35, rec: 15, style: 'conic-gradient(#6366f1 0% 50%, #06b6d4 50% 85%, #2e3b5e 85% 100%)' };
    if (len % 3 === 1) return { sports: 62, fitness: 23, rec: 15, style: 'conic-gradient(#6366f1 0% 62%, #06b6d4 62% 85%, #2e3b5e 85% 100%)' };
    return { sports: 55, fitness: 30, rec: 15, style: 'conic-gradient(#6366f1 0% 55%, #06b6d4 55% 85%, #2e3b5e 85% 100%)' };
  };

  const getTrendData = (month) => {
    const len = month.length;
    // Calibrated SVG Paths (Y values strictly clustered above 0 baseline ensuring zero negative dips)
    if (len % 3 === 0) return { peak: '2.4K hrs', path: "M 0 28 Q 15 12 30 22 T 60 10 T 90 24 T 120 14", fill: "M 0 28 Q 15 12 30 22 T 60 10 T 90 24 T 120 14 L 120 40 L 0 40 Z" };
    if (len % 3 === 1) return { peak: '1.9K hrs', path: "M 0 20 Q 20 8 40 22 T 80 12 T 120 16", fill: "M 0 20 Q 20 8 40 22 T 80 12 T 120 16 L 120 40 L 0 40 Z" };
    return { peak: '2.1K hrs', path: "M 0 24 Q 15 16 30 12 T 60 20 T 90 14 T 120 18", fill: "M 0 24 Q 15 16 30 12 T 60 20 T 90 14 T 120 18 L 120 40 L 0 40 Z" };
  };

  // Sync data components to the master dropdown selection state
  const currentGlobal = getGlobalData(globalMonth);
  const currentDonut = getDonutData(globalMonth);
  const currentTrend = getTrendData(globalMonth);

  return (
    <div className="min-h-screen bg-[#060913] font-sans text-slate-100 p-6 md:p-8 selection:bg-purple-500/30">

      {/* HEADER SECTION */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Physical Activity Overview</h1>
          <p className="text-xs text-slate-400 mt-1">Campus-wide participation and engagement.</p>
        </div>
        
        <div className="flex items-center gap-3 self-start sm:self-auto">
          {/* Global Control Hub Month Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsGlobalMonthOpen(!isGlobalMonthOpen)}
              className="flex items-center gap-2 rounded-lg border border-slate-800 bg-[#0b1120]/80 px-4 py-2 text-xs font-semibold text-slate-300 hover:border-slate-700 hover:text-white transition-all shadow-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5 text-slate-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
              </svg>
              {globalMonth}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={`w-2.5 h-2.5 text-slate-400 transition-transform ${isGlobalMonthOpen ? 'rotate-180' : ''}`}><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
            </button>
            {isGlobalMonthOpen && (
              <div className="absolute right-0 mt-1.5 z-50 w-40 max-h-60 overflow-y-auto rounded-lg border border-slate-800 bg-[#0d1527] p-1 shadow-xl">
                {months.map((m) => (
                  <button key={m} onClick={() => { setGlobalMonth(m); setIsGlobalMonthOpen(false); }} className={`w-full text-left rounded px-2 py-1.5 text-xs ${globalMonth === m ? 'bg-purple-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}>{m}</button>
                ))}
              </div>
            )}
          </div>

          {/* Personal Stats Button Upgrade */}
          <Link to="/stats/personal" className="flex items-center gap-2 rounded-lg border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-xs font-semibold text-purple-400 hover:bg-purple-500/20 transition-all shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-3.5 h-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
            Personal Stats
          </Link>
        </div>
      </header>

      {/* CORE METRICS MATRIX */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <div className="rounded-xl border border-slate-800/70 bg-[#0b1120]/70 p-4 flex flex-col justify-between shadow-sm">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="text-2xl font-bold text-white tracking-tight">{currentGlobal.activeStudents.toLocaleString()}+</div>
              <p className="text-[11px] text-slate-400 font-medium">Active Students</p>
            </div>
            <div className="rounded-lg bg-purple-500/10 p-2 text-purple-400 border border-purple-500/10"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" /></svg></div>
          </div>
          <div className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1 mt-4">↑ {currentGlobal.studentsChange}% <span className="text-slate-500 font-normal">from last month</span></div>
        </div>

        <div className="rounded-xl border border-slate-800/70 bg-[#0b1120]/70 p-4 flex flex-col justify-between shadow-sm">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="text-2xl font-bold text-white tracking-tight">{currentGlobal.totalHours.toLocaleString()}+</div>
              <p className="text-[11px] text-slate-400 font-medium">Total Hours Logged</p>
            </div>
            <div className="rounded-lg bg-blue-500/10 p-2 text-blue-400 border border-blue-500/10"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg></div>
          </div>
          <div className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1 mt-4">↑ {currentGlobal.hoursChange}% <span className="text-slate-500 font-normal">from last month</span></div>
        </div>

        <div className="rounded-xl border border-slate-800/70 bg-[#0b1120]/70 p-4 flex flex-col justify-between shadow-sm">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="text-base font-bold text-white tracking-tight pt-1 truncate max-w-[120px]">{currentGlobal.topActivity}</div>
              <p className="text-[11px] text-slate-400 font-medium">Top Activity</p>
            </div>
            <div className="rounded-lg bg-orange-500/10 p-2 text-orange-400 border border-orange-500/10"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047m9.324-1.833A8.25 8.25 0 0 0 6.038 7.047m9.324-1.833A8.219 8.219 0 0 0 12 4.5c-1.12 0-2.186.224-3.158.63m10.158 5.62c-1.12 0-2.186.224-3.158.63m3.158 5.62c-1.12 0-2.186.224-3.158.63M6.038 7.047A8.22 8.22 0 0 0 4.5 12c0 1.12.224 2.186.63 3.158m0-6.316c1.12 0 2.186.224 3.158.63m-3.158 5.684c1.12 0 2.186.224 3.158.63M3.75 12h16.5M12 3.75v16.5" /></svg></div>
          </div>
          <div className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1 mt-4">↑ Most participated</div>
        </div>

        <div className="rounded-xl border border-slate-800/70 bg-[#0b1120]/70 p-4 flex flex-col justify-between shadow-sm">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="text-2xl font-bold text-white tracking-tight">{currentGlobal.avgSessions}</div>
              <p className="text-[11px] text-slate-400 font-medium">Avg. Sessions / Week</p>
            </div>
            <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-400 border border-emerald-500/10"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg></div>
          </div>
          <div className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1 mt-4">↑ {currentGlobal.sessionsChange} <span className="text-slate-500 font-normal">from last month</span></div>
        </div>

        <div className="rounded-xl border border-slate-800/70 bg-[#0b1120]/70 p-4 flex flex-col justify-between shadow-sm">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="text-2xl font-bold text-white tracking-tight">{currentGlobal.activitiesConducted}</div>
              <p className="text-[11px] text-slate-400 font-medium">Activities Conducted</p>
            </div>
            <div className="rounded-lg bg-yellow-500/10 p-2 text-yellow-400 border border-yellow-500/10"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499c.151-.316.604-.316.755 0l2.207 4.542 4.904.271c.348.019.488.448.225.683l-3.56 3.145.969 4.844c.06.297-.26.53-.532.368l-4.234-2.408-4.234 2.408c-.272.162-.591-.071-.532-.368l.969-4.844-3.56-3.145c-.263-.235-.124-.664.225-.683l4.904-.271 2.207-4.542Z" /></svg></div>
          </div>
          <div className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1 mt-4">↑ Active Scale</div>
        </div>
      </section>

      {/* GRAPHICAL CHARTS MATRIX */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        {/* CHART 1: Participation by Activity */}
        <div className="rounded-xl border border-slate-800/60 bg-[#0b1120]/50 p-5 flex flex-col justify-between min-h-[340px]">
          <div className="mb-6">
            <h3 className="text-xs font-bold text-slate-200 tracking-wide uppercase">Participation by Activity</h3>
          </div>

          <div className="flex h-48 items-end gap-3 text-[9px] text-slate-500 font-medium px-2">
            <div className="flex flex-col justify-between h-full text-right pr-1 select-none text-[8px]">
              <span>1,500</span><span>1,000</span><span>500</span><span>0</span>
            </div>
            
            <div className="flex-1 grid grid-cols-7 gap-x-3 items-end h-full relative border-l border-b border-slate-800/60 pb-1">
              <div className="flex flex-col items-center h-full justify-end gap-1">
                <div className="w-3 sm:w-4 bg-gradient-to-t from-purple-600 to-indigo-500 rounded-t-sm transition-all duration-500" style={{ height: `${currentGlobal.bars.basketball}%` }}></div>
                <span className="text-[8px] tracking-tight truncate max-w-[36px]">Basketb.</span>
              </div>
              <div className="flex flex-col items-center h-full justify-end gap-1">
                <div className="w-3 sm:w-4 bg-gradient-to-t from-purple-600 to-indigo-500 rounded-t-sm transition-all duration-500" style={{ height: `${currentGlobal.bars.swimming}%` }}></div>
                <span className="text-[8px] tracking-tight truncate max-w-[36px]">Swimm.</span>
              </div>
              <div className="flex flex-col items-center h-full justify-end gap-1">
                <div className="w-3 sm:w-4 bg-gradient-to-t from-purple-600 to-indigo-500 rounded-t-sm transition-all duration-500" style={{ height: `${currentGlobal.bars.gym}%` }}></div>
                <span className="text-[8px] tracking-tight truncate max-w-[36px]">Gym</span>
              </div>
              <div className="flex flex-col items-center h-full justify-end gap-1">
                <div className="w-3 sm:w-4 bg-gradient-to-t from-purple-600 to-indigo-500 rounded-t-sm transition-all duration-500" style={{ height: `${currentGlobal.bars.badminton}%` }}></div>
                <span className="text-[8px] tracking-tight truncate max-w-[36px]">Badmit.</span>
              </div>
              <div className="flex flex-col items-center h-full justify-end gap-1">
                <div className="w-3 sm:w-4 bg-gradient-to-t from-purple-600 to-indigo-500 rounded-t-sm transition-all duration-500" style={{ height: `${currentGlobal.bars.football}%` }}></div>
                <span className="text-[8px] tracking-tight truncate max-w-[36px]">Football</span>
              </div>
              <div className="flex flex-col items-center h-full justify-end gap-1">
                <div className="w-3 sm:w-4 bg-gradient-to-t from-purple-600 to-indigo-500 rounded-t-sm transition-all duration-500" style={{ height: `${currentGlobal.bars.yoga}%` }}></div>
                <span className="text-[8px] tracking-tight truncate max-w-[36px]">Yoga</span>
              </div>
              <div className="flex flex-col items-center h-full justify-end gap-1">
                <div className="w-3 sm:w-4 bg-gradient-to-t from-purple-600 to-indigo-500 rounded-t-sm transition-all duration-500" style={{ height: `${currentGlobal.bars.tt}%` }}></div>
                <span className="text-[8px] tracking-tight truncate max-w-[36px]">TT</span>
              </div>
            </div>
          </div>
        </div>

        {/* CHART 2: Participation by Category */}
        <div className="rounded-xl border border-slate-800/60 bg-[#0b1120]/50 p-5 flex flex-col justify-between min-h-[340px]">
          <div className="mb-4">
            <h3 className="text-xs font-bold text-slate-200 tracking-wide uppercase">Participation by Category</h3>
          </div>

          <div className="flex items-center justify-around gap-2 h-44">
            <div className="relative h-28 w-28 rounded-full flex items-center justify-center transition-all duration-500 shadow-lg" style={{ background: currentDonut.style }}>
              <div className="h-[72%] w-[72%] rounded-full bg-[#070b14]"></div>
            </div>
            
            <div className="space-y-3.5 text-xs font-medium">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-indigo-500"></span>
                <span className="text-slate-400 min-w-[64px]">Sports</span>
                <span className="text-white font-bold text-right">{currentDonut.sports}%</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-cyan-400"></span>
                <span className="text-slate-400 min-w-[64px]">Fitness</span>
                <span className="text-white font-bold text-right">{currentDonut.fitness}%</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-[#2e3b5e]"></span>
                <span className="text-slate-400 min-w-[64px]">Recreation</span>
                <span className="text-white font-bold text-right">{currentDonut.rec}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* CHART 3: Activity Trend */}
        <div className="rounded-xl border border-slate-800/60 bg-[#0b1120]/50 p-5 flex flex-col justify-between min-h-[340px]">
          <div className="mb-6">
            <h3 className="text-xs font-bold text-slate-200 tracking-wide uppercase">Activity Trend</h3>
          </div>

          <div className="flex flex-col justify-between h-44">
            <div className="flex-1 relative border-l border-b border-slate-800/60 text-[8px] text-slate-600 select-none">
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                <div className="border-t border-slate-800/30 w-full h-0"></div>
                <div className="border-t border-slate-800/30 w-full h-0"></div>
                <div className="border-t border-slate-800/30 w-full h-0"></div>
              </div>
              
              <svg viewBox="0 0 120 40" className="absolute inset-0 w-full h-[92%] overflow-visible" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="gradient-area" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3"/>
                    <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0"/>
                  </linearGradient>
                </defs>
                <path d={currentTrend.fill} fill="url(#gradient-area)" className="transition-all duration-500" />
                <path d={currentTrend.path} fill="none" stroke="#6366f1" strokeWidth="1" strokeLinecap="round" className="transition-all duration-500" />
              </svg>

              <div className="absolute right-2 top-2 text-right">
                <span className="text-[8px] font-bold text-slate-500 block">Peak Capacity</span>
                <span className="text-[11px] font-black text-indigo-400 transition-all duration-500">{currentTrend.peak}</span>
              </div>
            </div>
            
            <div className="flex justify-between text-[8px] text-slate-500 font-medium pt-1.5 px-0.5 uppercase">
              <span>Jan</span><span>Mar</span><span>May</span><span>Jul</span><span>Sep</span><span>Nov</span><span>Dec</span>
            </div>
          </div>
        </div>

      </section>

      {/* DETAILED LOG DATA & INSIGHTS SEGMENT */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Top Activities Data Matrix */}
        <div className="lg:col-span-7 rounded-xl border border-slate-800/60 bg-[#0b1120]/40 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-200 tracking-wide uppercase">Top Activities</h3>
            <button className="text-[10px] font-bold text-indigo-400 hover:text-indigo-300 tracking-tight">View All</button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-medium border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-500 text-[10px] uppercase tracking-wider">
                  <th className="pb-3 pl-1 font-semibold">#</th>
                  <th className="pb-3 font-semibold">Activity</th>
                  <th className="pb-3 text-right font-semibold">Participants</th>
                  <th className="pb-3 text-right font-semibold">Sessions</th>
                  <th className="pb-3 text-right font-semibold">Hours Logged</th>
                  <th className="pb-3 text-right pr-1 font-semibold">Avg. Session / Wk</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40 text-slate-300">
                {currentGlobal.table.map((row, index) => (
                  <tr key={row.name} className="hover:bg-slate-800/20 transition-colors">
                    <td className="py-3.5 pl-1 text-slate-500 text-[11px]">{index + 1}</td>
                    <td className="py-3.5 font-bold text-white flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${row.color}`}></span> {row.name}
                    </td>
                    <td className="py-3.5 text-right font-semibold">{row.part}</td>
                    <td className="py-3.5 text-right">{row.sess}</td>
                    <td className="py-3.5 text-right text-slate-400">{row.hrs}+</td>
                    <td className="py-3.5 text-right pr-1 text-indigo-400 font-bold">{row.avg}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Engagement Insights System */}
        <div className="lg:col-span-5 rounded-xl border border-slate-800/60 bg-[#0b1120]/40 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-200 tracking-wide uppercase">Engagement Insights</h3>
            <button className="text-[10px] font-bold text-indigo-400 hover:text-indigo-300 tracking-tight">View All</button>
          </div>

          <div className="space-y-3">
            <div className="flex items-start justify-between gap-4 border border-slate-800/50 rounded-xl p-3.5 bg-[#0e172a]/40">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-purple-500/10 p-2 text-purple-400 border border-purple-500/10 shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94-3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" /></svg>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">High Participation Growth</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">Active student participation increased by {currentGlobal.studentsChange}% this month.</p>
                </div>
              </div>
              <span className="text-[11px] font-bold text-emerald-400 shrink-0">↑ {currentGlobal.studentsChange}%</span>
            </div>

            <div className="flex items-start justify-between gap-4 border border-slate-800/50 rounded-xl p-3.5 bg-[#0e172a]/40">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-blue-500/10 p-2 text-blue-400 border border-blue-500/10 shrink-0"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg></div>
                <div>
                  <h4 className="text-xs font-bold text-white">More Hours Logged</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">Total hours logged increased by {currentGlobal.hoursChange}% compared to last period.</p>
                </div>
              </div>
              <span className="text-[11px] font-bold text-emerald-400 shrink-0">↑ {currentGlobal.hoursChange}%</span>
            </div>

            <div className="flex items-start justify-between gap-4 border border-slate-800/50 rounded-xl p-3.5 bg-[#0e172a]/40">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-400 border border-emerald-500/10 shrink-0"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg></div>
                <div>
                  <h4 className="text-xs font-bold text-white">Consistent Engagement</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">Average sessions per week improved by {currentGlobal.sessionsChange} this month.</p>
                </div>
              </div>
              <span className="text-[11px] font-bold text-emerald-400 shrink-0">↑ {currentGlobal.sessionsChange}</span>
            </div>
          </div>
        </div>

      </section>

    </div>
  );
};

export default StatsPage;