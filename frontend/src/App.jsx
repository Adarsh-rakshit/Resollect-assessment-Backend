import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import AddItemForm from './pages/AddItemForm'
import AddCategoryForm from './pages/AddCategoryForm'

function App() {
  return (
    <div className="container mx-auto p-4">
      {/* Top Navigation */}
      <div className="flex justify-end gap-4 mb-4">
        <Link to="/add-item" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Add Item
        </Link>
        <Link to="/add-category" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Add Category
        </Link>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-item" element={<AddItemForm />} />
        <Route path="/add-category" element={<AddCategoryForm />} />
      </Routes>
    </div>
  )
}

export default App