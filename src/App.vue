<template>
  <div class="app">
    <HeaderComponent @search="onSearch" />

    <div v-if="data.length" class="movies-container">
      <div class="movie" v-for="movie in data" :key="movie.id">
        <Cards
          :id="movie.id"
          :image="{ imageUrl: getPoster(movie.poster_path) }"
          :title="movie.title || movie.name"
          :genre="movie.genre"
          :year="movie.release_date ? movie.release_date.split('-')[0] : 'Unknown'"
        />
      </div>
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

export default {
  components: {
    HeaderComponent,
    Cards,
  },
  setup() {
    const data = ref([])

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
      const result = await fetchTrendingMovies()
      data.value = result.results
    })

    return {
      data,
      onSearch,
      getPoster,
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
