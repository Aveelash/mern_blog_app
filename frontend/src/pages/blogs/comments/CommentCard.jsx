import React from "react";
import commentorIcon from "../../../assets/commentor (1).png";
import { formateDate } from "../../../utils/formateDate";
import PostAComment from "./PostAComment";
import { useSelector } from "react-redux";

const CommentCard = ({ comments }) => {
  const user = useSelector((state) => state.auth.user);
  return (
    <div className="my-6 bg-white p-8 rounded-2xl shadow-lg">
      <div>
        {comments?.length > 0 ? (
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-gray-800">
              All Comments
            </h3>
            <div className="space-y-8">
              {comments.map((comment, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-5 border-b pb-5 border-gray-200 hover:bg-gray-50 transition duration-300 ease-in-out"
                >
                  {/* Comment Header */}
                  <div className="flex items-start gap-5">
                    <img
                      src={commentorIcon}
                      alt="Commentor Icon"
                      className="h-16 w-16 rounded-full object-cover border-4 border-indigo-500 shadow-md"
                    />
                    <div>
                      <p className="text-lg font-semibold text-blue-600 capitalize hover:underline">
                        {comment?.user?.username}
                      </p>
                      <p className="text-sm text-gray-500 italic">
                        {formateDate(comment.createdAt)}
                      </p>
                    </div>
                  </div>

                  {/* Comment Text */}
                  <div className="bg-gray-100 p-6 rounded-xl shadow-sm border border-gray-200">
                    <p className="text-gray-700 text-base">
                      {comment?.comment}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-lg font-medium text-gray-500">
            No Comments Found
          </div>
        )}
      </div>

      {/* Comment Input */}
      <PostAComment />
    </div>
  );
};

export default CommentCard;
