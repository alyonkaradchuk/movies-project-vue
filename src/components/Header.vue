<template>
  <header class="header">
    <div class="search-container">
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
import { ref } from 'vue'

export default {
  name: 'HeaderComponent',
  setup(props, { emit }) {
    const query = ref('')

    const onSearch = () => {
      emit('search', query.value)
    }

    return {
      query,
      onSearch,
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
}

.search-container {
  position: relative;
  display: flex;
  align-items: center;
}

.search-input {
  padding: 10px 20px;
  width: 250px;
  border: none;
  outline: none;
  transition: box-shadow 0.3s;
  border-radius: 5px;
}

.search-input:focus {
  box-shadow: inset 0 0 10px rgba(255, 99, 71, 0.5);
}

.search-button {
  padding: 10px 20px;
  background-color: #ff6347;
  color: white;
  border: none;
  outline: none;
  cursor: pointer;
  transition: background-color 0.3s;
  border-radius: 5px;
}

.search-button:hover {
  background-color: #e5533d;
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
