import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import NewsDetail from './pages/NewsDetail'
import HomePage from './pages/HomePage'
import { fetchNewsByCategory, fetchTrendingNews } from './services/newsApi'

function App() {
  const [news, setNews] = useState([])
  const [trendingNews, setTrendingNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [category, setCategory] = useState('tümü')

  useEffect(() => {
    const getNews = async () => {
      try {
        setLoading(true)
        setError(null)
        const [articles, trending] = await Promise.all([
          fetchNewsByCategory(category),
          fetchTrendingNews()
        ])
        setNews(articles)
        setTrendingNews(trending.slice(0, 5))
      } catch (err) {
        setError('Haberler yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.')
        setNews([])
      } finally {
        setLoading(false)
      }
    }

    getNews()
  }, [category])

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header activeCategory={category} onCategoryChange={setCategory} />
        
        <Routes>
          <Route 
            path="/" 
            element={
              <HomePage 
                news={news}
                trendingNews={trendingNews}
                loading={loading}
                error={error}
              />
            } 
          />
          <Route 
            path="/haber/:id" 
            element={<NewsDetail articles={[...trendingNews, ...news]} />} 
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
