import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCategories } from '../services/api'

function AddItemForm() {
  const [categorylist, setCategorylist] = useState([])

  // Fetch categories on component mount
  const fetchCategories = async () => {
    const data = await getCategories()
    setCategorylist(data)
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  // Update state key "category" to "category_id"
  const [formData, setFormData] = useState({ name: '', category_id: '', price: '' })
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Convert category_id to number here (if not empty)
    const dataToSend = {
      ...formData,
      category_id: formData.category_id === "" ? null : Number(formData.category_id),
    }
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend)
      })
      if (!response.ok) throw new Error('Error adding item')
      navigate('/')
    } catch (err) {
      console.error(err)
      alert('Failed to add item')
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add New Item</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <select
          value={formData.category_id || ""}
          onChange={(e) => {
            const selected = e.target.value;
            const parsed = selected ? parseInt(selected, 10) : null;
            console.log("Selected category:", selected, "Parsed:", parsed);
            setFormData({ ...formData, category_id: parsed });
          }}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select Category</option>
          {categorylist.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Submit
        </button>
      </form>
    </div>
  )
}

export default AddItemForm