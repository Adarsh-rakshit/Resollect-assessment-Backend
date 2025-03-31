import React from 'react'

function CategoryFilter({ categorylist, selectedCategory, setSelectedCategory }) {
  return (
    <select
      value={selectedCategory}
      onChange={(e) => setSelectedCategory(e.target.value)}
      className="p-2 border rounded"
    >
      <option value="all">All Categories</option>
      {categorylist.map((cat) => (
        <option key={cat.id} value={cat.id}>
          {cat.name}
        </option>
      ))}
    </select>
  )
}

export default CategoryFilter