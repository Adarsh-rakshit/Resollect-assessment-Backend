import pool from '../db/db';

const ItemController = {
  // Get all items with optional filtering
  async getAllItems(req, res) {
    try {
      const { search, category } = req.query;
      
      let query = `
        SELECT i.*, c.name as category_name 
        FROM items i 
        LEFT JOIN categories c ON i.category_id = c.id 
        WHERE 1=1
      `;
      
      const values = [];
      
      if (search) {
        values.push(`%${search}%`);
        query += ` AND (i.name ILIKE $${values.length} OR i.description ILIKE $${values.length})`;
      }
      
      if (category) {
        values.push(category);
        query += ` AND i.category_id = $${values.length}`;
      }
      
      query += ' ORDER BY i.category_id, i.name';
      
      const result = await pool.query(query, values);
      res.json(result.rows);
    } catch (error) {
      console.error('Error fetching items:', error);
      res.status(500).json({ error: 'Failed to fetch items' });
    }
  },
  
  // Get a single item by ID
  async getItemById(req, res) {
    try {
      const { id } = req.params;
      const result = await pool.query(
        `SELECT i.*, c.name as category_name 
         FROM items i 
         LEFT JOIN categories c ON i.category_id = c.id 
         WHERE i.id = $1`,
        [id]
      );
      
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Item not found' });
      }
      
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error fetching item:', error);
      res.status(500).json({ error: 'Failed to fetch item' });
    }
  },
  
  // Create a new item
  async createItem(req, res) {
    try {
      const { name, description, price, category_id } = req.body;
      
      const result = await pool.query(
        `INSERT INTO items (name, description, price, category_id) 
         VALUES ($1, $2, $3, $4) 
         RETURNING *`,
        [name, description, price, category_id]
      );
      
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error creating item:', error);
      res.status(500).json({ error: 'Failed to create item' });
    }
  },
  
  // Update an item
  async updateItem(req, res) {
    try {
      const { id } = req.params;
      const { name, description, price, category_id } = req.body;
      
      const result = await pool.query(
        `UPDATE items 
         SET name = $1, description = $2, price = $3, category_id = $4, updated_at = CURRENT_TIMESTAMP
         WHERE id = $5 
         RETURNING *`,
        [name, description, price, category_id, id]
      );
      
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Item not found' });
      }
      
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error updating item:', error);
      res.status(500).json({ error: 'Failed to update item' });
    }
  },
  
  // Delete an item
  async deleteItem(req, res) {
    try {
      const { id } = req.params;
      const result = await pool.query(
        'DELETE FROM items WHERE id = $1 RETURNING *',
        [id]
      );
      
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Item not found' });
      }
      
      res.json({ message: 'Item deleted successfully' });
    } catch (error) {
      console.error('Error deleting item:', error);
      res.status(500).json({ error: 'Failed to delete item' });
    }
  }
};

export default ItemController; 