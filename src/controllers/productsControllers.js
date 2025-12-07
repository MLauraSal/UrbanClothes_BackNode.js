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
    const { category } = req.query; 

    const products = await modelGetAll();

   
    if (category) {
      const filtered = products.filter(
        (p) => p.category?.toLowerCase() === category.toLowerCase()
      );
      return res.status(200).json(filtered);
    }

    
    res.status(200).json(products);

  } catch (error) {
    
    res.status(500).json({ message: "Internal Server Error" });
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
    
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getProductsByName = async (req, res) => {
  try {
    const {name} = req.query;

    if (!name) {
      return res.status(400).json({ message: "There is missing data in the search" });
    }

    const products = await modelGetAll();

  
    const filtered = products.filter((p) =>
      p.title?.toLowerCase().includes(name.toLowerCase())
    );

    res.status(200).json(filtered);

  } catch (error) {

    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createProduct = async (req, res) => {
  try {
   

    const { title, category,description, price, stock } = req.body;

    
    const productData = {
      title,
      category,
      price: Number(price),
      stock: Number(stock),
      description,
      image: req.file?.path || null,       
      publicId: req.file?.filename || null 
    };

    const newProduct = await modelCreate(productData);

    res.status(201).json(newProduct);

  } catch (err) {
    
    res.status(500).json({ error: "Error creating product" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    let newData = { ...req.body };

    
    if (req.file) {
      newData.image = req.file.path;
      newData.publicId = req.file.filename;
    }

    await modelUpdate(id, newData);

    res.status(200).json({ message: "Producto actualizado exitosamente" });

  } catch (error) {
   
    res.status(500).json({ message: "Error creating product" });
  }
};


export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await modelGetById(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    
    if (product.publicId) {
      await cloudinary.uploader.destroy(product.publicId);
    }

    
    await modelDelete(id);

    res.json({ message: "Product successfully removed" });

  } catch (err) {
    
    res.status(500).json({ error: "Error deleting product" });
  }
};

