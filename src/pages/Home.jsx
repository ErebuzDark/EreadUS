import React, { useState, useEffect } from "react";
import * as API from "../api/apiCalls";

// components
import Genre from "@/components/ui/Genre";
import CardManga from "@/components/ui/Card.Manga";
import Searchbar from "@/components/ui/Searchbar";
import SkeletonMangaCard from "@/components/common/Skeleton.MangaCard";

// icons
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";

const Home = () => {
  const getPage = Number(sessionStorage.getItem("page"));
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(getPage || 1);
  const [list, setList] = useState(null);
  const [error, setError] = useState(null);

  const fetchMangaList = async () => {
    setLoading(true);
    try {
      const response = await API.getMangaList(page);
      setList(response.data);
    } catch (err) {
      console.error("API error:", err);
      setError("Failed to load manga list");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMangaList();
  }, [page]);

  const handleChangePage = (selectedPage) => {
    sessionStorage.setItem("page", selectedPage);
    setPage(selectedPage);
  };

  const handleChangePageArrow = (step) => {
    const lastPage = list?.pagination?.[list.pagination.length - 1];
    if (step === -1 && page > 1) {
      handleChangePage(page - 1);
    }
    if (step === 1 && page < lastPage) {
      handleChangePage(page + 1);
    }
  };

  if (error) return <div>Error: {error}</div>;
  if (loading)
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

      <div className="w-full flex flex-row justify-center items-center gap-1 my-6">
        <button
          onClick={() => handleChangePageArrow(-1)}
          disabled={page === 1}
          className={`p-2 px-3 rounded-lg ${
            page === 1
              ? "bg-slate-400 cursor-not-allowed"
              : "bg-slate-300 hover:bg-slate-200"
          }`}
        >
          <IoMdArrowDropleft />
        </button>

        {list?.pagination?.map((pageNumber, index) => (
          <button
            onClick={() => handleChangePage(pageNumber)}
            key={index}
            className={`border px-4 py-1 rounded-lg hover:bg-slate-500 ${
              pageNumber === page
                ? "bg-yellow-500 text-black"
                : "bg-slate-600 text-white"
            }`}
          >
            {pageNumber}
          </button>
        ))}

        <button
          onClick={() => handleChangePageArrow(1)}
          disabled={page === list?.pagination?.[list.pagination.length - 1]}
          className={`p-2 px-3 rounded-lg ${
            page === list?.pagination?.[list.pagination.length - 1]
              ? "bg-slate-400 cursor-not-allowed"
              : "bg-slate-300 hover:bg-slate-200"
          }`}
        >
          <IoMdArrowDropright />
        </button>
      </div>
    </div>
  );
};

export default Home;
