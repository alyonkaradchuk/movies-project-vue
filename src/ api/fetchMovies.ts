export const fetchTrendingMovies = async () => {
  try {
    const response = await fetch('https://api.themoviedb.org/3/trending/all/day?language=en-US', {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZDk2ZDJlZDlmMzFkMmI5YmYxNTlmMjkwMGY3YmQ3NiIsIm5iZiI6MTc0MTExNjIyOC44MDQ5OTk4LCJzdWIiOiI2N2M3NTM0NDY4ZTUyNjdmNDdmMDc2NmMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.bO9kt5-k8aSXAFPIK5OOzd_0f_egRw5H9kOw9GUG2Fg',
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
    const apiKey = '6d96d2ed9f31d2b9bf159f2900f7bd76'
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
  return path ? `https://image.tmdb.org/t/p/w500${path}` : 'https://via.placeholder.com/500'
}
