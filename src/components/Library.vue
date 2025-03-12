<template>
  <div class="library">
    <HeaderComponent @filter="handleFilter" />

    <div class="movies-container">

      <div v-if="filteredMovies.length === 0">
        <p v-if="filterType === 'queue'">Your queue is empty. Add some movies!</p>
        <p v-if="filterType === 'watched'">You have not watched any movies yet. Start adding them!</p>
      </div>

      <Cards
        v-for="movie in filteredMovies"
        :key="movie.id"
        :id="movie.id"
        :image="{ imageUrl: getPoster(movie.poster_path) }"
        :title="movie.title || movie.name"
        :genre="getGenres(movie.genre_ids)"
        :year="movie.release_date ? movie.release_date.split('-')[0] : 'Unknown'"
      />
    </div>

    <AppFooter />
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import HeaderComponent from '../components/Header.vue'
import Cards from './Cards.vue'
import AppFooter from './Footer.vue'
import { getPoster, fetchGenres } from '../ api/fetchMovies'

export default {
  components: {
    HeaderComponent,
    Cards,
    AppFooter,
  },
  setup() {
    const movies = ref([]);
    const filterType = ref('watched');
    const genres = ref({});

    onMounted(async () => {
      const fetchedGenres = await fetchGenres();
      genres.value = fetchedGenres;
      loadMovies();
    });

    const handleFilter = (type) => {
      filterType.value = type;
      loadMovies();
    };

    const loadMovies = () => {
      const storedMovies = JSON.parse(localStorage.getItem(filterType.value)) || [];
      movies.value = storedMovies;
    };

    const filteredMovies = computed(() => movies.value);

    const getGenres = (genreIds) => {
      return genreIds.map((id) => genres.value[id] || 'Unknown').join(', ');
    };

    return {
      filteredMovies,
      handleFilter,
      getPoster,
      getGenres,
      filterType,
    }
  }
}
</script>

<style scoped>
.library {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.movies-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
  flex-grow: 1;
}
</style>
