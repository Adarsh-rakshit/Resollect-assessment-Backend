import express from 'express';
import { body, param, query } from 'express-validator';
import ItemController from '../controllers/item.controller.js';

const router = express.Router();

// Validation middleware
const validateItemId = [
  param('id').isInt().withMessage('Item ID must be an integer')
];

const validateItemData = [
  body('name')
    .notEmpty().withMessage('Item name is required')
    .isLength({ min: 3, max: 255 }).withMessage('Item name must be between 3 and 255 characters'),
  body('description')
    .optional()
    .isString().withMessage('Description must be a string'),
  body('price')
    .optional()
    .isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('category_id')
    .optional()
    .isInt().withMessage('Category ID must be an integer')
];

const validateFilters = [
  query('search').optional().isString(),
  query('category').optional().isInt()
];

// GET all items with filtering
router.get('/', validateFilters, ItemController.getAllItems);

// GET a single item
router.get('/:id', validateItemId, ItemController.getItemById);

// POST create item
router.post('/', validateItemData, ItemController.createItem);

// PUT update item
router.put('/:id', [...validateItemId, ...validateItemData], ItemController.updateItem);

// DELETE item
router.delete('/:id', validateItemId, ItemController.deleteItem);

export default router;
