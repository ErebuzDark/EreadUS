import React from "react";

const SkeletonMangaCard = () => {
  return (
    <div className="relative w-full md:min-w-48 max-w-56 h-auto border rounded-md shadow overflow-hidden animate-pulse">
      <div className="w-full h-64 bg-slate-200"></div>

      <div className="w-full p-2 bg-slate-950/80">
        <div className="h-4 bg-slate-300 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-slate-400 rounded w-1/2"></div>
      </div>
    </div>
  );
};

export default SkeletonMangaCard;
