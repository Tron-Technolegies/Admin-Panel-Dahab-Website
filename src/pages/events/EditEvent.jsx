import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  useDeleteImage,
  useEditEvent,
  useGetSingleEvent,
} from "../../hooks/events/useAdminEvents";
import Loading from "../../components/Loading";
import FormInput from "../../components/FormInput";
import JoditEditor from "jodit-react";
import { IoTrash } from "react-icons/io5";
import { BsUpload } from "react-icons/bs";

export default function EditEvent() {
  const { id } = useParams();
  const { isError, isLoading, data } = useGetSingleEvent({ id });
  const [mainContent, setMainContent] = useState(data?.mainContent || "");
  const [bottomContent, setBottomContent] = useState(data?.bottomContent || "");
  const [mainImage, setMainImage] = useState("");
  const [smallImage, setSmallImage] = useState("");
  const [extraImage, setExtraImage] = useState("");
  const [carouselImages, setCarouselImages] = useState([]);
  const [oldMainImg, setOldMainImg] = useState(null);
  const [oldsmallImg, setOldSmallImg] = useState(null);
  const [oldExtraImg, setOldExtraImg] = useState(null);
  const [oldCarouselImg, setOldCarouselImg] = useState([]);
  const { isPending, deleteImage } = useDeleteImage();
  const { isPending: editPending, editEvent } = useEditEvent();

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("mainContent", mainContent);
    formData.append("bottomContent", bottomContent);
    editEvent({ data: formData, id });
  }

  useEffect(() => {
    if (data) {
      setMainContent(data.mainContent);
      setBottomContent(data.bottomContent);
      setOldMainImg(data.mainImage);
      setOldSmallImg(data.smallImage);
      setOldExtraImg(data.extraImage);
      setOldCarouselImg(data.carouselImages);
    }
  }, [data]);

  useEffect(() => {
    return () => {
      if (mainImage) URL.revokeObjectURL(mainImage);
      if (smallImage) URL.revokeObjectURL(smallImage);
      if (extraImage) URL.revokeObjectURL(extraImage);
      carouselImages.forEach((img) => URL.revokeObjectURL(img));
    };
  }, [mainImage, smallImage, extraImage, carouselImages]);
  return isLoading ? (
    <Loading />
  ) : isError ? (
    <p>Something went wrong</p>
  ) : (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl">Edit Event</h1>
        <Link
          to={"/events"}
          className="bg-homeBg p-2 rounded-lg text-white hover:bg-blue-500 nav-link"
        >
          Go Back
        </Link>
      </div>
      <form className="my-5 flex flex-col" onSubmit={handleSubmit}>
        <FormInput
          name={"title"}
          title={"Event Title"}
          type={"text"}
          defaultValue={data.title}
          placeholder={"Enter title for the event"}
          admin
        />
        <FormInput
          name={"date"}
          title={"Event Date"}
          type={"date"}
          defaultValue={data.date.toString().slice(0, 10)}
          admin
        />
        <div>
          <label className="form-label">Main Event Content</label>
          <JoditEditor
            value={mainContent}
            onBlur={(newContent) => setMainContent(newContent)}
          />
        </div>
        {oldMainImg && (
          <div>
            <label className="form-label">Current Main Image</label>
            <div className="flex flex-col items-center w-fit">
              <img
                src={oldMainImg.url}
                alt="preview"
                className="w-24 h-24 my-3 object-cover rounded-md"
              />
              <button
                type="button"
                disabled={isPending}
                onClick={() =>
                  deleteImage({
                    eventId: id,
                    imageType: "main",
                    publicId: oldMainImg.publicId,
                  })
                }
              >
                <IoTrash className="text-red-500 cursor-pointer" />
              </button>
            </div>
          </div>
        )}
        <div className="my-3">
          <h4 className="form-label">
            Main Event Image (Image shown on Single Page)
          </h4>
          <label
            className={`flex flex-col gap-2 justify-center border w-fit items-center p-3 rounded-lg border-blue-500 cursor-pointer hover:bg-blue-700 nav-link hover:text-white `}
          >
            <input
              type="file"
              className="hidden"
              accept="image/*"
              name="mainImage"
              onChange={(e) => setMainImage(e.target.files[0])}
              multiple={false}
            />
            <div className="text-xl">
              <BsUpload />
            </div>
            <p>Upload</p>
          </label>
          {mainImage && (
            <img
              src={URL.createObjectURL(mainImage)}
              alt="preview"
              className="w-24 h-24 my-3 object-cover rounded-md"
            />
          )}
        </div>
        <FormInput
          name={"location"}
          title={"Event Location"}
          type={"text"}
          defaultValue={data.location}
          placeholder={"Enter the event location"}
          admin
        />
        {isPending && <Loading />}
        {oldsmallImg && (
          <div>
            <label className="form-label">Current Small Image</label>
            <div className="flex flex-col items-center w-fit">
              <img
                src={oldsmallImg.url}
                alt="preview"
                className="w-24 h-24 my-3 object-cover rounded-md"
              />
              <button
                onClick={() =>
                  deleteImage({
                    eventId: id,
                    imageType: "small",
                    publicId: oldsmallImg.publicId,
                  })
                }
                disabled={isPending}
                type="button"
              >
                <IoTrash className="text-red-500 cursor-pointer" />
              </button>
            </div>
          </div>
        )}
        <div className="my-3">
          <h4 className="form-label">Small Image (Image shown on the list)</h4>
          <label
            className={`flex flex-col gap-2 justify-center border w-fit items-center p-3 rounded-lg border-blue-500 cursor-pointer hover:bg-blue-700 nav-link hover:text-white `}
          >
            <input
              type="file"
              className="hidden"
              accept="image/*"
              name="smallImage"
              onChange={(e) => setSmallImage(e.target.files[0])}
              multiple={false}
            />
            <div className="text-xl">
              <BsUpload />
            </div>
            <p>Upload</p>
          </label>
          {smallImage && (
            <img
              src={URL.createObjectURL(smallImage)}
              alt="preview"
              className="w-24 h-24 my-3 object-cover rounded-md"
            />
          )}
        </div>

        <FormInput
          title={"Event Hosted By (if any)"}
          name={"hostedBy"}
          type={"text"}
          defaultValue={data.hostedBy}
          placeholder={"Event hosted By"}
          admin
          notRequired
        />
        {oldExtraImg && (
          <div>
            <label className="form-label">Current Extra Image</label>
            <div className="flex flex-col items-center w-fit">
              <img
                src={oldExtraImg.url}
                alt="preview"
                className="w-24 h-24 my-3 object-cover rounded-md"
              />
              <button
                type="button"
                onClick={() => {
                  deleteImage({
                    eventId: id,
                    publicId: oldExtraImg.publicId,
                    imageType: "extra",
                  });
                }}
                disabled={isPending}
              >
                <IoTrash className="text-red-500 cursor-pointer" />
              </button>
            </div>
            {isPending && <Loading />}
          </div>
        )}
        <div className="my-3">
          <h4 className="form-label">
            Extra Image (Image shown between content)
          </h4>
          <label
            className={`flex flex-col gap-2 justify-center border w-fit items-center p-3 rounded-lg border-blue-500 cursor-pointer hover:bg-blue-700 nav-link hover:text-white `}
          >
            <input
              type="file"
              className="hidden"
              accept="image/*"
              name="extraImage"
              onChange={(e) => setExtraImage(e.target.files[0])}
              multiple={false}
            />
            <div className="text-xl">
              <BsUpload />
            </div>
            <p>Upload</p>
          </label>
          {extraImage && (
            <img
              src={URL.createObjectURL(extraImage)}
              alt="preview"
              className="w-24 h-24 my-3 object-cover rounded-md"
            />
          )}
        </div>
        <div>
          <label className="form-label">
            Bottom Event Content(content to be shown after image)
          </label>
          <JoditEditor
            value={bottomContent}
            onBlur={(newContent) => setBottomContent(newContent)}
          />
        </div>
        <FormInput
          title={"Slug"}
          name={"slug"}
          type={"text"}
          defaultValue={data.slug}
          placeholder={"Enter the slug for seo"}
          admin
        />
        <FormInput
          title={"Alt Text"}
          name={"altText"}
          type={"text"}
          defaultValue={data.altText}
          placeholder={"Enter alt text for all images"}
          admin
        />
        <FormInput
          title={"Meta Title"}
          name={"metaTitle"}
          type={"text"}
          placeholder={"Enter Meta title for seo"}
          defaultValue={data.metaTitle}
          admin
        />
        <FormInput
          title={"Meta Description"}
          name={"metaDescription"}
          type={"text"}
          defaultValue={data.metaDescription}
          placeholder={"Enter Meta Description for seo"}
          admin
        />
        <FormInput
          title={"Meta Keywords (comma seperated)"}
          name={"metaKeywords"}
          type={"text"}
          defaultValue={data.metaKeywords}
          placeholder={"Enter Meta Keywords for seo"}
          admin
        />
        {oldCarouselImg.length > 0 && (
          <div>
            <label className="form-label">Current Carousel Images</label>
            <div className="flex gap-2 items-center">
              {oldCarouselImg.map((x) => (
                <div
                  className="flex flex-col items-center w-fit"
                  key={x.publicId}
                >
                  <img
                    src={x.url}
                    alt="preview"
                    className="w-24 h-24 my-3 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    disabled={isPending}
                    onClick={() =>
                      deleteImage({
                        eventId: id,
                        publicId: x.publicId,
                        imageType: "carousel",
                      })
                    }
                  >
                    <IoTrash className="text-red-500 cursor-pointer" />
                  </button>
                </div>
              ))}
              {isPending && <Loading />}
            </div>
          </div>
        )}
        <div className="my-3">
          <h4 className="form-label">
            Carousel Images (Image shown for carousel, if any)
          </h4>
          <label
            className={`flex flex-col gap-2 justify-center border w-fit items-center p-3 rounded-lg border-blue-500 cursor-pointer hover:bg-blue-700 nav-link hover:text-white `}
          >
            <input
              type="file"
              className="hidden"
              accept="image/*"
              name="carouselImages"
              onChange={(e) => {
                const files = Array.from(e.target.files);
                if (!files.length) return;
                setCarouselImages(files);
              }}
              multiple
            />
            <div className="text-xl">
              <BsUpload />
            </div>
            <p>Upload</p>
          </label>
          <div className="flex gap-2 items-center">
            {carouselImages.length > 0 &&
              carouselImages.map((item, i) => {
                return (
                  <div className="flex gap-2 items-center" key={i}>
                    <img
                      src={URL.createObjectURL(item)}
                      alt="preview"
                      className="w-24 h-24 my-3 object-cover rounded-md"
                    />
                  </div>
                );
              })}
          </div>
        </div>
        <button
          type="submit"
          disabled={editPending}
          className="px-4 py-2 rounded-md bg-homeBg hover:bg-homeBgGradient text-white w-fit self-end"
        >
          Edit Event
        </button>
        {editPending && <Loading />}
      </form>
    </div>
  );
}
