import PropTypes from 'prop-types'
import NewsCard from '../components/NewsCard/NewsCard'
import LoadingSpinner from '../components/Loading/LoadingSpinner'

const HomePage = ({ news, trendingNews, loading, error }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 w-full">
      <main className="w-full min-h-screen pt-24">
        {/* Hero Section - Trend Haberler */}
        <div className="w-full px-4 lg:px-8 max-w-[2000px] mx-auto mb-12">
          {!loading && !error && trendingNews.length > 0 && (
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                Trend Haberler
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Ana Trend Haber */}
                <div className="lg:col-span-3">
                  <NewsCard 
                    article={trendingNews[0]} 
                    index={0}
                    featured={true}
                  />
                </div>
                {/* Yan Trend Haberler */}
                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                  {trendingNews.slice(1, 3).map((article, index) => (
                    <NewsCard 
                      key={index} 
                      article={article} 
                      index={index + 1}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Ana İçerik Bölümü - Gri Arka Plan */}
        <div className="w-full bg-gray-100 dark:bg-gray-800/50 py-12">
          <div className="w-full px-4 lg:px-8 max-w-[2000px] mx-auto">
            <div className="grid grid-cols-12 gap-6">
              {/* Sol Sidebar */}
              <aside className="hidden lg:block col-span-3">
                <div className="sticky top-24 space-y-6">
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                      Piyasa Durumu
                    </h3>
                    <div className="space-y-4">
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <iframe
                          src="https://widget.coinlib.io/widget?type=single_v2&theme=dark&coin_id=859&pref_coin_id=1505"
                          width="100%"
                          height="196px"
                          scrolling="auto"
                          marginWidth="0"
                          marginHeight="0"
                          frameBorder="0"
                          className="rounded-lg"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Ek Widget */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                      Kripto Takvimi
                    </h3>
                    <div className="space-y-3">
                      {/* Örnek Takvim Öğeleri */}
                      {[1, 2, 3].map((item) => (
                        <div key={item} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <div className="flex-shrink-0 w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center text-white font-bold">
                            {new Date().getDate() + item}
                          </div>
                          <div>
                            <p className="font-medium text-gray-800 dark:text-white">Ethereum Güncellemesi</p>
                            <p className="text-sm text-gray-500">09:00 UTC</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </aside>

              {/* Ana İçerik */}
              <div className="col-span-12 lg:col-span-6">
                {loading ? (
                  <LoadingSpinner />
                ) : error ? (
                  <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                    <p className="text-red-600 text-lg mb-4">{error}</p>
                    <button 
                      onClick={() => window.location.reload()}
                      className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                    >
                      Tekrar Dene
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                        Son Haberler
                      </h2>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">Sıralama:</span>
                        <select className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-1 text-sm">
                          <option>En Yeni</option>
                          <option>En Popüler</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {news.map((article, index) => (
                        <NewsCard 
                          key={index + trendingNews.length} 
                          article={article} 
                          index={index + trendingNews.length}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sağ Sidebar */}
              <aside className="hidden lg:block col-span-3">
                <div className="sticky top-24 space-y-6">
                  {/* Popüler Haberler */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                      Popüler Haberler
                    </h3>
                    <div className="space-y-4">
                      {trendingNews.slice(3).map((article, index) => (
                        <div 
                          key={index} 
                          className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                        >
                          {article.urlToImage && (
                            <img 
                              src={article.urlToImage} 
                              alt={article.title}
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                          )}
                          <div>
                            <h4 className="font-medium text-gray-800 dark:text-white line-clamp-2 hover:text-yellow-500 transition-colors">
                              {article.title}
                            </h4>
                            <p className="text-sm text-gray-500 mt-1">
                              {new Date(article.publishedAt).toLocaleDateString('tr-TR')}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Newsletter Signup */}
                  <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl shadow-lg p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">
                      Güncel Kalın!
                    </h3>
                    <p className="text-sm mb-4 text-yellow-100">
                      En son kripto haberleri için bültenimize abone olun.
                    </p>
                    <form className="space-y-3">
                      <input
                        type="email"
                        placeholder="E-posta adresiniz"
                        className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                      />
                      <button
                        type="submit"
                        className="w-full px-4 py-2 bg-white text-yellow-600 rounded-lg font-medium hover:bg-yellow-50 transition-colors"
                      >
                        Abone Ol
                      </button>
                    </form>
                  </div>

                  {/* Sosyal Medya */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                      Bizi Takip Edin
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {['Twitter', 'Telegram', 'Discord', 'YouTube'].map((platform) => (
                        <a
                          key={platform}
                          href="#"
                          className="flex items-center justify-center px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-yellow-500 hover:text-white transition-colors"
                        >
                          {platform}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

HomePage.propTypes = {
  news: PropTypes.array.isRequired,
  trendingNews: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string
}

export default HomePage