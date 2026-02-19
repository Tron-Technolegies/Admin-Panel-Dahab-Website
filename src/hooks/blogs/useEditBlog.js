import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../../services/api";

const useEditBlog = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const editBlog = async ({
    title,
    blogImage,
    blogImagePublicId,
    content,
    slug,
    metaTitle,
    metaDescription,
    metaKeywords,
    id,
  }) => {
    setLoading(true);
    try {
      const res = await api.patch(`/admin/blogs/edit/${id}`, {
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
        toast.success("blog updated successfully");
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
  return { loading, editBlog };
};

export default useEditBlog;
