import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    watched: 'Watched',
    queue: 'Queue',
    search: 'Search',
    searchPlaceholder: 'Movie Search',
    home: 'Home',
    myLibrary: 'My Library',
    allRightsReserved: 'All rights reserved',
    developedWith: 'Developed with',
    page: 'Page',
    of: 'of',
    movieName: 'Name',
    movieGenre: 'Genre',
    movieYear: 'Year',
    voteVotes: 'Vote/Votes',
    popularity: 'Popularity',
    about: 'About',
    addToWatched: 'Add to Watched',
    addToQueue: 'Add to Queue',
    noMoviesFound: 'No movies found. Enter the correct movie name.',
    watchedEmptyMessage: 'You have not watched any movies yet. Start adding them!',
    queueEmptyMessage: 'Your queue is empty. Add some movies!',
  },
  uk: {
    watched: 'Переглянуто',
    queue: 'Подивитись',
    search: 'Пошук',
    searchPlaceholder: 'Пошук фільмів',
    home: 'Головна',
    myLibrary: 'Моя бібліотека',
    allRightsReserved: 'Усі права захищені',
    developedWith: 'Розроблено з',
    page: 'Сторінка',
    of: 'з',
    movieName: 'Назва',
    movieGenre: 'Жанр',
    movieYear: 'Рік',
    voteVotes: 'Голоси',
    popularity: 'Рейтинг',
    about: 'Опис',
    addToWatched: 'Додати до переглянутого',
    addToQueue: 'Переглянути пізніше',
    noMoviesFound: 'Не знайдено фільмів. Введіть правильну назву фільму.',
    watchedEmptyMessage: 'Ви ще не подивились жодного фільму. Додайте переглянуті фільми!',
    queueEmptyMessage: 'Ваш список до перегляду пустий. Додайте фільми!',
  },
}

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('lang') || 'en',
  fallbackLocale: 'en',
  messages,
})

export default i18n
