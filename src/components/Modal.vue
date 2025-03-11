<template>
  <div v-if="show" class="modal-overlay" @click.self="$emit('close')">
    <div class="modal">
      <button class="close-btn" @click="$emit('close')">✖</button>
      <img :src="posterUrl" alt="Movie Poster" class="poster" />
      <div class="modal-content">
        <h2>{{ movie?.title || movie?.name }}</h2>
        <p><strong>Genre:</strong> {{ genreList }}</p>
        <p>
          <strong>Year:</strong>
          {{ movie?.release_date ? movie?.release_date.split('-')[0] : 'Unknown' }}
        </p>
        <p><strong>Overview:</strong> {{ movie?.overview }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { getPoster, fetchGenres } from '@/ api/fetchMovies'

export default {
  props: {
    show: Boolean,
    movie: Object,
  },
  setup(props) {
    const genres = ref({})
    const posterUrl = computed(() => (props.movie ? getPoster(props.movie.poster_path) : ''))

    const getGenres = (genreIds) => {
      return genreIds.map((id) => genres.value[id] || 'Other').join(', ')
    }

    const genreList = computed(() =>
      props.movie?.genre_ids?.length ? getGenres(props.movie.genre_ids) : 'Unknown'
    )

    onMounted(async () => {
      genres.value = await fetchGenres()
    })

    return {
      posterUrl,
      genreList,
      getGenres,
    }
  },
  emits: ['close'],
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
}

.modal {
  position: relative;
  width: 90%;
  max-width: 900px;
  height: 70%;
  max-height: 600px;
  background: #fff;
  padding: 30px;
  border-radius: 15px;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: space-between;
  text-align: left;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}

.poster {
  width: 40%;
  max-width: 350px;
  height: 100%;
  border-radius: 12px;
  object-fit: cover;
}

.modal-content {
  flex: 1;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #555;
  transition: color 0.3s ease;
}

.close-btn:hover {
  color: #000;
}

p {
  font-size: 18px;
  color: #333;
  margin: 8px 0;
}
</style>
