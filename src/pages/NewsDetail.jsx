import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import LoadingSpinner from '../components/Loading/LoadingSpinner'

const NewsDetail = ({ articles }) => {
  const { id } = useParams()
  const [article, setArticle] = useState(null)

  useEffect(() => {
    const foundArticle = articles.find((a, index) => index.toString() === id)
    setArticle(foundArticle)
  }, [articles, id])

  if (!article) return <LoadingSpinner />

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        <Link 
          to="/" 
          className="inline-flex items-center text-yellow-500 hover:text-yellow-600 mb-6"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Geri Dön
        </Link>

        <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          {article.urlToImage && (
            <div className="relative h-96">
              <img
                src={article.urlToImage}
                alt={article.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-32" />
            </div>
          )}
          
          <div className="p-8">
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-yellow-500 font-medium">
                {article.source.name}
              </span>
              <span className="text-gray-400">•</span>
              <time className="text-gray-400">
                {new Date(article.publishedAt).toLocaleDateString('tr-TR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </time>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              {article.title}
            </h1>

            {article.author && (
              <div className="flex items-center mb-6">
                <div className="bg-yellow-500 rounded-full w-10 h-10 flex items-center justify-center">
                  <span className="text-white font-bold">
                    {article.author.charAt(0)}
                  </span>
                </div>
                <div className="ml-4">
                  <p className="text-gray-900 dark:text-white font-medium">
                    {article.author}
                  </p>
                  <p className="text-gray-500 text-sm">Yazar</p>
                </div>
              </div>
            )}

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
                {article.description}
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                {article.content}
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors duration-200"
              >
                Orijinal Kaynakta Oku
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}

NewsDetail.propTypes = {
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      content: PropTypes.string,
      urlToImage: PropTypes.string,
      publishedAt: PropTypes.string.isRequired,
      source: PropTypes.shape({
        name: PropTypes.string.isRequired
      }).isRequired,
      author: PropTypes.string,
      url: PropTypes.string.isRequired
    })
  ).isRequired
}

export default NewsDetail 