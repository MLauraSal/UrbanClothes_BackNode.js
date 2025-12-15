import cloudinary from "../config/cloudinaryDotenvConfig.js";
import {
  modelGetAll,
  modelGetById,
  modelCreate,
  modelDelete,
  modelUpdate
} from "../models/productsModels.js";


//Controlador para obtener todos los productos

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

// Controlador para obtener un producto por ID

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

// Controlador para buscar productos por nombre

export const searchProducts = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.json([]);
    }

    const snapshot = await db
      .collection("products")
      .get();

    const results = snapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(product =>
        product.name.toLowerCase().includes(q.toLowerCase())
      );

    res.json(results);
  } catch (error) {
    res.status(500).json({ error: "Search error" });
  }
};


// Controlador para crear un nuevo producto

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


// Controlador para actualizar un producto por ID

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    let newData = { ...req.body };

    
    if (req.file) {
      newData.image = req.file.path;
      newData.publicId = req.file.filename;
    }

    await modelUpdate(id, newData);

    res.status(200).json({ message: "Product successfully updated" });

  } catch (error) {
   
    res.status(500).json({ message: "Error creating product" });
  }
};

// Controlador para eliminar un producto por ID

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

