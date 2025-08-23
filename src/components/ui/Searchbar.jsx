import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

// icons
import { CiSearch } from "react-icons/ci";

const Searchbar = () => {
  const { searcheditem } = useParams();
  const navigate = useNavigate();
  const [keyWord, setKeyWord] = useState(searcheditem || "");
  const handleSearch = () => {
    navigate(`/search/${keyWord}`);
  };

  return (
    <div className="flex flex-row items-center gap-1">
      <input
        className="w-full max-w-[400px] px-3 py-1 bg-white rounded-lg"
        type="text"
        placeholder="Search Manga..."
        value={keyWord}
        onChange={(e) => setKeyWord(e.target.value)}
      />
      <button onClick={handleSearch} className="flex flex-row items-center px-2 py-1 bg-orange-400 rounded-lg">
        <CiSearch size={24} />
        <span>Search</span>
      </button>
    </div>
  );
};

export default Searchbar;
