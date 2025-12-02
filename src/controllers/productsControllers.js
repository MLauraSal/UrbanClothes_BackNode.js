import cloudinary from "../config/cloudinaryDotenvConfig.js";
import {
  modelGetAll,
  modelGetById,
  modelCreate,
  modelDelete,
  modelUpdate
} from "../models/productsModels.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await modelGetAll();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error obteniendo productos:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await modelGetById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Error obteniendo producto:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { title, category, price, stock } = req.body;
   

    const productData = {
      title,
      category,
      price: Number(price),
      stock: Number(stock),
      image: req.file ? req.file.path : null,
      imageId: req.file ? req.file.filename : null,
    };

    const newProduct = await modelCreate(productData);
    res.status(201).json(newProduct);
  } catch (err) {
    console.error("Error al crear producto:", err);
    res.status(500).json({ error: "Error al crear producto" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    let newData = { ...req.body };

    if (req.file) {
      newData.image = req.file.path;
      newData.imageId = req.file.filename;
    }

    await modelUpdate(id, newData);
    res.status(200).json({ message: "Producto actualizado exitosamente" });
  } catch (error) {
    console.error("Error actualizando producto:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await modelGetById(id);
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    if (product.imageId) {
      await cloudinary.uploader.destroy(product.imageId);
    }

    await modelDelete(id);
    res.json({ message: "Producto eliminado correctamente" });
  } catch (err) {
    console.error("Error al eliminar producto:", err);
    res.status(500).json({ error: "Error al eliminar producto" });
  }
};

