<template>
  <div v-if="show" class="modal-overlay" @click.self="$emit('close')">
    <div class="modal">
      <button class="close-btn" @click="$emit('close')">✖</button>
      <img :src="posterUrl" alt="Movie Poster" class="poster" />
      <div class="modal-content">
        <h2>{{ movie?.title || movie?.name }}</h2>
        <p>
          <strong>Vote/Votes:</strong>
          <span class="vote-score">{{ movie?.vote_average.toFixed(1) }}</span>
          / {{ movie?.vote_count }}
        </p>
        <p><strong>Popularity:</strong> {{ movie?.popularity.toFixed(1) }}</p>
        <p><strong>Genre:</strong> {{ genreList }}</p>
        <p>
          <strong>Year:</strong>
          {{ movie?.release_date ? movie?.release_date.split('-')[0] : 'Unknown' }}
        </p>
        <p><strong>About:</strong> {{ movie?.overview }}</p>
        <div class="button-group">
          <button class="action-btn" @click="addToWatched">Add to Watched</button>
          <button class="action-btn" @click="addToQueue">Add to Queue</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { getPoster, fetchGenres } from '@/ api/fetchMovies'

export default {
  props: {
    show: Boolean,
    movie: Object,
  },
  setup(props, { emit }) {
    const genres = ref({})
    const posterUrl = computed(() => (props.movie ? getPoster(props.movie.poster_path) : ''))

    const getGenres = (genreIds) => {
      return genreIds.map((id) => genres.value[id] || 'Other').join(', ')
    }

    const genreList = computed(() =>
      props.movie?.genre_ids?.length ? getGenres(props.movie.genre_ids) : 'Unknown'
    )

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        emit('close')
      }
    }

    onMounted(async () => {
      genres.value = await fetchGenres()
      document.addEventListener('keydown', closeOnEscape)
    })

    onUnmounted(() => {
      document.removeEventListener('keydown', closeOnEscape)
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

.vote-score {
  display: inline-block;
  background-color: #ff6347;
  color: white;
  margin-left: 5px;
  border-radius: 5px;
  font-weight: bold;
  min-width: 35px;
  text-align: center;
}

.button-group {
  display: flex;
  gap: 15px;
  margin-top: 20px;
}

.action-btn {
  padding: 12px 20px;
  width: 100%;
  max-width: 180px;
  border: 2px solid #ff6347;
  border-radius: 8px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  background-color: transparent;
  color: #ff6347;
  text-transform: uppercase;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.action-btn:hover {
  background-color: #ff6347;
  color: white;
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
