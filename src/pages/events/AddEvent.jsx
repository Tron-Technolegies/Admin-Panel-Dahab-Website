import React, { useEffect, useState } from "react";
import { useAddEvent } from "../../hooks/events/useAdminEvents";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import FormInput from "../../components/FormInput";
import JoditEditor from "jodit-react";
import { BsUpload } from "react-icons/bs";
import Loading from "../../components/Loading";

export default function AddEvent() {
  const [mainContent, setMainContent] = useState("");
  const [bottomContent, setBottomContent] = useState("");
  const [mainImage, setMainImage] = useState("");
  const [smallImage, setSmallImage] = useState("");
  const [extraImage, setExtraImage] = useState("");
  const [carouselImages, setCarouselImages] = useState([]);
  const { isPending, addEvent } = useAddEvent();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mainImage) {
      return toast.error("Main Image is required");
    }
    if (!smallImage) {
      return toast.error("Small Image is required");
    }
    const formData = new FormData(e.target);
    formData.append("mainContent", mainContent);
    formData.append("bottomContent", bottomContent);
    await addEvent(formData);
  };

  useEffect(() => {
    return () => {
      if (mainImage) URL.revokeObjectURL(mainImage);
      if (smallImage) URL.revokeObjectURL(smallImage);
      if (extraImage) URL.revokeObjectURL(extraImage);
      carouselImages.forEach((img) => URL.revokeObjectURL(img));
    };
  }, [mainImage, smallImage, extraImage, carouselImages]);
  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl">Add Event</h1>
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
          placeholder={"Enter title for the event"}
          admin
        />
        <FormInput name={"date"} title={"Event Date"} type={"date"} admin />
        <div>
          <label className="form-label">Main Event Content</label>
          <JoditEditor
            value={mainContent}
            onBlur={(newContent) => setMainContent(newContent)}
          />
        </div>
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
          placeholder={"Enter the event location"}
          admin
        />
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
          placeholder={"Event hosted By"}
          admin
          notRequired
        />
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
          placeholder={"Enter the slug for seo"}
          admin
        />
        <FormInput
          title={"Alt Text"}
          name={"altText"}
          type={"text"}
          placeholder={"Enter alt text for all images"}
          admin
        />
        <FormInput
          title={"Meta Title"}
          name={"metaTitle"}
          type={"text"}
          placeholder={"Enter Meta title for seo"}
          admin
        />
        <FormInput
          title={"Meta Description"}
          name={"metaDescription"}
          type={"text"}
          placeholder={"Enter Meta Description for seo"}
          admin
        />
        <FormInput
          title={"Meta Keywords (comma seperated)"}
          name={"metaKeywords"}
          type={"text"}
          placeholder={"Enter Meta Keywords for seo"}
          admin
        />
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
          className="px-4 py-2 rounded-md bg-homeBg hover:bg-homeBgGradient text-white w-fit self-end"
        >
          Add Event
        </button>
        {isPending && <Loading />}
      </form>
    </div>
  );
}
