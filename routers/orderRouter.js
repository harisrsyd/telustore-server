import express from 'express';
import { CreateOrder, GetAllOrder, GetDetailOrder, CurrentUserOrder, UpdateDetailOrder, UpdateItemOrder, DeleteOrder } from '../controllers/orderController.js';
import { protectedMiddleware, adminMiddleware } from '../middleware/authMiddleware.js';

const orderRouter = express.Router();

orderRouter.post('/', protectedMiddleware, CreateOrder);

orderRouter.get('/', protectedMiddleware, adminMiddleware, GetAllOrder);

orderRouter.get('/:id', protectedMiddleware, GetDetailOrder);

orderRouter.get('/myorder', protectedMiddleware, CurrentUserOrder);

orderRouter.put('/:id/detail', protectedMiddleware, UpdateDetailOrder);

orderRouter.put('/:id/item', protectedMiddleware, UpdateItemOrder);

orderRouter.delete('/:id', protectedMiddleware, DeleteOrder);

export default orderRouter;