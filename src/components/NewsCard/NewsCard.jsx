import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const NewsCard = ({ article, index, featured }) => {
  return (
    <article className={`group bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 ${
      featured ? 'relative' : ''
    }`}>
      {article.urlToImage && (
        <Link to={`/haber/${index}`} className={`relative block overflow-hidden ${
          featured ? 'h-[400px]' : 'h-48'
        }`}>
          <img
            src={article.urlToImage}
            alt={article.title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          {featured && (
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
              <h2 className="text-2xl font-bold text-white mb-2">
                {article.title}
              </h2>
              <p className="text-gray-200 line-clamp-2">
                {article.description}
              </p>
            </div>
          )}
        </Link>
      )}
      {!featured && (
        <div className="p-5">
          <Link to={`/haber/${index}`}>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-yellow-500 transition-colors">
              {article.title}
            </h2>
          </Link>
          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
            {article.description}
          </p>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(article.publishedAt).toLocaleDateString('tr-TR')}
              </span>
              <span className="text-gray-300">•</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {article.source.name}
              </span>
            </div>
            <Link
              to={`/haber/${index}`}
              className="inline-flex items-center px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors duration-200"
            >
              Oku
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      )}
    </article>
  )
}

NewsCard.propTypes = {
  article: PropTypes.shape({
    urlToImage: PropTypes.string,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    publishedAt: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    source: PropTypes.shape({
      name: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  index: PropTypes.number.isRequired,
  featured: PropTypes.bool
}

NewsCard.defaultProps = {
  featured: false
}

export default NewsCard 