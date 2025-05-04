import React from "react";
import { formateDate } from "../../../utils/formateDate";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const formatData = (blogs) => {
  return blogs.map((blog) => ({
    name: formateDate(blog.createdAt),
    post: blog.title.length,
    pv: blogs.pageViews || 0,
    amt: blog.amt || 0,
  }));
};

const BlogsChart = ({ blogs }) => {
  const data = formatData(blogs);
  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Blogs Chart!</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="post"
              stroke="#8884d8"
              fill="#8884d8"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BlogsChart;
