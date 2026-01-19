const db = require('../config/db');

// @desc    Get all products
// @route   GET /api/products
const getProducts = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT p.*, c.name as category_name FROM products p LEFT JOIN categories c ON p.category_id = c.id');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get single product
// @route   GET /api/products/:id
const getProductById = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT p.*, c.name as category_name FROM products p LEFT JOIN categories c ON p.category_id = c.id WHERE p.id = ?', [req.params.id]);

        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Seller
const createProduct = async (req, res) => {
    const { name, description, price, image_url, category_id, stock } = req.body;

    if (!name || !price || !category_id) {
        return res.status(400).json({ message: 'Please provide name, price and category' });
    }

    try {
        const [result] = await db.query(
            'INSERT INTO products (name, description, price, image_url, category_id, stock, seller_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [name, description, price, image_url, category_id, stock || 0, req.user.id]
        );

        const newProductId = result.insertId;
        const [newProduct] = await db.query('SELECT * FROM products WHERE id = ?', [newProductId]);

        res.status(201).json(newProduct[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get all categories
// @route   GET /api/products/categories
const getCategories = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM categories');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create a category
// @route   POST /api/products/categories
// @access  Private/Admin or Seller
const createCategory = async (req, res) => {
    const { name, image_url } = req.body;

    if (!name) {
        return res.status(400).json({ message: 'Please provide a category name' });
    }

    const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

    try {
        const [existing] = await db.query('SELECT * FROM categories WHERE slug = ?', [slug]);
        if (existing.length > 0) {
            return res.status(400).json({ message: 'Category already exists' });
        }

        const [result] = await db.query(
            'INSERT INTO categories (name, slug, image_url) VALUES (?, ?, ?)',
            [name, slug, image_url || null]
        );

        res.status(201).json({ id: result.insertId, name, slug, image_url });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update a category
// @route   PUT /api/products/categories/:id
// @access  Private/Admin or Seller
const updateCategory = async (req, res) => {
    const { name, image_url } = req.body;
    const { id } = req.params;

    try {
        const [existing] = await db.query('SELECT * FROM categories WHERE id = ?', [id]);
        if (existing.length === 0) {
            return res.status(404).json({ message: 'Category not found' });
        }

        const slug = name ? name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') : existing[0].slug;

        await db.query(
            'UPDATE categories SET name = ?, slug = ?, image_url = ? WHERE id = ?',
            [name || existing[0].name, slug, image_url || existing[0].image_url, id]
        );

        res.json({ id, name: name || existing[0].name, slug, image_url: image_url || existing[0].image_url });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Delete a category
// @route   DELETE /api/products/categories/:id
// @access  Private/Admin or Seller
const deleteCategory = async (req, res) => {
    const { id } = req.params;

    try {
        const [existing] = await db.query('SELECT * FROM categories WHERE id = ?', [id]);
        if (existing.length === 0) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Check if there are products in this category
        const [products] = await db.query('SELECT * FROM products WHERE category_id = ?', [id]);
        if (products.length > 0) {
            return res.status(400).json({ message: 'Cannot delete category with associated products' });
        }

        await db.query('DELETE FROM categories WHERE id = ?', [id]);
        res.json({ message: 'Category removed' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory
};
