const express = require('express');
const router = express.Router();
const {
    getProducts,
    getProductById,
    createProduct,
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/productController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', getProducts);
router.get('/categories', getCategories);
router.post('/categories', protect, authorize('seller', 'admin'), createCategory);
router.put('/categories/:id', protect, authorize('seller', 'admin'), updateCategory);
router.delete('/categories/:id', protect, authorize('seller', 'admin'), deleteCategory);
router.get('/:id', getProductById);
router.post('/', protect, authorize('seller', 'admin'), createProduct);

module.exports = router;
