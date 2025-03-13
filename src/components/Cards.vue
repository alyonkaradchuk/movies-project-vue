<template>
  <div :key="id" class="card-movie">
    <img
      class="card-movie__image"
      :src="image.imageUrl"
      alt="movie img"
    />
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


<script>

export default {
  props: {
    id: Number,
    image: Object,
    title: String,
    genre: String,
    year: String,
  },
};
</script>

<style scoped>
.card-movie {
  display: flex;
  flex-direction: column;
  width: 300px;
  min-height: 600px;
  color: #525252;
  transition: transform 0.3s ease-in-out;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 2px 4px 0 rgba(136, 144, 195, 0.2), 0 5px 15px 0 rgba(37, 44, 97, 0.15);
  margin-bottom: 20px;
}

.card-movie:hover {
  background-color: #309df0;
  color: #fff;
  transform: scale(1.05);
}

.card-movie__image {
  width: 100%;
  height: 450px;
  object-fit: cover;
  border-radius: 15px;
}

.card-movie__container {
  padding: 0 12px;
  margin-top: 20px;
}

.card-movie__label {
  display: flex;
  justify-content: space-between;
  list-style: none;
  font-weight: 700;
  margin-bottom: 12px;
}

.card-movie__paragraph {
  margin: 0;
  font-weight: 400;
  text-align: right;
}
</style>
