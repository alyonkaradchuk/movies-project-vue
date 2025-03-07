<template>
  <div class="app">
    <HeaderComponent @search="onSearch" />

    <div v-if="data.length" class="movies-container">
      <div class="movie" v-for="movie in data" :key="movie.id">
        <Cards
          :id="movie.id"
          :image="{ imageUrl: getPoster(movie.poster_path) }"
          :title="movie.title || movie.name"
          :genre="getGenres(movie.genre_ids) || 'Unknown'"
          :year="movie.release_date ? movie.release_date.split('-')[0] : 'Unknown'"
        />
      </div>
      <AppFooter />
    </div>

    <div v-else>
      <p>No movies found.</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import HeaderComponent from './components/Header.vue'
import Cards from './components/Cards.vue'
import { fetchTrendingMovies, searchMovies, getPoster } from './ api/fetchMovies'
import AppFooter from './components/Footer.vue'

export default {
  components: {
    HeaderComponent,
    Cards,
    AppFooter,
  },
  setup() {
    const data = ref([])
    const genres = ref({})

    const fetchGenres = async () => {
      try {
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_BEARER_TOKEN}`,
          },
        }
        const response = await fetch(
          'https://api.themoviedb.org/3/genre/movie/list?language=en',
          options,
        )
        const result = await response.json()
        genres.value = result.genres.reduce((acc, genre) => {
          acc[genre.id] = genre.name
          return acc
        }, {})
      } catch (error) {
        console.error('Error fetching genres:', error)
      }
    }

    const getGenres = (genreIds) => {
      return genreIds.map((id) => genres.value[id] || 'Unknown').join(', ')
    }

    const onSearch = async (query) => {
      if (query.trim()) {
        const result = await searchMovies(query)
        data.value = result.results
      } else {
        const result = await fetchTrendingMovies()
        data.value = result.results
      }
    }

    onMounted(async () => {
      await fetchGenres()
      const result = await fetchTrendingMovies()
      data.value = result.results
    })

    return {
      data,
      onSearch,
      getPoster,
      getGenres,
    }
  },
}
</script>

<style scoped>
.app {
  text-align: center;
}

.movie {
  margin: 1rem;
  display: flex;
  flex-direction: column;
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.movies-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.movie img {
  width: 100%;
  height: auto;
}
</style>
