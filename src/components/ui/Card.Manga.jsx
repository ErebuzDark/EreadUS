import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// icons
import { FaRegBookmark, FaBookmark } from "react-icons/fa";

const CardManga = ( { item } ) => {
  const [isBooked, setisBooked] = useState(false);

  useEffect(() => {
    setisBooked(localStorage.getItem('bookmarked')?.includes(item.id  || false));
  }, []);

  return (
    <Link to={`/manga/${item.id}`}
      key={item.id} 
      className="relative w-auto md:min-w-48 max-w-56 h-[294px] border rounded-md shadow overflow-hidden group cursor-pointer"
    >
      {isBooked ? (
        <button className="absolute z-30 right-3 top-3 text-yellow-400" onClick={() => {
          localStorage.removeItem('bookmarked');
          setisBooked(false);
        }}><FaBookmark /></button>
        ) : (
        <button className="absolute z-30 right-3 top-3 text-yellow-400" onClick={() => {
          const bookmarks = localStorage.getItem('bookmarked') || '[]';
          const updatedBookmarks = [...JSON.parse(bookmarks), item.id];
          localStorage.setItem('bookmarked', JSON.stringify(updatedBookmarks));
          setisBooked(true);
          }}><FaRegBookmark /></button>
        )}
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
    </Link>
  );
};

export default CardManga;
