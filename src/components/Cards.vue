<template>
  <div :key="id" class="card-movie">
    <img class="card-movie__image" :src="image.imageUrl" alt="movie img" />
    <div class="card-movie__container">
      <span class="card-movie__label">
        {{ $t('movieName') }}:
        <p class="card-movie__paragraph">{{ title }}</p>
      </span>
      <span class="card-movie__label">
        {{ $t('movieGenre') }}:
        <p class="card-movie__paragraph">{{ genre }}</p>
      </span>
      <span class="card-movie__label">
        {{ $t('movieYear') }}:
        <p class="card-movie__paragraph">{{ year }}</p>
      </span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  id: {
    type: Number,
    required: true
  },
  image: {
    type: Object,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  genre: {
    type: String,
    default: ''
  },
  year: {
    type: String,
    default: ''
  }
})
</script>

<style lang="scss" scoped>
.card-movie {
  display: flex;
  flex-direction: column;
  width: 300px;
  min-height: 600px;
  color: #525252;
  transition: transform 0.3s ease-in-out;
  background-color: $white-color;
  border-radius: 15px;
  box-shadow:
    0 2px 4px 0 rgba(136, 144, 195, 0.2),
    0 5px 15px 0 rgba(37, 44, 97, 0.15);
  margin-bottom: 20px;

  &:hover {
    background-color: $primary-color;
    color: $white-color;
    transform: scale(1.05);
  }

  &__image {
    width: 100%;
    height: 450px;
    object-fit: cover;
    border-radius: 15px;
  }

  &__container {
    padding: 0 12px;
    margin-top: 20px;
  }

  &__label {
    display: flex;
    justify-content: space-between;
    list-style: none;
    font-weight: 700;
    margin-bottom: 12px;
  }

  &__paragraph {
    margin: 0;
    font-weight: 400;
    text-align: right;
  }
}
</style>
