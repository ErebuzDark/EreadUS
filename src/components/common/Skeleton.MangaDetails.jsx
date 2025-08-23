import React from "react";

const SkeletonMangaDetails = () => {
  return (
    <div className="animate-pulse p-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left side (cover) */}
        <div className="w-[250px] h-[350px] bg-slate-700 rounded-xl mx-auto md:mx-0"></div>

        {/* Right side (details) */}
        <div className="flex-1 space-y-4">
          <div className="h-10 bg-slate-700 rounded w-3/4"></div>
          <div className="h-6 bg-slate-700 rounded w-1/3"></div>
          <div className="h-4 bg-slate-700 rounded w-1/2"></div>
          <div className="h-4 bg-slate-700 rounded w-1/4"></div>
          <div className="flex flex-wrap gap-2 mt-2">
            <div className="h-6 w-14 bg-slate-700 rounded-full"></div>
            <div className="h-6 w-16 bg-slate-700 rounded-full"></div>
            <div className="h-6 w-12 bg-slate-700 rounded-full"></div>
          </div>
          <div className="h-8 w-28 bg-slate-700 rounded mt-4"></div>
        </div>
      </div>

      {/* Description */}
      <div className="mt-6 space-y-2">
        <div className="h-4 bg-slate-700 rounded w-full"></div>
        <div className="h-4 bg-slate-700 rounded w-5/6"></div>
        <div className="h-4 bg-slate-700 rounded w-3/4"></div>
      </div>

      {/* Chapters */}
      <div className="mt-8">
        <div className="h-6 bg-slate-700 rounded w-32 mb-4"></div>
        <div className="space-y-2">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="h-14 bg-slate-700 rounded-lg w-full"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkeletonMangaDetails;
