import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import * as API from "../api/apiCalls";

// components
import Genre from "@/components/ui/Genre";
import CardManga from "@/components/ui/Card.Manga";
import SkeletonMangaCard from "../components/common/Skeleton.MangaCard";

// icons
import { CiSearch } from "react-icons/ci";

const SearchedManga = () => {
  const navigate = useNavigate();
  const { searcheditem } = useParams();
  const [list, setList] = useState(null);
  const [error, setError] = useState(null);
  const [keyWord, setKeyWord] = useState( searcheditem || "");

  const fetchSearch = async () => {
    try {
      const response = await API.searchManga(searcheditem);
      setList(response.data);
    } catch (err) {
      console.error("API error:", err);
      setError("Failed to load manga list");
    }
  };

  useEffect(() => {
    fetchSearch();
  }, [searcheditem]);

  const handleSearch = () => {
    navigate(`/search/${keyWord}`);
  };

  if (error) return <div>Error: {error}</div>;
  if (!list)
    return (
      <div className="w-full mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 justify-center gap-4 my-10">
        {Array.from({ length: 12 }).map((_, index) => (
          <SkeletonMangaCard key={index} />
        ))}
      </div>
    );

  return (
    <div className="px-2 md:px-10 lg:px-16">
      <Genre />
      <div className="flex flex-row items-center gap-1">
        <input
          className="w-full px-3 py-1 bg-white rounded-lg"
          type="text"
          placeholder="Search Manga..."
          value={keyWord}
          onChange={(e) => setKeyWord(e.target.value)}
        />
        <button onClick={handleSearch} className="p-2 bg-orange-400 rounded-full">
          <CiSearch />
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 justify-center gap-4 my-10">
        {list?.manga?.map((item, index) => (
          <CardManga key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default SearchedManga;
