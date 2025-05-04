import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import EditorJS from "@editorjs/editorjs";
import List from "@editorjs/list";
import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import { usePostBlogMutation } from "../../../redux/features/blogs/blogsApi";
import { useNavigate } from "react-router-dom";

const AddPost = () => {
  const editorRef = useRef(null);
  const [title, setTitle] = useState("");
  const [coverImg, setCoverImg] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState("");
  const [message, setMessage] = useState("");

  const [postBlog, { isLoading }] = usePostBlogMutation();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const editor = new EditorJS({
      holder: "editorjs",
      onReady: () => {
        editorRef.current = editor;
      },
      autofocus: true,
      tools: {
        paragraph: {
          class: Paragraph,
          inlineToolbar: true,
        },
        header: {
          class: Header,
          inlineToolbar: true,
        },
        list: {
          class: List,
          inlineToolbar: true,
        },
      },
      data: {
        time: new Date().getTime(),
        blocks: [
          {
            type: "paragraph",
            data: {
              text: "",
            },
          },
        ],
      },
    });

    return () => {
      editor.destroy();
      editorRef.current = null;
    };
  }, []);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating || rating < 1 || rating > 5) {
      setMessage("Please enter a valid rating between 1 and 5.");
      return;
    }
    try {
      const content = await editorRef.current.save();

      content.blocks = content.blocks.filter((block) => {
        if (block.type === "paragraph") {
          return block.data && block.data.text && block.data.text.trim() !== "";
        }
        return true;
      });
      const newPost = {
        title,
        coverImg,
        category,
        content,
        description: metaDescription,
        author: user?._id,
        rating,
      };
      // console.log(newPost);
      const response = await postBlog(newPost).unwrap();
      console.log(response);
      alert("Blog is posted successfully!");
      navigate("/blogs");
    } catch (error) {
      console.log("Failed to submit post", error);
      setMessage("Failed to submit post. Please try again!");
    }
  };

  return (
    <div className="bg-white md:p-8 p-2">
      <h2 className="text-2xl font-semibold">Create a New Blog Post</h2>
      <form onSubmit={handleSubmit} className="space-y-5 pt-8">
        <div className="space-y-4">
          <label className="font-semibold text-xl">Blog Title: </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mt-3 inline-block bg-gray-100 focus:outline-none px-5 py-3"
            placeholder="Ex: Marina del Ray Marriott..."
            required
          />
        </div>

        {/* Blog details */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          {/* left side */}
          <div className="md:w-2/3 w-full">
            <p className="font-semibold text-xl mb-5">Content Section</p>
            <p className="text-xs italic">Write your post below here...</p>
            <div id="editorjs"></div>
          </div>

          {/* right side */}
          <div className="md:w-1/3 w-full border p-5 space-y-5">
            <p className="text-xl font-semibold">Choose Blog Format</p>

            {/* images */}
            <div className="space-y-4">
              <label className="font-semibold">Blog Cover: </label>
              <input
                type="text"
                value={coverImg}
                onChange={(e) => setCoverImg(e.target.value)}
                className="w-full inline-block bg-gray-100 focus:outline-none px-5 py-3"
                placeholder="https://unsplash.com/cover-photo1-of-blog.png..."
                required
              />
            </div>

            {/* Category */}
            <div className="space-y-4">
              <label className="font-semibold">Category: </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full inline-block bg-gray-100 focus:outline-none px-5 py-3"
                placeholder="RoofTop/Travel/Nature"
                required
              />
            </div>

            {/* meta description */}
            <div className="space-y-4">
              <label className="font-semibold">Meta Description: </label>
              <textarea
                type="text"
                cols={4}
                rows={4}
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                className="w-full inline-block bg-gray-100 focus:outline-none px-5 py-3"
                placeholder="Write your blog meta description"
                required
              />
            </div>

            {/* Rating */}
            <div className="space-y-4">
              <label className="font-semibold">Rating </label>
              <input
                type="number"
                value={rating}
                min="1"
                max="5"
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "") {
                    setRating("");
                  } else {
                    const num = Number(value);
                    if (!isNaN(num) && num >= 1 && num <= 5) {
                      setRating(num);
                    }
                  }
                }}
                className="w-full inline-block bg-gray-100 focus:outline-none px-5 py-3"
                placeholder="Enter rating 1-5"
                required
              />
            </div>

            {/* author */}
            <div className="space-y-4">
              <label className="font-semibold">Author </label>
              <input
                type="text"
                value={user.username}
                className="w-full inline-block bg-gray-100 focus:outline-none px-5 py-3"
                placeholder={`{user.username} (not editable)`}
                disabled
              />
            </div>
          </div>
        </div>

        {message && <p className="text-red-500">{message}</p>}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-5 bg-black hover:bg-indigo-500 text-white font-medium py-3 rounded-md"
        >
          Add New Blog
        </button>
      </form>
    </div>
  );
};

export default AddPost;
