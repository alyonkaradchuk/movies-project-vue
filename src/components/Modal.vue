<template>
  <div v-if="show" class="modal-overlay" @click.self="emit('close')">
    <div class="modal">
      <button class="close-btn" @click="emit('close')">✖</button>
      <div class="modal-picture">
        <img :src="posterUrl" alt="Movie Poster" class="poster" />
      </div>
      <div class="modal-content">
        <h2 class="modal-content__title">{{ movie?.title || movie?.name }}</h2>
        <p class="paragraph">
          <strong class="text-bold">{{ $t('voteVotes') }}:</strong>
          <span class="vote-score">{{ movie?.vote_average.toFixed(1) }}</span>
          / {{ movie?.vote_count }}
        </p>
        <p class="paragraph">
          <strong class="text-bold">{{ $t('popularity') }}:</strong>
          {{ movie?.popularity.toFixed(1) }}
        </p>
        <p class="paragraph">
          <strong class="text-bold">{{ $t('movieGenre') }}:</strong> {{ genreList }}
        </p>
        <p class="paragraph">
          <strong class="text-bold">{{ $t('movieYear') }}:</strong>
          {{ movie?.release_date ? movie?.release_date.split('-')[0] : 'Unknown' }}
        </p>
        <p class="paragraph">
          <strong class="text-bold">{{ $t('about') }}:</strong> {{ movie?.overview }}
        </p>
        <div class="button-group">
          <button class="action-btn" @click="toggleWatched">{{ watchedText }}</button>
          <button class="action-btn" @click="toggleQueue">{{ queueText }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { getPoster, fetchGenres } from '../api/fetchMovies'

const props = defineProps({
  show: Boolean,
  movie: Object
})

const emit = defineEmits(['close'])

const genres = ref({})
const watchedMovies = ref(JSON.parse(localStorage.getItem('watched')) || [])
const queueMovies = ref(JSON.parse(localStorage.getItem('queue')) || [])

const posterUrl = computed(() => (props.movie ? getPoster(props.movie.poster_path) : ''))

const genreList = computed(() => {
  if (!props.movie?.genre_ids?.length) return 'Unknown'
  return props.movie.genre_ids
    .map((id) => genres.value[id] || 'Other')
    .join(', ')
})

const isWatched = computed(() =>
  watchedMovies.value.some((m) => m.id === props.movie?.id)
)

const isQueued = computed(() =>
  queueMovies.value.some((m) => m.id === props.movie?.id)
)

const watchedText = computed(() =>
  isWatched.value ? 'Remove from watched' : 'Add to watched'
)

const queueText = computed(() =>
  isQueued.value ? 'Remove from queue' : 'Add to queue'
)

function toggleWatched() {
  if (isWatched.value) {
    watchedMovies.value = watchedMovies.value.filter((m) => m.id !== props.movie.id)
  } else {
    watchedMovies.value.push(props.movie)
  }
  localStorage.setItem('watched', JSON.stringify(watchedMovies.value))
}

function toggleQueue() {
  if (isQueued.value) {
    queueMovies.value = queueMovies.value.filter((m) => m.id !== props.movie.id)
  } else {
    queueMovies.value.push(props.movie)
  }
  localStorage.setItem('queue', JSON.stringify(queueMovies.value))
}

function closeOnEscape(event) {
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
</script>

<style lang="scss" scoped>
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
  backdrop-filter: blur(5px);
}

.modal {
  position: relative;
  width: 90%;
  max-width: 900px;
  height: 70%;
  max-height: 600px;
  background: $white-color;
  padding: 30px;
  border-radius: 15px;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: space-between;
  text-align: left;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  overflow: hidden;

  .poster {
    height: 100%;
    border-radius: 12px;
  }

  .modal-content {
    flex: 1;
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .vote-score {
      display: inline-block;
      background-color: $primary-color;
      color: $white-color;
      margin-left: 5px;
      border-radius: 5px;
      font-weight: bold;
      min-width: 35px;
      text-align: center;
    }
  }

  .button-group {
    display: flex;
    gap: 15px;
    margin-top: 20px;

    .action-btn {
      padding: 12px 20px;
      width: 100%;
      max-width: 180px;
      border: 2px solid $primary-color;
      border-radius: 8px;
      font-size: 14px;
      font-weight: bold;
      cursor: pointer;
      background-color: transparent;
      color: $primary-color;
      text-transform: uppercase;
      transition:
        background-color 0.3s ease,
        color 0.3s ease;

      &:hover {
        background-color: $primary-color;
        color: $white-color;
      }
    }
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

    &:hover {
      color: #000;
    }
  }

  .paragraph {
    font-size: 18px;
    color: #333;
    margin: 8px 0;
  }
}

@media (max-width: 768px) {
  .modal {
    flex-direction: column;
    max-width: 350px;
    height: 90%;
    max-height: max-content;
    padding: 15px 20px 30px;
    border-radius: 15px;
    overflow-y: scroll;
    margin: 0 20px;

    .paragraph {
      font-size: 14px;
      margin: 0 0 8px;
      padding-left: 10px;
    }

    .modal-picture {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      max-height: 400px;
      margin-top: 48px;
    }

    .button-group {
      justify-content: center;
    }

    .text-bold {
      font-size: 16px;
      color: #000;
    }

    .modal-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex-grow: 1;
      padding: 0;

      .modal-content__title {
        margin: 18px auto;
        font-size: 20px;
      }
    }
  }
}
</style>
