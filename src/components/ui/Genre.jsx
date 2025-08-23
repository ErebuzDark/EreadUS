import React, { useState, useEffect } from "react";
import * as API from "@/api/apiCalls";
import { useNavigate } from "react-router-dom";

const Genre = () => {
  const navigate = useNavigate();
  const [genre, setGenre] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  const priority = [
    "Action",
    "Romance",
    "Comedy",
    "Fantasy",
    "Drama",
    "Adventure",
    "Mature",
  ];

  const fetchGenre = async () => {
    setLoading(true);
    try {
      const response = await API.getGenre();
      const sortedGenres = [...response.data.genre].sort((a, b) => {
        const aIndex = priority.indexOf(a);
        const bIndex = priority.indexOf(b);
        if (aIndex === -1 && bIndex === -1) return a.localeCompare(b);
        if (aIndex === -1) return 1;
        if (bIndex === -1) return -1;
        return aIndex - bIndex;
      });

      setGenre({ ...response.data, genre: sortedGenres });
    } catch (err) {
      console.error("API error:", err);
      setError("Failed to load manga genres");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGenre();
  }, []);

  if (error) return <div>Error: {error}</div>;

  if (loading || !genre) {
    return (
      <div className="flex flex-row flex-wrap gap-2 my-3">
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            className="w-16 h-5 rounded-md bg-slate-300/30 animate-pulse"
            key={index}
          ></div>
        ))}
      </div>
    );
  }

  const displayedGenres = showAll ? genre.genre : genre.genre.slice(0, 12);

  return (
    <div className="w-full my-10">
      <div className="flex flex-row flex-wrap gap-1">
        {displayedGenres.map((item, index) => (
          <button
            onClick={() => navigate(`/genre/${item.toLowerCase()}/1`)}
            key={index}
            className="genre-item bg-slate-500 hover:bg-slate-400 cursor-pointer px-1 rounded-md"
          >
            <h2 className="text-sm">{item}</h2>
          </button>
        ))}
      </div>

      {genre.genre.length > 12 && (
        <button
          onClick={() => setShowAll((prev) => !prev)}
          className="mt-2 text-sm text-slate-200 hover:text-blue-300"
        >
          {showAll ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
};

export default Genre;
