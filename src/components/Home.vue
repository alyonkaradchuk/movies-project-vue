<template>
  <div class="home">
    <HeaderComponent @search="onSearch" />

    <div v-if="isLoading">
      <p>Loading...</p>
    </div>

    <div v-if="paginatedMovies.length" class="movies-container">
      <div class="movie" v-for="movie in paginatedMovies" :key="movie.id" @click="openModal(movie)">
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

    <Modal :show="isModalOpen" :movie="selectedMovie" @close="closeModal" />
    <AppFooter />
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'
import HeaderComponent from '../components/Header.vue'
import Cards from '../components/Cards.vue'
import { fetchTrendingMovies, searchMovies, getPoster, fetchGenres } from '../ api/fetchMovies'
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

    const isModalOpen = ref(false);
    const selectedMovie = ref(null);

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
      if (query.trim()) {
        const result = await searchMovies(query)
        data.value = result.results || []
      } else {
        const result = await fetchTrendingMovies()
        data.value = result.results || []
      }
    }

    const openModal = (movie) => {
      selectedMovie.value = movie;
      isModalOpen.value = true;
    };

    const closeModal = () => {
      isModalOpen.value = false;
      selectedMovie.value = null;
    };


    onMounted(async () => {
      const genresData = await fetchGenres();
      genres.value = genresData;
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
      isModalOpen,
      selectedMovie,
      openModal,
      closeModal,
    }
  },
}
</script>

<style scoped>
.home {
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
