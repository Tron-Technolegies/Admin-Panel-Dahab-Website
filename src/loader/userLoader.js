import { redirect } from "react-router-dom";
import { api } from "../services/api";

export const userLoader = async () => {
  try {
    const response = await api.get("admin/auth/user");
    const user = response.data?.userInfo;
    const allowedRoles = ["admin", "superAdmin", "repairAdmin"];
    if (!user || !allowedRoles.includes(user.role)) {
      throw new Error("No Access");
    }
    return user;
  } catch (error) {
    return redirect("/login");
  }
};
