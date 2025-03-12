<template>
  <header class="header">
    <div v-if="isLibraryPage" class="buttons-container">
      <button class="header-button" @click="$emit('filter', 'watched')">Watched</button>
      <button class="header-button" @click="$emit('filter', 'queue')">Queue</button>
    </div>

    <div v-else class="search-container">
      <input
        type="text"
        v-model="query"
        placeholder="Movie Search"
        @keyup.enter="onSearch"
        class="search-input"
      />
      <button @click="onSearch" class="search-button">Search</button>
    </div>

    <nav class="nav">
      <ul>
        <router-link to="/">Home</router-link>
        <router-link to="/library">My Library</router-link>
      </ul>
    </nav>
  </header>
</template>

<script>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

export default {
  setup(props, { emit }) {
    const route = useRoute()
    const query = ref('')

    const isLibraryPage = computed(() => route.name === 'Library')

    const onSearch = () => {
      emit('search', query.value)
    }

    const handleWatchlist = () => {
      emit('toggleList', 'queue')
    }

    const handleWatched = () => {
      emit('toggleList', 'watched')
    }

    return {
      query,
      onSearch,
      isLibraryPage,
      handleWatchlist,
      handleWatched,
    }
  },
}
</script>

<style scoped>
.header {
  background-image: url('../images/theater-8921521_1920.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  text-align: center;
  color: white;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.search-container,
.buttons-container {
  margin-bottom: 10px;
}

.search-input {
  padding: 10px 20px;
  width: 250px;
  border: none;
  outline: none;
  transition: box-shadow 0.3s;
  border-radius: 5px;
}

.search-button,
.header-button {
  padding: 10px 20px;
  background-color: #ff6347;
  color: white;
  border: none;
  outline: none;
  cursor: pointer;
  transition: background-color 0.3s;
  border-radius: 5px;
}

.search-button:hover,
.header-button:hover {
  background-color: #e5533d;
}

.buttons-container {
  display: flex;
  gap: 15px;
  margin-top: 20px;
}

.header-button {
  padding: 12px 20px;
  width: 100%;
  max-width: 180px;
  border: 2px solid white;
  border-radius: 8px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  background-color: transparent;
  color: white;
  text-transform: uppercase;
}

.header-button:hover {
  background-color: #ff6347;
  color: white;
  border: 2px solid #ff6347;
}

.header-button:focus {
  background-color: #ff6347;
  color: #ffffff;
  border: 2px solid #ff6347;
}

.nav ul {
   list-style-type: none;
   display: flex;
   gap: 30px;
   justify-content: flex-end;
   position: absolute;
   top: 30px;
   right: 30px;
   margin: 0;
   padding: 0;
 }

 .nav li {
   font-size: 18px;
 }

 .nav a {
   color: white;
   text-decoration: none;
   position: relative;
   text-transform: uppercase;
   transition: color 0.3s;
 }

 .nav a:hover {
   color: #ff6347;
 }

 .nav a::after {
   content: '';
   position: absolute;
   left: 0;
   bottom: -5px;
   width: 100%;
   height: 2px;
   background-color: #ff6347;
   opacity: 0;
   transition: opacity 0.3s;
 }

 .nav a:hover::after {
   opacity: 1;
 }
</style>
