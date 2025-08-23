import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

// components
import SkeletonMangaDetaisl from "../components/common/Skeleton.MangaDetails";

// icons
import { FaRegBookmark, FaBookmark } from "react-icons/fa";

import * as API from "../api/apiCalls";

const MangaDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [mangaDetails, setMangaDetails] = useState(null);
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isBooked, setisBooked] = useState(false);

  useEffect(() => {
    setisBooked(localStorage.getItem("bookmarked")?.includes(id || false));
  }, []);

  const fetchMangaDetails = async () => {
    setLoading(true);
    try {
      const response = await API.getMangaDetails(id);
      setMangaDetails(response.data);
    } catch (err) {
      console.error("API error:", err);
      setError("Failed to load manga list");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMangaDetails();
  }, [id]);

  return (
    // <div className="px-2 md:px-10 lg:px-16">
    <div>
      {loading && <SkeletonMangaDetaisl />}
      {error && <div>Error: {error}</div>}
      {mangaDetails && (
        <>
          <div
            className="manga-details relative bg-no-repeat bg-cover bg-center"
            style={{ backgroundImage: `url(${mangaDetails.imageUrl})` }}
          >
            <div className="absolute inset-0 bg-black/80"></div>
            <div className="flex flex-col md:flex-row gap-4 p-10 text-slate-100 relative z-10">
              <img
                src={mangaDetails.imageUrl}
                alt={mangaDetails.title}
                className="w-[300px] h-auto rounded-lg mx-auto md:mx-0"
              />
              <div className="relative">
                <h1 className="text-4xl md:text-6xl font-bold">
                  {mangaDetails.title}
                </h1>
                {isBooked ? (
                  <button
                    className="flex flex-row gap-1 items-center my-1 text-yellow-400"
                    onClick={() => {
                      const bookmarks = JSON.parse(
                        localStorage.getItem("bookmarked") || "[]"
                      );
                      const updatedBookmarks = bookmarks.filter(
                        (id) => id !== mangaDetails.id
                      );
                      localStorage.setItem(
                        "bookmarked",
                        JSON.stringify(updatedBookmarks)
                      );
                      setisBooked(false);
                    }}
                  >
                    <FaBookmark /> Bookmarked
                  </button>
                ) : (
                  <button
                    className="flex flex-row gap-1 items-center my-1 text-yellow-400"
                    onClick={() => {
                      const bookmarks =
                        localStorage.getItem("bookmarked") || "[]";
                      const updatedBookmarks = [
                        ...JSON.parse(bookmarks),
                        mangaDetails.id,
                      ];
                      localStorage.setItem(
                        "bookmarked",
                        JSON.stringify(updatedBookmarks)
                      );
                      setisBooked(true);
                    }}
                  >
                    <FaRegBookmark /> Bookmark
                  </button>
                )}
                <div className="mt-4">
                  <h2 className="text-xl font-semibold">Details</h2>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span
                      className={`${
                        mangaDetails.status === "Completed"
                          ? "text-green-500"
                          : "text-blue-500"
                      }`}
                    >
                      {mangaDetails.status}
                    </span>
                  </p>
                  <p>
                    <strong>Author:</strong> {mangaDetails.author}
                  </p>
                  <p className="text-slate-400">({mangaDetails.views}) views</p>
                  <p>
                    <strong>Last updated:</strong> {mangaDetails.lastUpdated}
                  </p>
                  <p>Rating: {mangaDetails.rating}</p>
                  <div className={`flex flex-row flex-wrap gap-1`}>
                    {mangaDetails.genres.map((genre, index) => (
                      <span
                        key={index}
                        className="inline-block bg-slate-600 hover:bg-slate-500 text-slate-200 px-2 py-1 rounded-full text-xs"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 mx-10  relative z-10">
            <div className="flex flex-row gap-2 mb-4">
              <Link
                to={`/manga/${id}/${
                  mangaDetails.chapters[mangaDetails.chapters.length - 1]
                    .chapterId
                }`}
              >
                <div className="size-fit p-2 rounded-full text-sm px-3 bg-amber-800">
                  Read First
                </div>
              </Link>
              <Link to={`/manga/${id}/${mangaDetails.chapters?.[0].chapterId}`}>
                <div className="size-fit p-2 rounded-full text-sm px-3 bg-yellow-500">
                  Read Last
                </div>
              </Link>
            </div>
            <h2 className="text-xl font-semibold text-slate-100">Chapters</h2>
            <div
              className={`relative flex flex-col gap-1 h-64 mb-10 ${
                isExpanded ? "h-auto" : "max-h-64 overflow-y-hidden"
              }`}
            >
              {mangaDetails.chapters.map((chapter, index) => (
                <Link
                  to={`/manga/${id}/${chapter.chapterId}`}
                  key={index}
                  className="block"
                >
                  <div className="p-2 rounded-lg border-slate-500 bg-slate-700 hover:bg-slate-600 duration-300">
                    <p className="text-slate-400">
                      CHAPTER {chapter.chapterId}
                    </p>
                    <div className="flex flex-row gap-2 text-xs text-slate-500">
                      <p>{chapter.views} views</p>
                      <span>|</span>
                      <p>Date uploaded: {chapter.uploaded}</p>
                    </div>
                  </div>
                </Link>
              ))}
              <div
                className={`absolute w-full h-20 flex justify-center items-center 
    bg-gradient-to-b from-transparent to-slate-800/80
    transition-all duration-500 ease-in-out
    ${isExpanded ? "-bottom-[73px] opacity-100" : "bottom-0 opacity-90"}
    left-1/2 -translate-x-1/2 mt-2 text-blue-400 hover:underline`}
              >
                <button onClick={() => setIsExpanded(!isExpanded)}>
                  {isExpanded ? "Show Less" : "Show All"}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MangaDetails;
