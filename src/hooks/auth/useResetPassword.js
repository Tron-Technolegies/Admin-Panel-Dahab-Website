import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../../services/api";

const useResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const resetPassword = async ({
    email,
    verificationCode,
    password,
    confirmPassword,
  }) => {
    setLoading(true);
    if (password !== confirmPassword) {
      toast.error("Passwords does not match");
      return;
    }
    try {
      const res = await api.post(`admin/auth/reset-password`, {
        email,
        verificationCode,
        password,
      });
      const data = res.data;
      if (data.msg === "success") {
        toast.success("Password reset successfull");
        navigate("/auth/login");
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
  return { loading, resetPassword };
};

export default useResetPassword;
