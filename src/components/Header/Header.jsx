import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import CategoryButtons from './CategoryButtons'
import { Link } from 'react-router-dom'

const Header = ({ activeCategory, onCategoryChange }) => {
  const [btcPrice, setBtcPrice] = useState(null)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const fetchBTCPrice = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd')
        const data = await response.json()
        setBtcPrice(data.bitcoin.usd)
      } catch (error) {
        console.error('BTC fiyatı alınamadı:', error)
      }
    }

    fetchBTCPrice()
    const interval = setInterval(fetchBTCPrice, 60000) // Her dakika güncelle

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/90 backdrop-blur-sm' : 'bg-gradient-to-r from-black to-gray-900'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative w-10 h-10">
              <img 
                src="/bitcoin-logo.svg"
                alt="Bitcoin News"
                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                onError={(e) => {
                  e.target.onerror = null; // Sonsuz döngüyü önle
                  e.target.src = '/bitcoin-logo.png'; // Alternatif logo
                }}
              />
              <div className="absolute inset-0 bg-yellow-500/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-300" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-300 bg-clip-text text-transparent">
              Crypto News
            </h1>
          </Link>
          
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center space-x-4">
              {btcPrice && (
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg px-4 py-2 border border-gray-700">
                  <div className="flex items-center space-x-2">
                    <img src="/bitcoin-logo.svg" alt="BTC" className="w-5 h-5" />
                    <span className="text-yellow-500 font-medium">
                      ${btcPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
              )}
              <a 
                href="https://www.coingecko.com/en/coins/bitcoin" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-yellow-500 transition-colors"
              >
                Markets
              </a>
            </div>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-colors duration-200">
              Subscribe
            </button>
          </div>
        </div>

        <nav className="mt-6">
          <CategoryButtons
            activeCategory={activeCategory}
            onCategoryChange={onCategoryChange}
          />
        </nav>
      </div>
    </header>
  )
}

Header.propTypes = {
  activeCategory: PropTypes.string.isRequired,
  onCategoryChange: PropTypes.func.isRequired
}

export default Header