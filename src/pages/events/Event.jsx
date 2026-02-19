import React from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import EventList from "../../components/events/EventList";

export default function Event() {
  return (
    <div>
      <div className="flex justify-end">
        <Link
          to={"/events/new"}
          className="flex gap-3 items-center bg-homeBg p-2 rounded-lg text-white hover:bg-blue-500 nav-link"
        >
          Add New Event
          <span>
            <FaPlus />
          </span>
        </Link>
      </div>
      <h1 className="text-2xl my-2">All Events</h1>
      <EventList />
    </div>
  );
}
