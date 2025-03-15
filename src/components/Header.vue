<template>
  <header class="header">
    <div v-if="isLibraryPage" class="buttons-container">
      <button class="header-button" @click="$emit('filter', 'watched')">{{ $t('watched') }}</button>
      <button class="header-button" @click="$emit('filter', 'queue')">{{ $t('queue') }}</button>
    </div>

    <div v-else class="search-container">
      <input
        type="text"
        v-model="query"
        :placeholder="$t('searchPlaceholder')"
        @keyup.enter="onSearch"
        class="search-input"
      />
      <button @click="onSearch" class="search-button">{{ $t('search') }}</button>
    </div>

    <nav class="nav">
      <ul class="nav__list">
        <router-link class="nav__link" to="/">{{ $t('home') }}</router-link>
        <router-link class="nav__link" to="/library">{{ $t('myLibrary') }}</router-link>
      </ul>
      <div class="language-switcher">
      <select v-model="currentLocale" @change="changeLanguage" class="language-select">
        <option value="en">EN</option>
        <option value="uk">UK</option>
      </select>
    </div>
    </nav>
  </header>
</template>

<script>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

export default {
  setup(props, { emit }) {
    const route = useRoute()
    const { locale } = useI18n()
    const query = ref('')
    const currentLocale = ref(localStorage.getItem('lang') || 'en')

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

    const changeLanguage = () => {
      locale.value = currentLocale.value
      localStorage.setItem('lang', currentLocale.value)
    }

    return {
      query,
      onSearch,
      isLibraryPage,
      handleWatchlist,
      handleWatched,
      changeLanguage,
      currentLocale,
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/colors.scss';

.header {
  background-image: url("../images/theater-8921521_1920.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  text-align: center;
  color: $white-color;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
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
  background-color: $primary-color;
  color: $white-color;
  border: none;
  outline: none;
  cursor: pointer;
  transition: background-color 0.3s;
  border-radius: 5px;

  &:hover {
    background-color: $hover-color;
  }
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
  border: 2px solid $white-color;
  border-radius: 8px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  background-color: transparent;
  color: $white-color;
  text-transform: uppercase;

  &:hover,
  &:focus {
    background-color: $primary-color;
    color: $white-color;
    border: 2px solid $primary-color;
  }
}

.nav__list {
  list-style-type: none;
  display: flex;
  gap: 30px;
  justify-content: flex-end;
  position: absolute;
  top: 30px;
  right: 30px;
  margin: 0;
  padding: 0;
  font-size: 18px;
}

.nav__link {
  color: $white-color;
  text-decoration: none;
  position: relative;
  text-transform: uppercase;
  transition: color 0.3s;

  &:hover {
    color: $primary-color;
  }
}

.router-link-active {
  color: $primary-color;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -5px;
    width: 100%;
    height: 2px;
    background-color: $primary-color;
    opacity: 1;
  }
}

.language-switcher {
  position: absolute;
  top: 30px;
  left: 30px;
}

.language-select {
  background: transparent;
  color: $white-color;
  border: 2px solid $white-color;
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 5px;
  text-transform: uppercase;

  &:focus {
    outline: none;
  }
}

@media (max-width: 768px) {

  .search-input {
    width: 150px;
    margin-top: 15px;
  }

  .nav__list {
    font-size: 14px;
  }

  .language-select {
    padding: 2px 6px;
  }

  .language-switcher {
    top: 26px;
  }

  .header-button {
    padding: 8px 12px;
  }
}
</style>
