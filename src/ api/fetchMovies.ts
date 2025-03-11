export const fetchTrendingMovies = async () => {
  try {
    const response = await fetch('https://api.themoviedb.org/3/trending/all/day?language=en-US', {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_BEARER_TOKEN}`,
      },
    })
    const data = await response.json()

    return data
  } catch (error) {
    console.error('Error fetching trending movies:', error)
  }
}

export const searchMovies = async (query: string) => {
  if (query.trim() === '') return
  try {
    const apiKey = import.meta.env.VITE_API_KEY
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`,
    )
    const data = await response.json()

    return data
  } catch (error) {
    console.error('Error fetching movies:', error)
  }
}

export const getPoster = (path: string) => {
  return path ? `https://image.tmdb.org/t/p/w500${path}` : 'https://picsum.photos/500'
}

export const fetchGenres = async () => {
  try {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_BEARER_TOKEN}`,
      },
    }
    const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
    const result = await response.json()

    return result.genres.reduce((acc, genre) => {
      acc[genre.id] = genre.name
      return acc
    }, {})
  } catch (error) {
    console.error('Error fetching genres:', error)
  }
}
