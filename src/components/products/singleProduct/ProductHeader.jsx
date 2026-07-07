import React from "react";
import { Link } from "react-router-dom";

export default function ProductHeader({ img, name, price, isOutOfStock }) {
  return (
    <div className="bg-btnGreen flex md:flex-row flex-col justify-between items-center p-5 rounded-lg">
      <div className="flex md:flex-row flex-col gap-5 items-center">
        <div className="relative">
          <img
            src={img}
            className="w-52 h-52 rounded-lg overflow-hidden"
            alt={name}
          />
          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-gradient-to-br from-black/70 via-black/50 to-black/70 backdrop-blur-[1px]">
              <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 px-4 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-md">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-rose-500/20 to-red-500/20" />
                <span className="relative text-sm font-semibold uppercase tracking-[0.2em] text-white">
                  Out of Stock
                </span>
              </div>
            </div>
          )}
        </div>
        <div>
          <h1 className="text-2xl font-semibold my-2">{name}</h1>
          <p className="text-xl font-light">{`${price} AED`}</p>
        </div>
      </div>
      <Link
        to={"/products"}
        className="flex p-2 bg-homeBg rounded-lg hover:bg-blue-500 text-white nav-link"
      >
        Go Back
      </Link>
    </div>
  );
}
