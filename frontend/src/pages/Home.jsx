import React, { useState, useEffect } from 'react'
import SearchBar from '../components/SearchBar'
import CategoryFilter from '../components/CategoryFilter'
// Removed Sorting import
import Pagination from '../components/Pagination'
import { getItems, getCategories } from '../services/api'

function Home() {
  const [categorylist, setCategorylist] = useState([])
  const [items, setItems] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  // Removed sortOrder state
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Fetch items with applicable filters
  const fetchItems = async () => {
    const params = {
      search: searchTerm !== '' ? searchTerm : undefined,
      category: selectedCategory !== 'all' ? selectedCategory : undefined,
      // Removed sort param
    }
    const data = await getItems(params)
    setItems(data)
  }

  // Fetch categories once when component mounts
  const fetchCategories = async () => {
    const data = await getCategories()
    setCategorylist(data)
  }

  useEffect(() => {
    fetchItems()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, selectedCategory])

  useEffect(() => {
    fetchCategories()
  }, [])

  // Pagination: Calculate current items to display
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(items.length / itemsPerPage)

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Items</h1>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <CategoryFilter
          categorylist={categorylist}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>
      <div className="grid grid-cols-1 gap-4">
        {currentItems.map(item => (
          <div key={item.id} className="p-4 border rounded shadow">
            <h2 className="text-xl font-semibold">{item.name}</h2>
            <p>Price: ${item.price}</p>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  )
}

export default Home