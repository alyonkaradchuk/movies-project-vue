<template>
  <div v-if="totalPages > 1" class="pagination">
    <button @click="prevPage" :disabled="currentPage === 1">←</button>
    <span>{{ $t('page') }} {{ currentPage }} {{ $t('of') }} {{ totalPages }}</span>
    <button @click="nextPage" :disabled="currentPage === totalPages">→</button>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  totalMovies: {
    type: Number,
    required: true
  },
  moviesPerPage: {
    type: Number,
    required: true
  },
  currentPage: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['page-change'])

const totalPages = computed(() => Math.ceil(props.totalMovies / props.moviesPerPage))

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function prevPage() {
  if (props.currentPage > 1) {
    emit('page-change', props.currentPage - 1)
    scrollToTop()
  }
}

function nextPage() {
  if (props.currentPage < totalPages.value) {
    emit('page-change', props.currentPage + 1)
    scrollToTop()
  }
}
</script>

<style lang="scss" scoped>
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
