import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";

export const useGetUserInfo = () => {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["user-info"],
    queryFn: async () => {
      const { data } = await api.get("admin/auth/user");
      return data.userInfo;
    },
  });
  return { isLoading, data, isError, error };
};
