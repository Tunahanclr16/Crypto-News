import PropTypes from 'prop-types'
import { categories } from '../../constants/categories'

const CategoryButtons = ({ activeCategory, onCategoryChange }) => {
  return (
    <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onCategoryChange(cat)}
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            activeCategory === cat
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {cat.charAt(0).toUpperCase() + cat.slice(1)}
        </button>
      ))}
    </div>
  )
}

CategoryButtons.propTypes = {
  activeCategory: PropTypes.string.isRequired,
  onCategoryChange: PropTypes.func.isRequired
}

export default CategoryButtons 