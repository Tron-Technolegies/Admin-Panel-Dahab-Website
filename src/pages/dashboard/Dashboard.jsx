import React from "react";
import DashboardDetailBox from "../../components/dashboard/DashboardDetailBox";
import Loading from "../../components/Loading";
import { useGetDashboardStats } from "../../hooks/dashboard/useGetDashboardStats";

export default function Dashboard() {
  const { isError, isLoading, data, error } = useGetDashboardStats();
  return isLoading ? (
    <Loading />
  ) : (
    <div className="p-3">
      <div className="grid gap-5 grid-cols-2">
        <DashboardDetailBox title={"Products"} value={data.products} />
        <DashboardDetailBox title={"Blogs"} value={data.blogs} />
      </div>
    </div>
  );
}
