import express from 'express';
import {
  createProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productController.js';

const router = express.Router();

router.post('/add', createProduct);
router.get('/', getProducts);
router.get('/:id', getSingleProduct); // ✅ REQUIRED
router.put('/update/:id', updateProduct);
router.delete('/delete/:id', deleteProduct);

export default router;