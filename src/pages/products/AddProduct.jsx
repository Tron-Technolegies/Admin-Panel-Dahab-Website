import React, { useEffect, useState } from "react";
import { useAddProduct } from "../../hooks/products/useProduct";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import FormInput from "../../components/FormInput";
import ProductImageUpload from "../../components/products/ProductImageUpload";
import FormSelect from "../../components/FormSelect";
import { cryptoCurrency, manufacturer } from "../../utils/dropdowns";
import Loading from "../../components/Loading";

export default function AddProduct() {
  const [mainImage, setMainImage] = useState(null);
  const [featuredImage, setFeaturedImage] = useState(null);
  const [selectedCoins, setSelectedCoins] = useState([]);
  const [specifications, setSpecifications] = useState([]);
  const [faq, setFaq] = useState([]);
  const [schema, setSchema] = useState("");
  const { isPending, addProduct } = useAddProduct();

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
    if (!mainImage) {
      toast.warn("Please add a main image");
      return;
    }
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

    addProduct(formdata);
  }

  useEffect(() => {
    return () => {
      if (mainImage) URL.revokeObjectURL(mainImage);
      if (featuredImage) URL.revokeObjectURL(featuredImage);
    };
  }, [mainImage, featuredImage]);
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl">Create Product</h1>
        <Link
          to={"/products"}
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
          admin
        />
        {/* product image */}
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
        />
        {/* PRODUCT CATEGORY */}
        <FormSelect
          title={"Product Category"}
          list={["None", "Air Cooled", "Immersion", "Hydro", "Home Miner"]}
          name={"productCategory"}
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
          admin
          placeholder={"Enter hashrate"}
        />
        {/* power */}
        <FormInput
          title={"Power (Watts)"}
          type={"Number"}
          name={"power"}
          admin
          placeholder={"Enter power in Watts"}
        />
        {/* ALGORITHM */}
        <FormInput
          title={"Algorithm"}
          type={"text"}
          name={"algorithm"}
          admin
          placeholder={"Enter the algorithm of your Miner"}
        />
        {/* PRICE */}
        <FormInput
          title={"Price (AED)"}
          type={"Number"}
          name={"price"}
          admin
          placeholder={"Enter price of product"}
        />
        {/* FEATURED IMAGE */}
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
          placeholder={"Enter Product name according to ASIC miner site"}
        />
        {/* META TAGS */}
        <FormInput
          type={"text"}
          title={"Product Slug"}
          name={"slug"}
          admin
          placeholder={"Enter Product slug"}
        />
        <FormInput
          type={"text"}
          admin
          name={"metaTitle"}
          title={"Product Meta Title"}
          placeholder={"Enter Product Meta Title"}
        />
        <FormInput
          type={"text"}
          admin
          name={"alt"}
          title={"Alt Text"}
          placeholder={"Enter Product alt text"}
        />
        <FormInput
          type={"text"}
          admin
          name={"metaDescription"}
          title={"Product Meta Description"}
          placeholder={"Enter Product Meta description"}
        />
        <FormInput
          type={"text"}
          admin
          name={"metaKeywords"}
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
