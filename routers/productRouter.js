import express from 'express';
import { CreateProduct, GetAllProduct, GetDetailProduct, UpdateProduct, DeleteProduct, FileUpload } from '../controllers/productController.js'; 
import { protectedMiddleware, adminMiddleware } from '../middleware/authMiddleware.js';
import { upload } from '../utils/uploadFileUtil.js';

const productRouter = express.Router();

productRouter.post('/', protectedMiddleware, adminMiddleware, CreateProduct);

productRouter.get('/', GetAllProduct);

productRouter.get('/:id', GetDetailProduct);

productRouter.put('/:id', protectedMiddleware, adminMiddleware, UpdateProduct);

productRouter.delete('/:id', protectedMiddleware, adminMiddleware, DeleteProduct);

productRouter.post('/file-upload', protectedMiddleware, adminMiddleware, upload.array('image', 10), FileUpload);

export default productRouter;