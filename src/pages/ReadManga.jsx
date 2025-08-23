import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as API from "../api/apiCalls";

// icons
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { IoArrowUpCircle } from "react-icons/io5";

const ReadManga = () => {
  const { id, chapter } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [mangaChapter, setMangaChapter] = useState(null);
  const [error, setError] = useState(null);
  const [chaptersList, setChaptersList] = useState([]);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Fetch chapter data
  const fetchMangaChapter = async () => {
    setLoading(true);
    try {
      const response = await API.getMangaChapter(id, chapter);
      setMangaChapter(response.data);
    } catch (err) {
      console.error("API error:", err);
      setError("Failed to load manga chapter");
    } finally {
      setLoading(false);
    }
  };

  const fetchChaptersList = async () => {
    try {
      const response = await API.getMangaDetails(id);
      const chapters = response.data.chapters || [];

      if (chapters.length > 0) {
        // Sort chapters in ascending order
        const sortedChapters = chapters.sort(
          (a, b) => Number(a.chapterId) - Number(b.chapterId)
        );
        setChaptersList(sortedChapters);
      }
    } catch (err) {
      console.error("API error:", err);
      setError("Failed to load manga list");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToPrevChapter = () => {
    const prevChapter = Number(chapter) - 1;
    if (prevChapter >= 1) {
      navigate(`/manga/${id}/${prevChapter}`);
    }
  };

  const goToNextChapter = () => {
    const nextChapter = Number(chapter) + 1;
    if (nextChapter <= chaptersList.length) {
      navigate(`/manga/${id}/${nextChapter}`);
    }
  };

  const handleChapterSelect = (e) => {
    navigate(`/manga/${id}/${e.target.value}`);
  };

  useEffect(() => {
    fetchMangaChapter();
    fetchChaptersList();
  }, [id, chapter]);

  if (loading)
    return (
      <div className="animate-pulse flex flex-col items-center my-6">
        <div className="h-8 w-64 bg-slate-700 rounded-md mb-6"></div>

        <div className="h-8 w-52 bg-slate-700 rounded-md mb-6"></div>

        <div className="flex flex-row items-center gap-4">
          <div className="h-9 w-20 bg-slate-700 rounded-md"></div>
          <div className="h-9 w-36 bg-slate-700 rounded-md"></div>
          <div className="h-9 w-20 bg-slate-700 rounded-md"></div>
        </div>
      </div>
    );
  if (error) return <div>Error: {error}</div>;
  if (!mangaChapter) return <div>No chapter data available</div>;

  return (
    <div className="relative">
      <h1 className="text-3xl text-slate-100 font-bold text-center mb-4 my-4">
        {mangaChapter.title}
      </h1>
      <button
        onClick={() => {
          navigate(`/manga/${id}`);
        }}
        className="flex flex-row items-center mx-auto bg-slate-100 px-2 py-1 rounded-sm"
      >
        <IoMdArrowDropleft />
        <span>Go back to Title Page</span>
      </button>

      <div className="w-full justify-center flex items-center gap-4 my-6">
        <button
          onClick={goToPrevChapter}
          disabled={Number(chapter) <= 1}
          className="flex flex-row items-center gap-1 bg-slate-100 px-4 py-1 rounded disabled:opacity-50"
        >
          <IoMdArrowDropleft /> Prev
        </button>

        <select
          value={chapter}
          onChange={handleChapterSelect}
          className="border rounded px-3 py-1 bg-white"
        >
          {chaptersList.map((c) => (
            <option key={c.chapterId} value={c.chapterId}>
              Chapter {c.chapterId}
            </option>
          ))}
        </select>

        <button
          onClick={goToNextChapter}
          disabled={Number(chapter) >= chaptersList.length}
          className="flex flex-row items-center gap-1 bg-slate-100 px-4 py-1 rounded disabled:opacity-50"
        >
          Next <IoMdArrowDropright />
        </button>
      </div>

      <div className="flex flex-col items-center">
        {mangaChapter.imageUrls.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Page ${index + 1}`}
            className="w-full max-w-2xl"
          />
        ))}
      </div>

      <div className="w-full justify-center flex items-center gap-4 my-6">
        <button
          onClick={goToPrevChapter}
          disabled={Number(chapter) <= 1}
          className="flex flex-row items-center gap-1 bg-slate-100 px-4 py-1 rounded disabled:opacity-50"
        >
          <IoMdArrowDropleft /> Prev
        </button>

        <select
          value={chapter}
          onChange={handleChapterSelect}
          className="border rounded px-3 py-1 bg-white"
        >
          {chaptersList.map((c) => (
            <option key={c.chapterId} value={c.chapterId}>
              Chapter {c.chapterId}
            </option>
          ))}
        </select>

        <button
          onClick={goToNextChapter}
          disabled={Number(chapter) >= chaptersList.length}
          className="flex flex-row items-center gap-1 bg-slate-100 px-4 py-1 rounded disabled:opacity-50"
        >
          Next <IoMdArrowDropright />
        </button>
      </div>

      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 bg-orange-500 text-white p-0 rounded-full shadow-lg hover:bg-orange-600 transition-all duration-300 transform 
        ${
          showScrollTop
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-5 pointer-events-none"
        }`}
      >
        <IoArrowUpCircle size={45} />
      </button>
    </div>
  );
};

export default ReadManga;
