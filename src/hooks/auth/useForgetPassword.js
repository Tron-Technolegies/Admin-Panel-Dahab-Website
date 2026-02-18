import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../../services/api";

const useForgetPassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const forgotPassword = async ({ email }) => {
    setLoading(true);
    try {
      const res = await api.post(`admin/auth/forgot-password`, { email });
      const data = res.data;
      if (data.msg === "success") {
        toast.success("A verification code has been sent to your email");
        navigate("/reset-password");
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
  return { loading, forgotPassword };
};

export default useForgetPassword;
