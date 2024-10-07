import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

//function for add product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestSeller,
    } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );
    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      bestSeller: bestSeller === "true" ? true : false,
      sizes: JSON.parse(sizes),
      image: imagesUrl,
      date: Date.now(),
    };

    console.log(productData);
    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: "Product Add Successfull." });
  } catch (err) {
    console.log(err.message);
    res.json({ sucess: false, message: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestSeller,
    } = req.body;

    // Find the product by ID
    const product = await productModel.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found." });
    }

    // Update fields with new values
    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = Number(price);
    if (category) product.category = category;
    if (subCategory) product.subCategory = subCategory;
    if (sizes) product.sizes = JSON.parse(sizes);
    if (bestSeller) product.bestSeller = bestSeller === "true";

    // Handle file uploads for images
    const images = [];
    const imageKeys = ["image1", "image2", "image3", "image4"];

    for (const key of imageKeys) {
      const file = req.files[key] && req.files[key][0];
      if (file) {
        // Upload new image and get URL
        let result = await cloudinary.uploader.upload(file.path, {
          resource_type: "image",
        });
        images.push(result.secure_url);
      }
    }

    // If images were uploaded, update the product's images
    if (images.length > 0) {
      product.image = images; // You can choose to append or replace the existing images
    }

    // Save the updated product
    await product.save();

    res.json({ success: true, message: "Product updated successfully." });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

//function for list product
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (err) {
    console.log(err);
    res.json({ sucess: false, message: err.message });
  }
};

//function for remove product
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product removes successfully." });
  } catch (err) {
    console.log(err);
    res.json({ sucess: false, message: err.message });
  }
};

//single product info
// const singleProduct = async (req, res) => {
//   try {
//     const { productId } = req.body;
//     const product = await productModel.findById(productId);

//     res.json({ success: true, product });
//   } catch (err) {
//     console.log(err);
//     res.json({ sucess: false, message: err.message });
//   }
// };
const singleProduct = async (req, res) => {
  try {
    // Use Mongoose's findById method to find the product by its ID
    const product = await productModel.findById(req.params.productId);

    // Check if the product was found
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // Return the found product
    res.json({ success: true, product });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message }); // Return error response
  }
};

export {
  addProduct,
  updateProduct,
  listProducts,
  removeProduct,
  singleProduct,
};
