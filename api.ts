const API_KEY = '10923b261ba94d897ac6b81148314a3f';
const BASE_URL = 'https://api.themoviedb.org/3';

export const trending = () =>
  fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`).then((response) =>
    response.json(),
  );

export const upcoming = () =>
  fetch(`${BASE_URL}/trending/movie/upcoming?api_key=${API_KEY}`).then(
    (response) => response.json(),
  );

export const nowPlaying = () =>
  fetch(`${BASE_URL}/trending/movie/now_playing?api_key=${API_KEY}`).then(
    (response) => response.json(),
  );
