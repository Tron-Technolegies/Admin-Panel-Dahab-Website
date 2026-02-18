import { api } from "../../services/api";
import { useQuery } from "@tanstack/react-query";

export const useGetDashboardStats = () => {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const { data } = await api.get(`admin/dashboard/stats`);
      return data;
    },
  });
  return { isError, isLoading, data, error };
};
