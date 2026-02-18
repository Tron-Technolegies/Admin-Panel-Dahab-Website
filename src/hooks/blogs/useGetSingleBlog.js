import React, { useEffect, useState } from "react";
import { api } from "../../services/api";

const useGetSingleBlog = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState(null);
  const getBlog = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/admin/blogs/${id}`);
      const data = res.data;
      if (data.msg === "success") {
        setBlog(data.blog);
      } else {
        console.log(data.msg);
      }
    } catch (err) {
      console.log(
        err?.response?.data?.msg || err?.error || "something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getBlog();
  }, []);
  return { loading, blog };
};

export default useGetSingleBlog;
