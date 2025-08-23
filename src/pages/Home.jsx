import React, { useState, useEffect } from "react";
import * as API from "../api/apiCalls";

// components
import Genre from "@/components/ui/Genre";
import CardManga from "@/components/ui/Card.Manga";
import Searchbar from "../components/ui/Searchbar";
import SkeletonMangaCard from "../components/common/Skeleton.MangaCard";

const Home = () => {
  const getPage = Number(sessionStorage.getItem("page"));
  const [page, setPage] = useState(getPage || 1);
  const [list, setList] = useState(null);
  const [error, setError] = useState(null);

  const fetchMangaList = async () => {
    try {
      const response = await API.getMangaList(page);
      setList(response.data);
    } catch (err) {
      console.error("API error:", err);
      setError("Failed to load manga list");
    }
  };

  useEffect(() => {
    fetchMangaList();
  }, [page]);

  const handleChangePage = (selectedPage) => {
    sessionStorage.setItem("page", selectedPage);
    setPage(selectedPage);
  };

  if (error) return <div>Error: {error}</div>;
  if (!list)
    return (
      <div className="w-full mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 justify-items-center gap-4 my-10">
        {Array.from({ length: 12 }).map((_, index) => (
          <SkeletonMangaCard key={index} />
        ))}
      </div>
    );

  return (
    <div className="px-2 md:px-10 lg:px-16">
      <Genre />
      <Searchbar />
      <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 justify-items-center gap-4 my-10">
        {list?.data?.map((item, index) => (
          <CardManga key={index} item={item} />
        ))}
      </div>

      <div className="w-full flex flex-row justify-center">
        <button>{"<"}</button>
        {list?.pagination?.map((pageNumber, index) => (
          <button
            onClick={() => handleChangePage(pageNumber)}
            key={index}
            className={`bg-slate-600 border px-3 py-1 rounded-lg hover:bg-slate-500 ${
              pageNumber === page ? "bg-yellow-500" : ""
            } `}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
