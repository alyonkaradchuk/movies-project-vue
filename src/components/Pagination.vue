<template>
  <div v-if="totalPages > 1" class="pagination">
    <button @click="prevPage" :disabled="currentPage === 1">←</button>
    <span>{{ $t('page') }} {{ currentPage }} {{ $t('of') }} {{ totalPages }}</span>
    <button @click="nextPage" :disabled="currentPage === totalPages">→</button>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  props: {
    totalMovies: Number,
    moviesPerPage: Number,
    currentPage: Number,
  },
  emits: ['page-change'],
  setup(props, { emit }) {
    const totalPages = computed(() => Math.ceil(props.totalMovies / props.moviesPerPage))

    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const prevPage = () => {
      if (props.currentPage > 1) {
        emit('page-change', props.currentPage - 1)
        scrollToTop()
      }
    }

    const nextPage = () => {
      if (props.currentPage < totalPages.value) {
        emit('page-change', props.currentPage + 1)
        scrollToTop()
      }
    }

    return {
      totalPages,
      prevPage,
      nextPage,
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/colors.scss';

.pagination {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;

  button {
    margin: 0 10px;
    padding: 5px 10px;
    border: none;
    background-color: $primary-color;
    color: $white-color;
    cursor: pointer;
    border-radius: 5px;

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  }
}
</style>
