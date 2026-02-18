import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  useEditProduct,
  useGetSingleAdminProduct,
} from "../../hooks/products/useProduct";
import Loading from "../../components/Loading";
import FormInput from "../../components/FormInput";
import ProductImageUpload from "../../components/products/ProductImageUpload";
import FormSelect from "../../components/FormSelect";
import { cryptoCurrency, manufacturer } from "../../utils/dropdowns";

export default function EditProduct() {
  const { id } = useParams();
  const { isLoading, data } = useGetSingleAdminProduct({ id });
  const [mainImage, setMainImage] = useState(null);
  const [exMainImage, setExMainImage] = useState("");
  const [exFeaturedImage, setExFeaturedImage] = useState(null);
  const [featuredImage, setFeaturedImage] = useState(null);
  const [selectedCoins, setSelectedCoins] = useState([]);
  const [specifications, setSpecifications] = useState([]);
  const [faq, setFaq] = useState([]);
  const [schema, setSchema] = useState("");
  const { isPending, editProduct } = useEditProduct();

  //functions for specs form operations
  function addSpecs() {
    setSpecifications([...specifications, { spec: "", value: "" }]);
  }
  function updateSpecs(index, field, value) {
    const updated = [...specifications];
    updated[index][field] = value;
    setSpecifications(updated);
  }
  function removeSpecs(index) {
    setSpecifications(specifications.filter((_, i) => i !== index));
  }
  //functions for faqs form operations
  function addFaqs() {
    setFaq([...faq, { question: "", answer: "" }]);
  }
  function updateFaq(index, field, value) {
    const updated = [...faq];
    updated[index][field] = value;
    setFaq(updated);
  }
  function removeFaq(index) {
    setFaq(faq.filter((_, i) => i !== index));
  }

  //form submission
  function handleSubmit(e) {
    e.preventDefault();
    if (specifications.length < 1) {
      toast.warn("Please add Atleast 1 specification");
      return;
    }
    if (schema) {
      try {
        JSON.parse(schema);
      } catch (error) {
        toast.error("Invalid JSON Schema");
        return;
      }
    }
    const formdata = new FormData(e.target);
    formdata.append("specs", JSON.stringify(specifications));
    formdata.append("faq", JSON.stringify(faq));
    formdata.append("schema", schema);
    formdata.append("cryptoCurrencyItem", JSON.stringify(selectedCoins));
    editProduct({ id, data: formdata });
  }

  useEffect(() => {
    if (data) {
      setExMainImage(data?.product?.productImage);
      setExFeaturedImage(data?.product?.featuredImage);
      setSelectedCoins(data?.product?.cryptoCurrency);
      setFaq(data?.product?.productFaq);
      setSpecifications(data?.product?.productSpecifications);
      setSchema(data?.product?.productSchema);
    }
  }, [data]);

  useEffect(() => {
    return () => {
      if (mainImage) URL.revokeObjectURL(mainImage);
      if (featuredImage) URL.revokeObjectURL(featuredImage);
    };
  }, [mainImage, featuredImage]);
  return isLoading ? (
    <Loading />
  ) : (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl">Create Product</h1>
        <Link
          to={`/products/${id}`}
          className="bg-homeBg p-2 rounded-lg text-white hover:bg-blue-500 nav-link"
        >
          Go Back
        </Link>
      </div>
      <form className="my-10" onSubmit={handleSubmit}>
        {/* product name */}
        <FormInput
          title={"Name"}
          type={"text"}
          name={"productName"}
          placeholder={"Enter Name"}
          defaultValue={data?.product?.productName}
          admin
        />
        {/* product image */}
        {exMainImage && (
          <div>
            <label className="form-label">Current Product Image</label>
            <div className="flex flex-col items-center w-fit">
              <img
                src={exMainImage}
                alt="preview"
                className="w-24 h-24 my-3 object-cover rounded-md"
              />
            </div>
          </div>
        )}
        <div className="flex gap-2 items-end">
          <ProductImageUpload
            title={"Product Image"}
            name={"mainImage"}
            changeFunction={(e) => setMainImage(e.target.files[0])}
          />
          {mainImage && (
            <img
              src={URL.createObjectURL(mainImage)}
              alt="preview"
              className="w-24 h-24 my-3 object-cover rounded-md"
            />
          )}
        </div>
        {/* {Manufacturer} */}
        <FormSelect
          title={"Manufacturer"}
          list={manufacturer}
          name={"manufacturerItem"}
          defaultValue={data?.product?.manufacturer}
        />
        {/* PRODUCT CATEGORY */}
        <FormSelect
          title={"Product Category"}
          list={["None", "Air Cooled", "Immersion", "Hydro", "Home Miner"]}
          name={"productCategory"}
          defaultValue={data?.product?.productCategory}
        />
        {/* cryptocurrency */}
        <div className="form-row">
          <label htmlFor="status" className="form-label">
            CryptoCurrency
          </label>
          <div className="flex items-center">
            <select
              id="status"
              multiple
              onChange={(e) => {
                setSelectedCoins([...selectedCoins, e.target.value]);
              }}
              value={selectedCoins}
              className={`w-full py-1 px-3 rounded-lg bg-transparent border border-[#0B578E] outline-none h-40`}
            >
              {cryptoCurrency?.map((item) => (
                <option
                  className="border-b py-1 border-gray-300 bg-[#CCF2FF] text-black"
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>
        <h3 className="mb-2">Selected Cryptocurrencies:</h3>
        <ul className="my-5">
          {selectedCoins.length && selectedCoins.join(", ")}
        </ul>
        {/* {hashrate} */}
        <FormInput
          title={"HashRate"}
          type={"text"}
          name={"hashRate"}
          defaultValue={data?.product?.hashRate}
          admin
          placeholder={"Enter hashrate"}
        />
        {/* power */}
        <FormInput
          title={"Power (Watts)"}
          type={"Number"}
          name={"power"}
          admin
          defaultValue={data?.product?.power}
          placeholder={"Enter power in Watts"}
        />
        {/* ALGORITHM */}
        <FormInput
          title={"Algorithm"}
          type={"text"}
          name={"algorithm"}
          defaultValue={data?.product?.algorithm}
          admin
          placeholder={"Enter the algorithm of your Miner"}
        />
        {/* PRICE */}
        <FormInput
          title={"Price (AED)"}
          type={"Number"}
          name={"price"}
          defaultValue={data?.product?.price}
          admin
          placeholder={"Enter price of product"}
        />
        {/* FEATURED IMAGE */}
        {exFeaturedImage && (
          <div>
            <label className="form-label">Current Featured Image</label>
            <div className="flex flex-col items-center w-fit">
              <img
                src={exFeaturedImage}
                alt="preview"
                className="w-24 h-24 my-3 object-cover rounded-md"
              />
            </div>
          </div>
        )}
        <div className="flex gap-2 items-end">
          <ProductImageUpload
            title={"Featured Image"}
            name={"featuredImage"}
            changeFunction={(e) => setFeaturedImage(e.target.files[0])}
          />
          {featuredImage && (
            <img
              src={URL.createObjectURL(featuredImage)}
              alt="preview"
              className="w-24 h-24 my-3 object-cover rounded-md"
            />
          )}
        </div>
        {/* DESCRIPTION */}
        <div className="form-row">
          <label className="form-label">Description</label>
          <div className="flex items-center">
            <textarea
              rows={3}
              name="description"
              defaultValue={data?.product?.description}
              className="w-full py-1 px-3 outline-none rounded-lg bg-purple-50 border border-gray-300 text-gray-900"
              placeholder="Enter your description"
              required
            ></textarea>
          </div>
        </div>
        {/* OVERVIEW */}
        <div className="form-row">
          <label className="form-label">Overview</label>
          <div className="flex items-center">
            <textarea
              rows={3}
              name="overview"
              defaultValue={data?.product?.overview}
              className="w-full py-1 px-3 outline-none rounded-lg bg-purple-50 border border-gray-300 text-gray-900"
              placeholder="Enter product overview"
              required
            ></textarea>
          </div>
        </div>
        {/* Specifications */}
        <div className="mb-2">
          <label className="form-label">Specifications</label>
          {specifications?.map((item, index) => (
            <div key={index} className="flex lg:flex-row flex-col gap-2 my-1">
              <input
                type="text"
                value={item.spec}
                onChange={(e) => updateSpecs(index, "spec", e.target.value)}
                placeholder="Enter the specification"
                className="w-full py-1 px-3 rounded-lg bg-white border  outline-none text-gray-900 h-11"
              />
              <input
                type="text"
                value={item.value}
                onChange={(e) => updateSpecs(index, "value", e.target.value)}
                placeholder="Enter value for specification"
                className="w-full py-1 px-3 rounded-lg bg-white border  outline-none text-gray-900 h-11"
              />
              <button
                type="button"
                className="px-2 py-2 rounded-md bg-red-700 text-white"
                onClick={() => removeSpecs(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            className="px-2 mt-3 py-2 rounded-md bg-homeBg text-white"
            onClick={() => addSpecs()}
          >
            Add New Spec
          </button>
        </div>
        {/* FAQS */}
        <div className="mb-2">
          <label className="form-label">FAQ'S</label>
          {faq?.map((item, index) => (
            <div key={index} className="flex lg:flex-row flex-col gap-2 my-1">
              <input
                type="text"
                value={item.question}
                onChange={(e) => updateFaq(index, "question", e.target.value)}
                placeholder="Enter the Question"
                className="w-full py-1 px-3 rounded-lg bg-white border  outline-none text-gray-900 h-11"
              />
              <input
                type="text"
                value={item.answer}
                onChange={(e) => updateFaq(index, "answer", e.target.value)}
                placeholder="Enter the answer"
                className="w-full py-1 px-3 rounded-lg bg-white border  outline-none text-gray-900 h-11"
              />
              <button
                type="button"
                className="px-2 py-2 rounded-md bg-red-700 text-white"
                onClick={() => removeFaq(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            className="px-2 mt-3 py-2 rounded-md bg-homeBg text-white"
            onClick={() => addFaqs()}
          >
            Add New FAQ
          </button>
        </div>
        {/* PRODUCT SCHEMA */}
        <div>
          <label>Product Schema (JSON)</label>
          <textarea
            rows={6}
            className="w-full py-1 font-mono px-3 rounded-lg outline-none bg-purple-50 border border-gray-300 text-gray-900"
            placeholder={`{
    "@context": "https://schema.org",
    "@type": "Product"
  }`}
            value={schema}
            onChange={(e) => setSchema(e.target.value)}
          ></textarea>
        </div>
        {/* for profit mode calculator */}
        <FormInput
          type={"text"}
          title={"Product Profit URL Word"}
          name={"profitURL"}
          admin
          notRequired
          defaultValue={data?.product?.profitURLWord}
          placeholder={"Enter Product name according to ASIC miner site"}
        />
        {/* META TAGS */}
        <FormInput
          type={"text"}
          title={"Product Slug"}
          name={"slug"}
          defaultValue={data?.product?.slug}
          admin
          placeholder={"Enter Product slug"}
        />
        <FormInput
          type={"text"}
          admin
          name={"metaTitle"}
          defaultValue={data?.product?.metaTitle}
          title={"Product Meta Title"}
          placeholder={"Enter Product Meta Title"}
        />
        <FormInput
          type={"text"}
          admin
          name={"alt"}
          defaultValue={data?.product?.imageAltText}
          title={"Alt Text"}
          placeholder={"Enter Product Alt text"}
        />
        <FormInput
          type={"text"}
          admin
          name={"metaDescription"}
          defaultValue={data?.product?.metaDescription}
          title={"Product Meta Description"}
          placeholder={"Enter Product Meta description"}
        />
        <FormInput
          type={"text"}
          admin
          name={"metaKeywords"}
          defaultValue={data?.product?.metaKeywords}
          title={"Product Meta Keywords"}
          placeholder={"Enter Product Meta keywords"}
        />
        <button
          type="submit"
          disabled={isPending}
          className="bg-homeBg p-2 rounded-lg text-white hover:bg-blue-500 nav-link"
        >
          Save Product
        </button>
        {isPending && <Loading />}
      </form>
    </div>
  );
}
