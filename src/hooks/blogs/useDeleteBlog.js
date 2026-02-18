import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../../services/api";

const useDeleteBlog = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const deleteBlog = async ({ id }) => {
    setLoading(true);
    try {
      const res = await api.delete(`/admin/blogs/${id}`);
      const data = res.data;
      if (data.msg === "success") {
        toast.success("blog deleted");
        navigate("/blogs");
      } else {
        toast.error(data.msg);
      }
    } catch (err) {
      toast.error(
        err?.response?.data?.msg || err?.error || "something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };
  return { loading, deleteBlog };
};

export default useDeleteBlog;
