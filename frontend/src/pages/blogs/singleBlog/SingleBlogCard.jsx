import React from "react";
import { formateDate } from "../../../utils/formateDate";
import edjsHTML from "editorjs-html";

const editorJSHTML = edjsHTML();

const SingleBlogCard = ({ blog }) => {
  const {
    title,
    description,
    content,
    coverImg,
    category,
    rating,
    author,
    createdAt,
  } = blog || {};

  const htmlContent = editorJSHTML.parse(content);

  return (
    <>
      <div className="bg-white p-4 sm:p-6 md:p-10 rounded-2xl shadow-xl max-w-screen-xl mx-auto">
        {/* Blog header */}
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 leading-tight text-gray-800">
            {title}
          </h1>
          <p className="mb-6 text-sm sm:text-base text-gray-500">
            <span className="italic">{formateDate(createdAt)}</span> by{" "}
            <span className="text-blue-600 font-medium hover:underline cursor-pointer">
              {author?.id}
            </span>
          </p>
        </div>

        {/* Cover Image */}
        <div>
          <img
            src={coverImg}
            alt="cover Image"
            className="w-full max-h-[500px] object-cover rounded-xl shadow-md"
          />
        </div>

        {/* Blog content */}
        <div className="mt-8 space-y-6">
          <div
            dangerouslySetInnerHTML={{ __html: htmlContent }}
            className="prose prose-sm sm:prose lg:prose-lg max-w-none text-gray-700"
          />

          {/* Rating */}
          <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-inner">
            <span className="text-base sm:text-lg font-semibold text-gray-700">
              Rating:{" "}
            </span>
            <span className="text-gray-600">
              {rating} (based on 2,370 reviews)
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleBlogCard;
