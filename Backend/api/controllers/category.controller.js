import pool from '../db/db';

const CategoryController = {
  // Get all categories
  async getAllCategories(req, res) {
    try {
      const result = await pool.query('SELECT * FROM categories ORDER BY name');
      res.json(result.rows);
    } catch (error) {
      console.error('Error fetching categories:', error);
      res.status(500).json({ error: 'Failed to fetch categories' });
    }
  },
  
  // Create a new category
  async createCategory(req, res) {
    try {
      const { name, description } = req.body;
      
      const result = await pool.query(
        'INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING *',
        [name, description || null]
      );
      
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error creating category:', error);
      
      // Check for duplicate category name (PostgreSQL error code 23505)
      if (error.code === '23505') {
        return res.status(409).json({ error: 'A category with this name already exists' });
      }
      
      res.status(500).json({ error: 'Failed to create category' });
    }
  },
  
  // Get a category by ID with all its items
  async getCategoryWithItems(req, res) {
    try {
      const { id } = req.params;
      
      // First check if category exists
      const categoryResult = await pool.query(
        'SELECT * FROM categories WHERE id = $1',
        [id]
      );
      
      if (categoryResult.rows.length === 0) {
        return res.status(404).json({ error: 'Category not found' });
      }
      
      const category = categoryResult.rows[0];
      
      // Get all items in this category
      const itemsResult = await pool.query(
        'SELECT * FROM items WHERE category_id = $1 ORDER BY name',
        [id]
      );
      
      // Return category with its items
      res.json({
        ...category,
        items: itemsResult.rows
      });
    } catch (error) {
      console.error('Error fetching category with items:', error);
      res.status(500).json({ error: 'Failed to fetch category details' });
    }
  },
  
  // Get a category by ID
  async getCategoryById(req, res) {
    try {
      const { id } = req.params;
      
      const result = await pool.query(
        'SELECT * FROM categories WHERE id = $1',
        [id]
      );
      
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Category not found' });
      }
      
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error fetching category:', error);
      res.status(500).json({ error: 'Failed to fetch category' });
    }
  },
  
  // Update a category
  async updateCategory(req, res) {
    try {
      const { id } = req.params;
      const { name, description } = req.body;
      
      const result = await pool.query(
        'UPDATE categories SET name = $1, description = $2 WHERE id = $3 RETURNING *',
        [name, description || null, id]
      );
      
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Category not found' });
      }
      
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error updating category:', error);
      
      // Check for duplicate category name
      if (error.code === '23505') {
        return res.status(409).json({ error: 'A category with this name already exists' });
      }
      
      res.status(500).json({ error: 'Failed to update category' });
    }
  },
  
  // Delete a category (and its items via CASCADE)
  async deleteCategory(req, res) {
    try {
      const { id } = req.params;
      
      // First check if category exists
      const checkResult = await pool.query(
        'SELECT id FROM categories WHERE id = $1',
        [id]
      );
      
      if (checkResult.rows.length === 0) {
        return res.status(404).json({ error: 'Category not found' });
      }
      
      // Delete category (items will be deleted via CASCADE)
      await pool.query(
        'DELETE FROM categories WHERE id = $1',
        [id]
      );
      
      res.json({ message: 'Category and its items deleted successfully' });
    } catch (error) {
      console.error('Error deleting category:', error);
      res.status(500).json({ error: 'Failed to delete category' });
    }
  }
};

export default CategoryController;
