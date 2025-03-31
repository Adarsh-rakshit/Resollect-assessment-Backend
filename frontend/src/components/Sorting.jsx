import React from 'react'

function Sorting({ sortOrder, setSortOrder }) {
  return (
    <select
      value={sortOrder}
      onChange={(e) => setSortOrder(e.target.value)}
      className="p-2 border rounded"
    >
      <option value="asc">Price: Low to High</option>
      <option value="desc">Price: High to Low</option>
    </select>
  )
}

export default Sorting