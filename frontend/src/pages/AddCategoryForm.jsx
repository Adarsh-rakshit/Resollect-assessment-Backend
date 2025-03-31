import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AddCategoryForm() {
  const [category, setCategory] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Call backend API to create category if available
    // For now, just log the new category, then redirect.
    try {
      // Uncomment and update if an endpoint exists: POST /api/categories
      // await fetch(`${import.meta.env.VITE_API_URL}/api/categories`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ name: category })
      // })
      navigate('/')
    } catch (err) {
      console.error(err)
      alert('Failed to add category')
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add New Category</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          type="text"
          placeholder="Category Name"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
          Submit
        </button>
      </form>
    </div>
  )
}

export default AddCategoryForm