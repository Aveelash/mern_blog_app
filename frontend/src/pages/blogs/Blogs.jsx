import React, { useState } from "react";
import SearchBlog from "./SearchBlog";
import { useFetchBlogsQuery } from "../../redux/features/blogs/blogsApi";
import { Link } from "react-router-dom";

const Blogs = () => {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState({ search: "" });

  const { data: blogs = [], error, isLoading } = useFetchBlogsQuery(query);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value.trim() === "") {
      setQuery({ search: "" }); // <-- Reset to fetch all blogs
    }
  };

  const handleSearch = () => setQuery({ search });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <SearchBlog
        search={search}
        handleSearchChange={handleSearchChange}
        handleSearch={handleSearch}
      />

      {isLoading && (
        <div className="text-center mt-10 text-lg font-medium">Loading...</div>
      )}
      {error && (
        <div className="text-center mt-10 text-red-600">{error.toString()}</div>
      )}

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {blogs.map((blog) => (
          <Link
            key={blog._id}
            to={`/blogs/${blog._id}`}
            className="bg-white rounded-xl shadow-sm hover:shadow-lg border border-gray-100 transition-all duration-300 overflow-hidden"
          >
            <img
              src={blog.coverImg}
              alt={blog.title}
              className="w-full h-48 object-cover rounded-t-xl"
            />
            <div className="p-4 space-y-2">
              <h2 className="text-md font-semibold text-gray-800 line-clamp-2 hover:text-blue-600 transition">
                {blog.title}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
