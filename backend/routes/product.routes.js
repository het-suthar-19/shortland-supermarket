import express from "express";
import { authenticate, isAdmin } from "../middleware/auth.middleware.js";
import {
  getAllProducts,
  getProductById,
  getDiscountProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/product.service.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { category, search, page = 1, limit = 12 } = req.query;
    const result = await getAllProducts(
      category,
      search,
      parseInt(page),
      parseInt(limit)
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/discounts", async (req, res) => {
  try {
    const products = await getDiscountProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/category/:categoryId", async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { page = 1, limit = 12 } = req.query;
    const result = await getAllProducts(
      categoryId,
      null,
      parseInt(page),
      parseInt(limit)
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await getProductById(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

import upload from "../middleware/upload.middleware.js";

// ... imports

router.post("/", authenticate, isAdmin, upload.single("image"), async (req, res) => {
  try {
    const productData = {
      ...req.body,
      price: parseFloat(req.body.price),
      discount: parseFloat(req.body.discount),
      stock: parseInt(req.body.stock),
      image: req.file ? req.file.path : req.body.image, // Use uploaded file path or provided URL
    };
    const product = await createProduct(productData);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/:id", authenticate, isAdmin, upload.single("image"), async (req, res) => {
  try {
    const productData = {
      ...req.body,
    };

    if (req.file) {
      productData.image = req.file.path;
    }

    // Parse numbers if they are strings (multipart/form-data sends everything as strings)
    if (req.body.price) productData.price = parseFloat(req.body.price);
    if (req.body.discount) productData.discount = parseFloat(req.body.discount);
    if (req.body.stock) productData.stock = parseInt(req.body.stock);

    const product = await updateProduct(req.params.id, productData);
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", authenticate, isAdmin, async (req, res) => {
  try {
    await deleteProduct(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;

