import React, { useState } from 'react';

const PersonalStatsPage = () => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Global Dropdown Control Hub for Personal Metrics
  const [selectedMonth, setSelectedMonth] = useState('May');
  const [isMonthOpen, setIsMonthOpen] = useState(false);

  // 📊 CENTRAL PERSONAL DATA ENGINE (Ensures completely synchronized logic across all components)
  const getPersonalData = (month) => {
    const idx = months.indexOf(month) + 1 || 5;
    // Creates a unique variance scale depending on the month chosen
    const scale = 1 + (idx * 0.06) - ((idx % 4) * 0.08);
    
    // Seed and generate custom raw hours per activity for you
    const baseActivities = [
      { name: 'Gym & Fitness', hours: Math.max(2, Math.floor(10 * scale)), type: 'fitness', color: 'from-cyan-500 to-blue-500' },
      { name: 'Badminton', hours: Math.max(1, Math.floor(7 * scale - (idx % 2))), type: 'sports', color: 'from-purple-500 to-indigo-500' },
      { name: 'Basketball', hours: Math.max(0, Math.floor(6 * scale - (idx % 3))), type: 'sports', color: 'from-orange-500 to-amber-500' },
      { name: 'Swimming', hours: Math.max(1, Math.floor(5 * scale + (idx % 2))), type: 'rec', color: 'from-emerald-500 to-teal-500' },
      { name: 'Yoga', hours: Math.max(0, Math.floor(4 * scale - (idx % 4))), type: 'fitness', color: 'from-pink-500 to-rose-500' },
    ];

    // Filter out any activity that wasn't performed (0 hours) for that month
    const activeActivities = baseActivities.filter(act => act.hours > 0);
    
    // Sort descending by hours to establish ranking hierarchy
    activeActivities.sort((a, b) => b.hours - a.hours);
    
    // Compute exact responsive aggregates
    const totalHours = activeActivities.reduce((sum, act) => sum + act.hours, 0);
    const weeklyAverage = (totalHours / 4.3).toFixed(1);
    const topActivity = activeActivities[0]?.name || 'None';

    // Group calculations to feed the Category Donut circle graph
    let sportsHours = 0, fitnessHours = 0, recHours = 0;
    activeActivities.forEach(act => {
      if (act.type === 'sports') sportsHours += act.hours;
      if (act.type === 'fitness') fitnessHours += act.hours;
      if (act.type === 'rec') recHours += act.hours;
    });

    const sumCat = sportsHours + fitnessHours + recHours || 1;
    const sportsPct = Math.round((sportsHours / sumCat) * 100);
    const fitnessPct = Math.round((fitnessHours / sumCat) * 100);
    const recPct = 100 - sportsPct - fitnessPct;

    const conicGradient = `conic-gradient(#6366f1 0% ${sportsPct}%, #06b6d4 ${sportsPct}% ${sportsPct + fitnessPct}%, #2e3b5e ${sportsPct + fitnessPct}% 100%)`;

    // Max hours in current month dataset to calibrate beautiful proportional bar widths
    const maxMonthlyHours = Math.max(...activeActivities.map(a => a.hours), 1);

    return {
      topActivity,
      totalHours,
      weeklyAverage,
      activities: activeActivities,
      maxHours: maxMonthlyHours,
      chart: {
        sports: sportsPct,
        fitness: fitnessPct,
        rec: recPct,
        gradient: conicGradient
      }
    };
  };

  const currentStats = getPersonalData(selectedMonth);

  return (
    <div className="min-h-screen bg-[#060913] font-sans text-slate-100 p-6 md:p-8 selection:bg-purple-500/30 flex flex-col items-center justify-start">
      <div className="w-full max-w-5xl">
        
        {/* HEADER SECTION */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-slate-800/40 pb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">My Personal Stats</h1>
            <p className="text-xs text-slate-400 mt-1">Track your individual milestones and activity distribution.</p>
          </div>
          
          {/* Master Month Control Hub Dropdown */}
          <div className="relative self-start sm:self-auto">
            <button 
              onClick={() => setIsMonthOpen(!isMonthOpen)}
              className="flex items-center gap-2 rounded-lg border border-slate-800 bg-[#0b1120]/80 px-4 py-2 text-xs font-semibold text-slate-300 hover:border-slate-700 hover:text-white transition-all shadow-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5 text-slate-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
              </svg>
              {selectedMonth}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={`w-2.5 h-2.5 text-slate-400 transition-transform ${isMonthOpen ? 'rotate-180' : ''}`}><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
            </button>
            {isMonthOpen && (
              <div className="absolute right-0 mt-1.5 z-50 w-40 max-h-60 overflow-y-auto rounded-lg border border-slate-800 bg-[#0d1527] p-1 shadow-xl">
                {months.map((m) => (
                  <button 
                    key={m} 
                    onClick={() => { setSelectedMonth(m); setIsMonthOpen(false); }} 
                    className={`w-full text-left rounded px-2 py-1.5 text-xs ${selectedMonth === m ? 'bg-purple-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            )}
          </div>
        </header>

        {/* CORE KIP METRIC CARDS ROW */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          {/* CARD 1: Top Activity */}
          <div className="rounded-xl border border-slate-800/70 bg-[#0b1120]/70 p-5 flex flex-col justify-between shadow-sm min-h-[120px]">
            <div className="flex items-center justify-between">
              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Top Activity</p>
              <div className="rounded-lg bg-orange-500/10 p-2 text-orange-400 border border-orange-500/10">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047m9.324-1.833A8.25 8.25 0 0 0 6.038 7.047m9.324-1.833A8.219 8.219 0 0 0 12 4.5c-1.12 0-2.186.224-3.158.63m10.158 5.62c-1.12 0-2.186.224-3.158.63m3.158 5.62c-1.12 0-2.186.224-3.158.63M6.038 7.047A8.22 8.22 0 0 0 4.5 12c0 1.12.224 2.186.63 3.158m0-6.316c1.12 0 2.186.224 3.158.63m-3.158 5.684c1.12 0 2.186.224 3.158.63M3.75 12h16.5M12 3.75v16.5" /></svg>
              </div>
            </div>
            <div className="text-xl font-bold text-white tracking-tight mt-2 truncate">
              {currentStats.topActivity}
            </div>
          </div>

          {/* CARD 2: Total Hours Logged */}
          <div className="rounded-xl border border-slate-800/70 bg-[#0b1120]/70 p-5 flex flex-col justify-between shadow-sm min-h-[120px]">
            <div className="flex items-center justify-between">
              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Total Hours Spent</p>
              <div className="rounded-lg bg-blue-500/10 p-2 text-blue-400 border border-blue-500/10">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
              </div>
            </div>
            <div className="text-2xl font-black text-white tracking-tight mt-2">
              {currentStats.totalHours} <span className="text-xs font-medium text-slate-500">hrs logged</span>
            </div>
          </div>

          {/* CARD 3: Weekly Average Hour */}
          <div className="rounded-xl border border-slate-800/70 bg-[#0b1120]/70 p-5 flex flex-col justify-between shadow-sm min-h-[120px]">
            <div className="flex items-center justify-between">
              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Weekly Average Hour</p>
              <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-400 border border-emerald-500/10">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>
              </div>
            </div>
            <div className="text-2xl font-black text-white tracking-tight mt-2">
              {currentStats.weeklyAverage} <span className="text-xs font-medium text-slate-500">hrs / week</span>
            </div>
          </div>

        </div>

        {/* VISUAL CHARTS MATRIX GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* GRAPH 1: Category Breakdown (Circle Donut Chart) */}
          <div className="lg:col-span-5 rounded-xl border border-slate-800/60 bg-[#0b1120]/50 p-6 flex flex-col justify-between min-h-[300px]">
            <div>
              <h3 className="text-xs font-bold text-slate-200 tracking-wide uppercase">Category Breakdown</h3>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col items-center justify-center gap-6 py-4">
              {/* Dynamic Conic-gradient Circle Graph */}
              <div 
                className="relative h-32 w-32 rounded-full flex items-center justify-center transition-all duration-500 shadow-xl shrink-0" 
                style={{ background: currentStats.chart.gradient }}
              >
                <div className="h-[74%] w-[74%] rounded-full bg-[#070b14] flex flex-col items-center justify-center">
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Active</span>
                  <span className="text-sm font-black text-white">{selectedMonth.substring(0, 3)}</span>
                </div>
              </div>
              
              {/* Legend Metrics */}
              <div className="space-y-2.5 text-xs font-medium w-full max-w-[180px]">
                <div className="flex items-center justify-between border-b border-slate-800/40 pb-1.5">
                  <div className="flex items-center gap-2.5">
                    <span className="h-2 w-2 rounded-full bg-indigo-500"></span>
                    <span className="text-slate-400 text-[11px]">Sports</span>
                  </div>
                  <span className="text-white font-bold">{currentStats.chart.sports}%</span>
                </div>
                
                <div className="flex items-center justify-between border-b border-slate-800/40 pb-1.5">
                  <div className="flex items-center gap-2.5">
                    <span className="h-2 w-2 rounded-full bg-cyan-400"></span>
                    <span className="text-slate-400 text-[11px]">Fitness</span>
                  </div>
                  <span className="text-white font-bold">{currentStats.chart.fitness}%</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="h-2 w-2 rounded-full bg-[#2e3b5e]"></span>
                    <span className="text-slate-400 text-[11px]">Recreation</span>
                  </div>
                  <span className="text-white font-bold">{currentStats.chart.rec}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* GRAPH 2: Specific Activity Time Breakdown (Horizontal Proportional Bar Chart) */}
          <div className="lg:col-span-7 rounded-xl border border-slate-800/60 bg-[#0b1120]/50 p-6 flex flex-col justify-between min-h-[300px]">
            <div>
              <h3 className="text-xs font-bold text-slate-200 tracking-wide uppercase">Activity Time Logged</h3>
              <p className="text-[10px] text-slate-400 mt-1">Specific hours recorded per active interest group.</p>
            </div>

            {/* Dynamic Activity Graph Rows */}
            <div className="space-y-4 my-auto pt-4">
              {currentStats.activities.map((activity) => {
                // Compute precise width percentage corresponding to maximum logged value
                const widthPercent = (activity.hours / currentStats.maxHours) * 100;
                
                return (
                  <div key={activity.name} className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-white tracking-wide">{activity.name}</span>
                      <span className="font-bold text-slate-400">
                        {activity.hours} <span className="text-[10px] text-slate-500 font-medium">hrs</span>
                      </span>
                    </div>
                    
                    {/* Modern Glassy Progress Track & Bar */}
                    <div className="w-full h-2.5 rounded-full bg-slate-900 border border-slate-800/40 overflow-hidden">
                      <div 
                        className={`h-full rounded-full bg-gradient-to-r ${activity.color} transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1)`}
                        style={{ width: `${widthPercent}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default PersonalStatsPage;