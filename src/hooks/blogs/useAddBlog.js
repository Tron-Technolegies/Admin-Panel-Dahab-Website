import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../../services/api";

const useAddBlog = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const addBlog = async ({
    title,
    blogImage,
    blogImagePublicId,
    content,
    slug,
    metaTitle,
    metaDescription,
    metaKeywords,
  }) => {
    setLoading(true);
    try {
      const res = await api.post(`/admin/blogs`, {
        title,
        blogImage,
        blogImagePublicId,
        content,
        slug,
        metaTitle,
        metaDescription,
        metaKeywords,
      });
      const data = res.data;
      if (data.msg === "success") {
        toast.success("New Product added successfully");
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
  return { loading, addBlog };
};

export default useAddBlog;
