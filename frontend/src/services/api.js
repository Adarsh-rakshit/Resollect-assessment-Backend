const BASE_URL = import.meta.env.VITE_API_URL

export async function getItems(params = {}) {
  // Build query string based on params (e.g., search, category, sort)
  const query = new URLSearchParams()
  if (params.search) query.append('search', params.search)
  if (params.category) query.append('category', params.category)
  if (params.sort) query.append('sort', params.sort)

  try {
    const response = await fetch(`${BASE_URL}/api/items?${query.toString()}`)
    if (!response.ok) throw new Error('Error fetching items')
    return await response.json()
  } catch (error) {
    console.error(error)
    return []
  }
}

export async function getCategories() {
 try {
   const response = await fetch(`${BASE_URL}/api/categories`);
   if (!response.ok) throw new Error('Error fetching categories')
   return await response.json()
 } catch (error) {
    console.error(error)
    return []
    }
 }