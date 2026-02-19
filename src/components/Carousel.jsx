import React from "react";

export default function Carousel({ images, alt }) {
  return (
    <>
      <div className="carousel w-full">
        {images?.map((item) => (
          <div
            id={item.publicId}
            className="carousel-item w-full"
            key={item.publicId}
          >
            <img
              src={item.url}
              alt={alt}
              className="w-full object-cover h-[500px]"
            />
          </div>
        ))}
      </div>
      <div className="flex w-full justify-center gap-2 py-2">
        {images?.map((item, i) => (
          <a
            href={`#${item.publicId}`}
            className="btn btn-xs"
            key={item.publicId}
          >
            {i + 1}
          </a>
        ))}
      </div>
    </>
  );
}
