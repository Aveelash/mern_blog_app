import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { usePostCommentMutation } from "../../../redux/features/comments/commentApi";
import { useFetchBlogByIdQuery } from "../../../redux/features/blogs/blogsApi";

const PostAComment = () => {
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  // console.log(user);

  const [postComment] = usePostCommentMutation();
  const { refetch } = useFetchBlogByIdQuery(id, { skip: !id });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please login to comment on this post.");
      navigate("/login");
      return;
    }
    const newComment = {
      comment: comment,
      user: user?._id,
      postId: id,
    };
    // console.log(newComment);
    try {
      const response = await postComment(newComment).unwrap();
      console.log(response);
      alert("Comment Posted Successfully!");
      setComment("");
      refetch();
    } catch (error) {
      alert("An error occurred while posting comment");
    }
  };

  return (
    <div className="mt-12 bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
      <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
        Leave a Comment
      </h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <textarea
          name="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          cols="30"
          rows="6"
          placeholder="Share your thoughts about this post..."
          className="w-full rounded-lg border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-indigo-400 focus:outline-none p-4 text-gray-800 text-base resize-none transition duration-300"
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PostAComment;
