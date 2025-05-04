import React from "react";
import { Link, useParams } from "react-router-dom";
import { useFetchRelatedBlogsQuery } from "../../../redux/features/blogs/blogsApi";

const RelatedBlogs = () => {
  const { id } = useParams();
  const { data: blogs = [], error, isLoading } = useFetchRelatedBlogsQuery(id);

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md w-full">
      <h3 className="text-lg sm:text-xl font-semibold text-gray-800 border-b pb-3 mb-4 sm:mb-5">
        Related Blogs
      </h3>

      {blogs.length > 0 ? (
        <div className="space-y-4 sm:space-y-5">
          {blogs.map((blog) => (
            <Link
              key={blog._id}
              to={`/blogs/${blog._id}`}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 hover:bg-gray-50 transition-all p-3 sm:p-4 rounded-lg border border-gray-100"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0">
                <img
                  src={blog.coverImg}
                  alt={blog.title}
                  className="w-full h-full object-cover rounded-full border-2 border-indigo-500"
                />
              </div>

              <div className="flex-1">
                <h4 className="text-indigo-600 font-semibold text-sm sm:text-base line-clamp-1">
                  {blog.title}
                </h4>
                <p className="text-gray-600 text-xs sm:text-sm line-clamp-2">
                  {blog?.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-gray-500 text-sm mt-3 sm:mt-4">
          No Related Blogs Found
        </div>
      )}
    </div>
  );
};

export default RelatedBlogs;
