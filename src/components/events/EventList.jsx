import EventCard from "./EventCard";
import { useGetEvents } from "../../hooks/events/useAdminEvents";
import Loading from "../Loading";

export default function EventList() {
  const { isLoading, isError, data } = useGetEvents();
  return isLoading ? (
    <Loading />
  ) : isError ? (
    <p>Something went wrong</p>
  ) : (
    <div className="my-5">
      {data.length < 1 && (
        <p className="text-center my-5 text-lg">No Events Available</p>
      )}
      <div className="grid md:grid-cols-2 gap-y-5 lg:grid-cols-3 place-items-center">
        {data?.map((item) => (
          <EventCard key={item._id} {...item} />
        ))}
      </div>
    </div>
  );
}
