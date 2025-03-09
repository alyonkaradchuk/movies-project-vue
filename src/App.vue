<template>
  <div class="app">
    <HeaderComponent @search="onSearch" />

    <div v-if="isLoading">
      <p>Loading...</p>
    </div>

    <div v-if="paginatedMovies.length" class="movies-container">
      <div class="movie" v-for="movie in paginatedMovies" :key="movie.id">
        <Cards
          :id="movie.id"
          :image="{ imageUrl: getPoster(movie.poster_path) }"
          :title="movie.title || movie.name"
          :genre="getGenres(movie.genre_ids)"
          :year="movie.release_date ? movie.release_date.split('-')[0] : 'Unknown'"
        />
      </div>

      <Pagination
        v-if="data.length > moviesPerPage"
        :totalMovies="data.length"
        :moviesPerPage="moviesPerPage"
        :currentPage="currentPage"
        @page-change="handlePageChange"
      />
    </div>

    <div v-else>
        <p>No movies found.</p>
     </div>
     
    <AppFooter />
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'
import HeaderComponent from './components/Header.vue'
import Cards from './components/Cards.vue'
import { fetchTrendingMovies, searchMovies, getPoster } from './ api/fetchMovies'
import AppFooter from './components/Footer.vue'
import Pagination from './components/Pagination.vue'

export default {
  components: {
    HeaderComponent,
    Cards,
    AppFooter,
    Pagination,
  },
  setup() {
    const data = ref([])
    const genres = ref({})
    const currentPage = ref(1)
    const moviesPerPage = 8
    const isLoading = ref(true)

    watch(data, () => {
      currentPage.value = 1
    })

    const paginatedMovies = computed(() => {
      const start = (currentPage.value - 1) * moviesPerPage
      const end = start + moviesPerPage
      return data.value.slice(start, end)
    })

    const handlePageChange = (page) => {
      currentPage.value = page
    }

    const fetchGenres = async () => {
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
        genres.value = result.genres.reduce((acc, genre) => {
          acc[genre.id] = genre.name
          return acc
        }, {})
      } catch (error) {
        console.error('Error fetching genres:', error)
      }
    }

    const getGenres = (genreIds) => {
      return genreIds.map((id) => genres.value[id] || 'Other').join(', ')
    }

    const onSearch = async (query) => {
      currentPage.value = 1
      if (query.trim()) {
        const result = await searchMovies(query)
        data.value = result.results || []
      } else {
        const result = await fetchTrendingMovies()
        data.value = result.results || []
      }
    }

    onMounted(async () => {
      await fetchGenres()
      const result = await fetchTrendingMovies()
      data.value = result.results || []
      isLoading.value = false
    })

    return {
      data,
      onSearch,
      getPoster,
      getGenres,
      paginatedMovies,
      handlePageChange,
      moviesPerPage,
      currentPage,
      isLoading,
    }
  },
}
</script>

<style scoped>
.app {
  text-align: center;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
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
  flex: 1;
  justify-content: center;
  gap: 20px;
}

.movie img {
  width: 100%;
  height: auto;
}
</style>
