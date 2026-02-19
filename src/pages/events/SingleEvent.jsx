import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetSingleEvent } from "../../hooks/events/useAdminEvents";
import Loading from "../../components/Loading";
import { CiLocationOn } from "react-icons/ci";
import { IoCalendar } from "react-icons/io5";
import Carousel from "../../components/Carousel";

export default function SingleEvent() {
  const { id } = useParams();
  const { isError, isLoading, data } = useGetSingleEvent({ id });
  return isLoading ? (
    <Loading />
  ) : isError ? (
    <p>Something went wrong</p>
  ) : (
    <div className="p-5">
      <Link
        to={"/events"}
        className="px-4 py-2 rounded-md text-white bg-homeBg hover:bg-homeBgGradient ms-auto"
      >
        Go Back
      </Link>
      <div className="flex gap-10 md:flex-row flex-col items-center mt-10">
        <div className="md:w-1/3 w-full flex flex-col gap-2">
          <p className="font-semibold md:text-2xl text-lg md:text-left text-center w-full">
            {data.title}
          </p>
          <p className="flex gap-2 items-center md:text-left text-center">
            <CiLocationOn />
            <span>{data.location}</span>
          </p>
          <p className="flex gap-2 items-center md:text-left text-center">
            <IoCalendar />
            <span>{new Date(data.date).toLocaleDateString("en-US")}</span>
          </p>
          {data.hostedBy && (
            <p className="md:text-left text-center w-full">
              Hosted By: <span className="font-semibold">{data.hostedBy}</span>
            </p>
          )}
        </div>
        <img
          src={data.mainImage?.url}
          alt={data.altText}
          className="md:w-2/3 object-cover rounded-lg max-h-[500px]"
        />
      </div>
      <p
        className="text-gray-700 text-justify leading-9 my-5"
        dangerouslySetInnerHTML={{ __html: data.mainContent }}
      ></p>
      {data.extraImage && (
        <img
          src={data.extraImage?.url}
          alt={data.altText}
          className="object-cover rounded-md my-5 lg:max-w-[900px] mx-auto"
        />
      )}
      {data.bottomContent && (
        <p
          className="text-gray-700 text-justify leading-9 my-5"
          dangerouslySetInnerHTML={{ __html: data.bottomContent }}
        ></p>
      )}
      <div className="my-5 max-w-[900px] mx-auto">
        <Carousel images={data.carouselImages} alt={data.altText} />
      </div>
    </div>
  );
}
