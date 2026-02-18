import axios from "axios";
import React, { useEffect, useState } from "react";
import { api } from "../../services/api";

const useGetAllBlogs = () => {
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);

  const getAllBlogs = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/admin/blogs`);
      const data = res.data;
      if (data.msg === "success") {
        setBlogs(data.blogs);
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
    getAllBlogs();
  }, []);

  const refetch = () => {
    getAllBlogs();
  };

  return { loading, blogs, refetch };
};

export default useGetAllBlogs;
