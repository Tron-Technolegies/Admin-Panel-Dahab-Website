import React, { useEffect, useState } from "react";
import { MdVerified } from "react-icons/md";

import Loading from "../../Loading";
import {
  useMakeFeatured,
  useRemoveFeatured,
} from "../../../hooks/products/useProduct";

export default function FeaturedSection({ img, name, isFeatured, id }) {
  const { isPending, makeFeatured } = useMakeFeatured();
  const { isPending: isPending2, removeFeatured } = useRemoveFeatured();

  const featured = async () => {
    makeFeatured({ id });
  };

  const unFeatured = async () => {
    removeFeatured({ id });
  };

  return (
    <div className="p-5">
      <div className="flex justify-between my-5 items-center">
        <div className="flex gap-2 items-center">
          <h1 className="text-2xl">Featured Image</h1>
          {isFeatured && (
            <p className="text-xl text-green-500">
              <MdVerified />
            </p>
          )}
        </div>
        {!isFeatured && (
          <>
            <button
              className="bg-homeBg p-2 text-white rounded-lg hover:bg-blue-500"
              onClick={featured}
              disabled={isPending}
            >
              Make featured
            </button>
            {isPending && <Loading />}
          </>
        )}
        {isFeatured && (
          <>
            <button
              className="bg-red-500 p-2 text-white rounded-lg hover:bg-red-400"
              onClick={unFeatured}
              disabled={isPending2}
            >
              Remove Featured
            </button>
            {isPending2 && <Loading />}
          </>
        )}
      </div>
      <img className="w-56 h-56 rounded-lg" src={img} alt={name}></img>
    </div>
  );
}
