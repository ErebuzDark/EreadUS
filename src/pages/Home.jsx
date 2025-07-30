import React, { useState, useEffect } from "react";
import * as API from "../api/apiCalls";

// components
import CardManga from "@/components/ui/Card.Manga";

const Home = () => {
  const getPage = sessionStorage.getItem("page");
  const [list, setList] = useState(null);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(getPage ?? 1);

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
  if (!list) return <div>Loading...</div>;

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 justify-center gap-4 my-10">
        {list?.data?.map((item, index) => (
          <CardManga key={index} item={item} />
        ))}
      </div>
      <div className="w-full flex flex-row justify-center">
        <button>{"<"}</button>
        {list?.pagination?.map((pageNumber, index) => (
          <button onClick={() => handleChangePage(pageNumber)} key={index} className={`bg-slate-600 border px-3 py-1 rounded-lg hover:bg-slate-500 ${pageNumber === page ? "bg-yellow-500" : ""} `}>
            {pageNumber}
          </button>
        ))}
      </div>
    </>
  );
};

export default Home;
