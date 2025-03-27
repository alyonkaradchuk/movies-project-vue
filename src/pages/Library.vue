<template>
  <div class="library">
    <HeaderComponent @filter="handleFilter" />

    <div class="movies-container">
      <div v-if="isLoading" class="loader-container">
        <div class="loader"></div>
      </div>

      <div v-else-if="paginatedMovies.length === 0">
        <p v-if="filterType === 'watched'">{{ $t('watchedEmptyMessage') }}</p>
        <p v-if="filterType === 'queue'">{{ $t('queueEmptyMessage') }}</p>
      </div>

      <Cards
        v-for="movie in paginatedMovies"
        :key="movie.id"
        :id="movie.id"
        :image="{ imageUrl: getPoster(movie.poster_path) }"
        :title="movie.title || movie.name"
        :genre="getGenres(movie.genre_ids)"
        :year="movie.release_date ? movie.release_date.split('-')[0] : 'Unknown'"
        @click="openModal(movie)"
      />
    </div>

    <Pagination
      :totalMovies="totalMovies"
      :moviesPerPage="moviesPerPage"
      :currentPage="currentPage"
      @page-change="changePage"
    />

    <AppFooter />
    <Modal :show="showModal" :movie="selectedMovie" @close="showModal = false" />
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import HeaderComponent from '../components/Header.vue'
import Cards from '../components/Cards.vue'
import AppFooter from '../components/Footer.vue'
import Modal from '../components/Modal.vue'
import Pagination from '../components/Pagination.vue'
import { getPoster, fetchGenres } from '../api/fetchMovies'

export default {
  components: {
    HeaderComponent,
    Cards,
    AppFooter,
    Modal,
    Pagination,
  },
  setup() {
    const movies = ref([])
    const filterType = ref('watched')
    const genres = ref({})
    const isLoading = ref(true)
    const showModal = ref(false)
    const selectedMovie = ref(null)
    const currentPage = ref(1)
    const moviesPerPage = 8

    onMounted(async () => {
      const fetchedGenres = await fetchGenres()
      genres.value = fetchedGenres
      loadMovies()
    })

    const handleFilter = (type) => {
      filterType.value = type
      loadMovies()
    }

    const loadMovies = () => {
      movies.value = []
      const storedMovies = JSON.parse(localStorage.getItem(filterType.value)) || []
      isLoading.value = true
      setTimeout(() => {
        movies.value = storedMovies
        isLoading.value = false
      }, 600)
    }

    const totalMovies = computed(() => movies.value.length)

    const paginatedMovies = computed(() => {
      const start = (currentPage.value - 1) * moviesPerPage
      const end = start + moviesPerPage
      return movies.value.slice(start, end)
    })

    const changePage = (page) => {
      currentPage.value = page
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const openModal = (movie) => {
      selectedMovie.value = movie
      showModal.value = true
    }

    const getGenres = (genreIds) => {
      return genreIds.map((id) => genres.value[id] || 'Unknown').join(', ')
    }

    return {
      paginatedMovies,
      totalMovies,
      moviesPerPage,
      currentPage,
      changePage,
      handleFilter,
      getPoster,
      getGenres,
      filterType,
      isLoading,
      showModal,
      selectedMovie,
      openModal,
    }
  },
}
</script>

<style lang="scss" scoped>
.library {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

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
    border: 5px solid $white-color;
    border-radius: 50%;
    border-top-color: $primary-color;
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
}
</style>
