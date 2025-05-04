import React from "react";
import Hero from "./Hero";
import Blogs from "../blogs/Blogs";

const Home = () => {
  return (
    <div className="bg-white text-black max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mt-8 p-8">
      <Hero />
      <Blogs />
    </div>
  );
};

export default Home;
