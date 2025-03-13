<template>
  <div class="library">
    <HeaderComponent @filter="handleFilter" />

    <div class="movies-container">
      <div v-if="isLoading" class="loader-container">
        <div class="loader"></div>
      </div>

      <div v-else-if="filteredMovies.length === 0">
        <p v-if="filterType === 'watched'">{{ $t('watchedEmptyMessage') }}</p>
        <p v-if="filterType === 'queue'">{{ $t('queueEmptyMessage') }}</p>
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
    const isLoading = ref(true);

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
      movies.value = [];

      const storedMovies = JSON.parse(localStorage.getItem(filterType.value)) || [];

      isLoading.value = true;
      setTimeout(() => {
        movies.value = storedMovies;
        isLoading.value = false;
      }, 600);
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
      isLoading,
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
}

.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70vh;
}

.loader {
  width: 50px;
  height: 50px;
  border: 5px solid white;
  border-radius: 50%;
  border-top-color: #ff6347;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
