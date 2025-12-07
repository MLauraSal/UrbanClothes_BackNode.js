import { getAllCategories, getCategoryById, createCategory, deleteCategory } from "../models/categoriesModels.js";


export const getAll = async (req, res) => {
    const categories = await getAllCategories();
    res.json(categories);
};


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


 