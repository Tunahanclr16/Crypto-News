import axios from 'axios'

const API_KEY = '05157e8eb179420b8df282ee7962b9e4'
const BASE_URL = 'https://newsapi.org/v2'

export const fetchNewsByCategory = async (category) => {
  try {
    let query = ''
    switch (category) {
      case 'bitcoin':
        query = 'bitcoin OR btc'
        break
      case 'ethereum':
        query = 'ethereum OR eth'
        break
      case 'defi':
        query = 'defi OR "decentralized finance"'
        break
      case 'nft':
        query = 'nft OR "non fungible token"'
        break
      case 'metaverse':
        query = 'metaverse OR "virtual world" crypto'
        break
      case 'mining':
        query = 'crypto mining OR bitcoin mining'
        break
      default:
        query = 'cryptocurrency OR bitcoin OR blockchain'
    }

    const response = await axios.get(
      `${BASE_URL}/everything`, {
        params: {
          q: query,
          sortBy: 'publishedAt',
          language: 'tr',
          pageSize: 12,
          apiKey: API_KEY
        }
      }
    )
    return response.data.articles
  } catch (error) {
    console.error('Haber yüklenirken hata:', error)
    throw error
  }
}

export const fetchTrendingNews = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/everything`, {
        params: {
          q: 'bitcoin price OR crypto market',
          sortBy: 'popularity',
          language: 'tr',
          pageSize: 5,
          apiKey: API_KEY
        }
      }
    )
    return response.data.articles
  } catch (error) {
    console.error('Trend haberler yüklenirken hata:', error)
    throw error
  }
} 