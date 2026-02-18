import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../../services/api";

const useLogoutUser = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const logout = async () => {
    setLoading(true);
    try {
      const res = await api.post(`admin/auth/logout`);
      const data = res.data;
      if (data.msg === "successfully logged out") {
        toast.success("successfully logged out");
        navigate("/login");
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
  return { loading, logout };
};

export default useLogoutUser;
