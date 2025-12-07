import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinaryDotenvConfig.js";

// Configuración de almacenamiento en Cloudinary

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "products",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    public_id: (req, file) => `${Date.now()}-${file.originalname}`,
  },
});

// Inicializa multer

const upload = multer({ storage });

export default upload;
