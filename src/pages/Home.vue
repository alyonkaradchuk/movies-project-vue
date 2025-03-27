<template>
  <div class="home">
    <HeaderComponent @search="onSearch" />

    <div class="content">
      <div class="loader-container" v-if="isLoading">
        <div class="loader"></div>
      </div>

      <template v-else>
        <div v-if="paginatedMovies.length" class="movies-container">
          <div
            class="movie"
            v-for="movie in paginatedMovies"
            :key="movie.id"
            @click="openModal(movie)"
          >
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
          <p>{{ $t('noMoviesFound') }}</p>
        </div>
      </template>
    </div>

    <Modal :show="isModalOpen" :movie="selectedMovie" @close="closeModal" />
    <AppFooter />
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import HeaderComponent from '../components/Header.vue'
import Cards from '../components/Cards.vue'
import { fetchTrendingMovies, searchMovies, getPoster, fetchGenres } from '../api/fetchMovies'
import Pagination from '../components/Pagination.vue'
import Modal from '../components/Modal.vue'
import AppFooter from '../components/Footer.vue'

export default {
  components: {
    HeaderComponent,
    Cards,
    Pagination,
    Modal,
    AppFooter,
  },
  setup() {
    const data = ref([])
    const genres = ref({})
    const currentPage = ref(1)
    const moviesPerPage = 8
    const isLoading = ref(true)
    const isModalOpen = ref(false)
    const selectedMovie = ref(null)
    let timeoutId = null

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

    const getGenres = (genreIds) => {
      return genreIds.map((id) => genres.value[id] || 'Other').join(', ')
    }

    const onSearch = async (query) => {
      currentPage.value = 1
      isLoading.value = true
      clearTimeout(timeoutId)
      if (query.trim()) {
        const result = await searchMovies(query)
        data.value = result.results || []
      } else {
        const result = await fetchTrendingMovies()
        data.value = result.results || []
      }
      timeoutId = setTimeout(() => {
        isLoading.value = false
      }, 600)
    }

    const openModal = (movie) => {
      selectedMovie.value = movie
      isModalOpen.value = true
    }

    const closeModal = () => {
      isModalOpen.value = false
      selectedMovie.value = null
    }

    onMounted(async () => {
      const genresData = await fetchGenres()
      genres.value = genresData
      const result = await fetchTrendingMovies()
      data.value = result.results || []

      timeoutId = setTimeout(() => {
        isLoading.value = false
      }, 600)
    })

    onUnmounted(() => {
      clearTimeout(timeoutId)
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
      isModalOpen,
      selectedMovie,
      openModal,
      closeModal,
    }
  },
}
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  .content {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 70vh;
  }

  .loader-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
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

  .movies-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    padding: 20px;
  }
}
</style>
