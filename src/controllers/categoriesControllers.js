import { getAllCategories, getCategoryById, createCategory, deleteCategory, updateCategory } from "../models/categoriesModels.js";

// Controlador para obtener todas las categorías

export const getAll = async (req, res) => {
    const categories = await getAllCategories();
    res.json(categories);
};

// Controlador para obtener una categoría por ID

export const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await getCategoryById(id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.json(category);
        
    } catch (error) {
        res.status(500).json({ message: "Server error" });

        
    }
};


// Controlador para crear una nueva categoría

export const create = async (req, res) => {
  try {
    
 
     const { name, subcategory } = req.body;
 
     
     const categoryData = {
       name,
       subcategory: subcategory || [],
      
     };
 
     const newCategory = await createCategory(categoryData);
 
     res.status(201).json(newCategory);
 
   } catch (err) {
     
     res.status(500).json({ error: "Error creating category" });
   }
};


// Controlador para eliminar una categoría por ID

export const remove = async (req, res) => { 
    try {
        const { id } = req.params;
        const deletedCategory = await deleteCategory(id);
        if (!deletedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.json({ message: "Category successfully removed" });
        
    } catch (error) {
        res.status(500).json({ message: "Server error" });
        
    }
};


// Controlador para actualizar una categoría por ID
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    let newData = { ...req.body };

      
 

    await updateCategory(id, newData);

    res.status(200).json({ message: "Category successfully updated" });

  } catch (error) {
   
    res.status(500).json({ message: "Error update category" });
  }
};