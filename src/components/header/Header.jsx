import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as API from "@/api/apiCalls";

// components
import { Spinner } from "flowbite-react";

import {
  Button,
  Drawer,
  DrawerHeader,
  DrawerItems,
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";

import { CgMenuLeftAlt } from "react-icons/cg";
import { IoMdBookmark } from "react-icons/io";
import { TbIconsFilled } from "react-icons/tb";
import { CiSearch } from "react-icons/ci";
import { MdHomeFilled } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

const Header = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [genre, setGenre] = useState([]);
  const [keyWord, setKeyWord] = useState("");
  const [bookmarks, setBookMarks] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);

  const getSavedManga = () => {
    const list = JSON.parse(localStorage.getItem("bookmarked") || []);
    setBookMarks(list);
  };

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

      setGenre(sortedGenres);
      console.log(sortedGenres);
    } catch (err) {
      console.error("API error:", err);
      setError("Failed to load manga genres", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSavedManga();
    fetchGenre();
  }, []);

  const handleSearch = () => {
    navigate(`/search/${keyWord}`);
  };

  if (error) return <span>{error}</span>;

  return (
    <>
      <div className="flex flex-row items-center justify-between bg-slate-900 py-4 px-12">
        <div className="flex flex-row items-center gap-2">
          <div>
            <img src="/ereadus-logo.svg" alt="" className="size-16" />
          </div>
          <h1 className="important-text font-semibold">EreadUS</h1>
        </div>
        <div className="flex items-center justify-center">
          <button onClick={() => setIsOpen(true)}>
            <CgMenuLeftAlt size={28} className="text-white" />
          </button>
        </div>
      </div>

      <Drawer open={isOpen} onClose={handleClose}>
        <DrawerHeader
          title="EreadUS"
          titleIcon={() => (
            <>
              <img src="/ereadus-logo.svg" alt="" className="size-11" />
            </>
          )}
        />
        <DrawerItems>
          <Sidebar
            aria-label="Sidebar with multi-level dropdown example"
            className="[&>div]:bg-transparent [&>div]:p-0"
          >
            <div className="flex h-full flex-col justify-between py-2">
              <div>
                <SidebarItems>
                  <SidebarItemGroup>
                    <div className="flex flex-row items-center gap-1">
                      <input
                        className="w-full px-3 py-1 bg-white rounded-lg"
                        type="text"
                        value={keyWord}
                        onChange={(e) => setKeyWord(e.target.value)}
                        placeholder="Search Manga..."
                      />
                      <button
                        onClick={handleSearch}
                        className="p-2 bg-orange-400 rounded-full"
                      >
                        <CiSearch />
                      </button>
                    </div>
                    <SidebarItem href="/" icon={MdHomeFilled}>
                      Home
                    </SidebarItem>
                    <SidebarItem href="/" icon={IoMdBookmark}>
                      Bookmarks
                    </SidebarItem>
                    <div className="ml-11 flex flex-row flex-wrap gap-1 ">
                      {bookmarks.map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() =>
                            navigate(`/manga/${item.toLowerCase()}`)
                          }
                          className="flex flex-row items-center gap-1 text-slate-500 text-xs px-2 py-0 border rounded-md hover:bg-slate-200 hover:text-slate-900 cursor-pointer duration-300 transition-all"
                        >
                          <span>{item}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              const stored = JSON.parse(
                                localStorage.getItem("bookmarked") || "[]"
                              );
                              const updated = stored.filter(
                                (id) => id !== item
                              );
                              localStorage.setItem(
                                "bookmarked",
                                JSON.stringify(updated)
                              );
                              setBookMarks(updated);
                            }}
                          >
                            <RxCross2 />
                          </button>
                        </button>
                      ))}
                    </div>
                  </SidebarItemGroup>
                  <SidebarItemGroup>
                    <SidebarItem icon={TbIconsFilled}>Genres</SidebarItem>
                    {loading ? (
                      <Spinner size="sm" color="blue" />
                    ) : (
                      <div className="ml-11 flex flex-row flex-wrap gap-1 ">
                        {genre.map((item, idx) => (
                          <button
                            key={idx}
                            onClick={() =>
                              navigate(`/genre/${item.toLowerCase()}/1`)
                            }
                            className="text-slate-500 text-xs px-2 py-0 border rounded-md hover:bg-slate-200 hover:text-slate-900 cursor-pointer duration-300 transition-all"
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    )}
                  </SidebarItemGroup>
                </SidebarItems>
              </div>
            </div>
          </Sidebar>
        </DrawerItems>
      </Drawer>
    </>
  );
};

export default Header;
