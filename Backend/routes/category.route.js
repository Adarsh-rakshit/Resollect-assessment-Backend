import express from 'express';
import { body } from 'express-validator';
import CategoryController from '../controllers/category.controller.js';

const router = express.Router();

// Validation middleware
const validateCategoryData = [
  body('name')
    .notEmpty().withMessage('Category name is required')
    .isLength({ min: 3, max: 255 }).withMessage('Category name must be between 3 and 255 characters'),
  body('description')
    .optional()
    .isString().withMessage('Description must be a string')
];

// Get all categories
router.get('/', CategoryController.getAllCategories);

// Create a new category
router.post('/', validateCategoryData, CategoryController.createCategory);

//delete a category
router.delete('/:id', CategoryController.deleteCategory);
    
export default router;

