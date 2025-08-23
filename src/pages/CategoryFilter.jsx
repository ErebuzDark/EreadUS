import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import * as API from "../api/apiCalls";

// components
import Genre from "@/components/ui/Genre";
import CardManga from "@/components/ui/Card.Manga";
import SkeletonMangaCard from "@/components/common/Skeleton.MangaCard";
import Searchbar from "../components/ui/Searchbar";

// icons
import { CiSearch } from "react-icons/ci";

const CategoryFilter = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { category, page } = useParams();
  const [pageGot, setPageGot] = useState(page);
  const [list, setList] = useState(null);
  const [error, setError] = useState(null);

  const fetchCategorizedManga = async () => {
    setLoading(true);
    try {
      const response = await API.getCategorizedManga(category, pageGot);
      setList(response.data);
      console.log(response.data);
    } catch (err) {
      console.error("API error:", err);
      setError("Failed to load manga list");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategorizedManga();
  }, [category, page]);

  const handleChangePage = (selectedPage) => {
    setPageGot(selectedPage);
    navigate(`/genre/${category}/${selectedPage}`);
  };

  if (error) return <div>Error: {error}</div>;

  if (loading)
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
      <Searchbar />

      {list?.count === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <img
            src="https://www.svgrepo.com/show/489659/empty-box.svg"
            alt="No results"
            className="w-40 h-40 mb-4 opacity-70"
          />

          <h2 className="text-xl font-semibold">No results found</h2>
          <p className="mt-2 text-center">
            We couldn’t find any manga for{" "}
            <span className="font-medium">"{searcheditem}"</span>.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 justify-center gap-4 my-10">
          {list?.manga?.map((item, index) => (
            <CardManga key={index} item={item} />
          ))}
        </div>
      )}

      <div className="w-full flex flex-row justify-center items-center gap-1 my-6">
        {/* Prev button */}
        <button
          onClick={() => handleChangePage(Number(pageGot) - 1)}
          disabled={Number(pageGot) === 1}
          className={`px-3 py-1 rounded-lg ${
            Number(pageGot) === 1
              ? "bg-slate-400 cursor-not-allowed"
              : "bg-slate-300 hover:bg-slate-200"
          }`}
        >
          {"<"}
        </button>

        {/* Numbered pages */}
        {list?.pagination?.map((pageNumber, index) => (
          <button
            onClick={() => handleChangePage(pageNumber)}
            key={index}
            className={`border px-3 py-1 rounded-lg hover:bg-slate-500 ${
              Number(pageNumber) === Number(pageGot)
                ? "bg-yellow-500 text-black"
                : "bg-slate-600 text-white"
            }`}
          >
            {pageNumber}
          </button>
        ))}

        {/* Next button */}
        <button
          onClick={() => handleChangePage(Number(pageGot) + 1)}
          disabled={
            Number(pageGot) ===
            list?.pagination?.[list.pagination.length - 1] /* lastPage */
          }
          className={`px-3 py-1 rounded-lg ${
            Number(pageGot) === list?.pagination?.[list.pagination.length - 1]
              ? "bg-slate-400 cursor-not-allowed"
              : "bg-slate-300 hover:bg-slate-200"
          }`}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default CategoryFilter;
