import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../../services/api";

const useLoginUser = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async ({ email, password }) => {
    setLoading(true);
    try {
      const res = await api.post(`admin/auth/login`, { email, password });
      const data = res.data;
      if (data.msg === "successfully logged in") {
        toast.success("login success");
        navigate("/dashboard");
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
  return { loading, login };
};

export default useLoginUser;
