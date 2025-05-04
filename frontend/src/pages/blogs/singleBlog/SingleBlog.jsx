import React from "react";
import { useParams } from "react-router-dom";
import { useFetchBlogByIdQuery } from "../../../redux/features/blogs/blogsApi";
import SingleBlogCard from "./SingleBlogCard";
import CommentCard from "../comments/CommentCard";
import RelatedBlogs from "./RelatedBlogs";

const SingleBlog = () => {
  const { id } = useParams();
  const { data: blog, error, isLoading } = useFetchBlogByIdQuery(id);
  console.log(blog);

  return (
    <div className="text-black px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 mt-8">
      <div>
        {isLoading && <div>Loading...</div>}
        {error && <div>Something went wrong...</div>}
        {blog?.post && (
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
            <div className="w-full lg:w-2/3">
              <SingleBlogCard blog={blog.post} />
              <CommentCard comments={blog.comment} />
            </div>
            <div className="w-full lg:w-1/3">
              <RelatedBlogs />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleBlog;
