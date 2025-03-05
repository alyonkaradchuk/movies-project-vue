<template>
  <div :key="id" class="card-movie">
    <img
      class="card-movie__image"
      :src="image.imageUrl"
      alt="movie img"
    />
    <div class="card-movie__container">
      <span class="card-movie__label">
        Name:
        <p class="card-movie__paragraph">{{ title }}</p>
      </span>
      <span class="card-movie__label">
        Genre:
        <p class="card-movie__paragraph">{{ genre }}</p>
      </span>
      <span class="card-movie__label">
        Year:
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
  margin: 0;
  padding: 0;
  color: #525252;
  border-radius: 15px;
  transition: transform 0.3s ease-in-out;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(136, 144, 195, 0.2), 0 5px 15px 0 rgba(37, 44, 97, 0.15);
}

.card-movie:hover {
  background-color: #309df0;
  color: #fff;
  transform: scale(1.05);
}

.card-movie__image {
  width: 100%;
  height: 450px;
  border-radius: 15px 15px 0 0;
  object-fit: cover;
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
