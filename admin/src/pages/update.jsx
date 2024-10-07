import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { backendUrl } from "../App";
import { assets } from "../assets/assets";

const Update = ({ token }) => {
  const { productId } = useParams();
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);
  const [product, setProduct] = useState(null);

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestSeller, setBestSeller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const getProductDetails = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/product/single/${productId}`
      );
      if (response.data.success) {
        const product = response.data.product;

        setProduct(product);

        setName(product.name);
        setDescription(product.description);
        setPrice(product.price);
        setCategory(product.category);
        setSubCategory(product.subCategory);
        setBestSeller(product.bestSeller);
        setSizes(product.sizes);
        // Assuming you also want to set the images
        setImage1(product.image1);
        setImage2(product.image2);
        setImage3(product.image3);
        setImage4(product.image4);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    getProductDetails();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      if (image1 instanceof File) {
        formData.append("image1", image1);
      } else if (product && product.image1) {
        formData.append("image1", product.image1);
      }

      if (image2 instanceof File) {
        formData.append("image2", image2);
      } else if (product && product.image2) {
        formData.append("image2", product.image2);
      }

      if (image3 instanceof File) {
        formData.append("image3", image3);
      } else if (product && product.image3) {
        formData.append("image3", product.image3);
      }

      if (image4 instanceof File) {
        formData.append("image4", image4);
      } else if (product && product.image4) {
        formData.append("image4", product.image4);
      }

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestSeller", bestSeller);
      formData.append("sizes", JSON.stringify(sizes));

      const response = await axios.put(
        `${backendUrl}/api/product/update/${productId}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/list");
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full items-start gap-3"
    >
      {/* Image Upload Section */}
      <div>
        <p className="mb-2">Upload Image</p>
      </div>
      <div className="flex gap-2">
        {[image1, image2, image3, image4].map((img, index) => {
          //const image = [image1, image2, image3, image4][index];
          const currentImage =
            img instanceof File
              ? URL.createObjectURL(img)
              : product && product[`image${index + 1}`];
          return (
            <label key={index} htmlFor={`image${index + 1}`}>
              <img
                className="w-20 cursor-pointer"
                src={currentImage || assets.upload_area}
                alt={`Image ${index + 1}`}
              />
              <input
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (index === 0) setImage1(file);
                  if (index === 1) setImage2(file);
                  if (index === 2) setImage3(file);
                  if (index === 3) setImage4(file);
                }}
                type="file"
                id={`image${index + 1}`}
                hidden
              />
            </label>
          );
        })}
      </div>

      {/* Form Fields */}
      <div className="w-full">
        <p className="mb-2">Product Name</p>
        <input
          className="w-full max-w-[500px] px-3 py-2"
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          placeholder="Product Title"
          required
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Product Description</p>
        <textarea
          className="w-full max-w-[500px] px-3 py-2"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          placeholder="Write content here"
          required
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product Category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="w-full px-3 py-2"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Sub Category</p>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            value={subCategory}
            className="w-full px-3 py-2"
          >
            <option value="Topwear">Topwear</option>
            <option value="BottomWear">BottomWear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Product Price</p>
          <input
            className="w-full px-3 py-2 sm:w-[120px]"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            type="number"
            placeholder="30"
            required
          />
        </div>
      </div>

      {/* Sizes Section */}
      <div>
        <p className="mb-2">Product Sizes</p>
        <div className="flex gap-3">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <div
              key={size}
              onClick={() =>
                setSizes((prev) =>
                  prev.includes(size)
                    ? prev.filter((item) => item !== size)
                    : [...prev, size]
                )
              }
            >
              <p
                className={`${
                  sizes.includes(size) ? "bg-pink-100" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
                {size}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Best Seller Checkbox */}
      <div className="flex gap-2 mt-2">
        <input
          onChange={() => setBestSeller((prev) => !prev)}
          checked={bestSeller}
          type="checkbox"
          id="bestseller"
        />
        <label className="cursor-pointer" htmlFor="bestseller">
          Add to BestSeller
        </label>
      </div>

      {/* Submit Button */}
      <button type="submit" className="w-28 py-3 mt-4 bg-black text-white">
        UPDATE
      </button>
    </form>
  );
};

export default Update;
