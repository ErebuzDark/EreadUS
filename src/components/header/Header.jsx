import React, { useState, useEffect } from "react";
import * as API from "@/api/apiCalls";

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

const Header = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const handleClose = () => setIsOpen(false);
  const [genre, setGenre] = useState([]);

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
      // console.log(response.data);
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
    fetchGenre();
  }, []);

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
                        placeholder="Search Manga..."
                      />
                      <button className="p-2 bg-orange-400 rounded-full">
                        <CiSearch />
                      </button>
                    </div>
                    <SidebarItem href="/" icon={IoMdBookmark}>
                      Bookmarks
                    </SidebarItem>
                  </SidebarItemGroup>
                  <SidebarItemGroup>
                    <SidebarItem href="/" icon={TbIconsFilled}>
                      Genres
                    </SidebarItem>
                    <div className="ml-11 flex flex-row flex-wrap gap-1 ">
                      {genre.map((item, idx) => (
                        <button
                          key={idx}
                          className="text-slate-500 text-xs px-2 py-0 border rounded-md hover:bg-slate-200 hover:text-slate-900 cursor-pointer duration-300 transition-all"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
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
