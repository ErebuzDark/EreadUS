import React, { useState, useEffect } from "react";

// icons
import { FaRegBookmark, FaBookmark } from "react-icons/fa";

const CardManga = ( { item } ) => {
  const [isBooked, setisBooked] = useState(false);

  useEffect(() => {
    setisBooked(localStorage.getItem)
  }, []);

  return (
    <div
      key={item.id}
      className="relative w-auto md:min-w-48 max-w-56 h-[294px] border rounded-md shadow overflow-hidden group"
    >
      <button className="absolute z-30 right-3 top-3 text-xl text-yellow-400 cursor-pointer"><FaRegBookmark /></button>
      <img
        src={item.imgUrl}
        alt={item.title}
        className="size-full min-h-64 group-hover:scale-105 duration-300"
      />
      <div className="absolute w-full h-fit bottom-0 p-2 bg-slate-950/80">
        <h2 className="font-semibold text-white leading-none ellipsis group-hover:whitespace-normal group-hover:overflow-visible group-hover:text-ellipsis-none">
          {item.title}
        </h2>
        <p className="text-sm text-gray-400">
          {item.latestChapter.toUpperCase()}
        </p>
      </div>
    </div>
  );
};

export default CardManga;
