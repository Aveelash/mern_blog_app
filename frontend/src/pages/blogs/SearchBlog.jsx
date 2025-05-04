import React from "react";

const SearchBlog = ({ search, handleSearchChange, handleSearch }) => {
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <div className="w-full px-4 py-6 flex flex-col sm:flex-row sm:items-center gap-4">
      <input
        value={search}
        onChange={handleSearchChange}
        onKeyDown={handleKeyPress}
        type="text"
        placeholder="Hotels with Rooftop Pool Near..."
        className="w-full sm:flex-1 px-5 py-3 bg-gray-100 text-gray-800 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 shadow-sm"
      />
      <button
        onClick={handleSearch}
        className="bg-[#1E73BE] hover:bg-[#1666a9] transition-colors duration-200 px-6 py-3 text-white font-semibold rounded-lg shadow-md"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBlog;
