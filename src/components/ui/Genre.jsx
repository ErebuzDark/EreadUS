import React, { useState, useEffect } from "react";
import * as API from "@/api/apiCalls";

const Genre = () => {
  const [genre, setGenre] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchGenre = async () => {
    setLoading(true);
    try {
      const response = await API.getGenre();
      setGenre(response.data);
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
  if (!genre) return <div>Loading Genres...</div>;
  return (
    <div className="w-full flex flex-row flex-wrap gap-1 my-10">
      {genre.genre.map((item, index) => (
        <div key={index} className="genre-item bg-slate-500 hover:bg-slate-400 cursor-pointer px-1 rounded-md">
          <h2 className="text-sm">{item}</h2>
        </div>
      ))}
    </div>
  );
};

export default Genre;
