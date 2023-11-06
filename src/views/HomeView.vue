<script setup lang="ts">
import { ref, computed } from "vue";
import debounce from "lodash.debounce";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const posterPath = "https://image.tmdb.org/t/p/w500/";
const router = useRouter();
// using vuex store -
const store = useStore();
// console.log("STORE", store.getters);

store.dispatch("MovieStore/fetchPopularMovies");
const movieName = computed(() => store.getters["MovieStore/movieName"]);
const movies = computed(() => store.getters["MovieStore/movies"]);

const searchMovies = debounce((e: any) => {
  let value = e.target.value;
  store.dispatch("MovieStore/setMovieName", value); // to mutate movie name
  store.dispatch("MovieStore/searchMovies");
}, 500);

// // ** On same page (without vux store --
// const baseURL = "https://api.themoviedb.org/3/";
// const token = "336df96fbd5d30fd78d14188a3d6ca12";
// const movieName = ref("");
// interface Movies {
//   id: number;
//   title: string;
//   poster_path: string;
//   adult: boolean;
// }
// const movies = ref<Movies[]>([]);

// const movies = computed(() => store.state.MovieStore.movies);

// const fetchMovies = async () => {
//   //   let res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=336df96fbd5d30fd78d14188a3d6ca12`);
//   let res = await axios.get(
//     `${baseURL}search/movie?query=${movieName.value}&api_key=${token}`
//   );
//   console.log("RESPONSE", res);
//   if (res.status == 200) {
//     movies.value = res.data.results;
//   }
// };

// const searchMovies = debounce(() => {
//   store.dispatch("MovieStore/fetchMovies");
// }, 500);

// const filteredMovies = computed(() => {
//   return movies.value.filter(
//     (movie) =>
//       movie.adult == false
//   );
// });
</script>
<template>
  <div class="container">
    <div class="row mt-5">
      <div class="col-md-6">
        <input
          type="text"
          class="form-control"
          placeholder="Search movie"
          @input="searchMovies"
        />
      </div>
    </div>
    <div class="row mt-3">
      <h4 v-if="movieName == ''">Popular Movies</h4>
      <h5 v-else>Search results</h5>
    </div>
    <div class="row">
      <div class="col-sm-3 p-3 ml-5" v-for="movie in movies" :key="movie.id">
        <div
          class="card"
          style="width: 18rem; padding: 30px; height: 22rem; cursor: pointer"
          @click="router.push(`/movie/${movie.id}`)"
        >
          <img
            :src="posterPath + movie.poster_path"
            class="card-img-top"
            alt="img"
            style="height: 200px; width: 200px"
          />
          <div class="card-body">
            <h5 class="card-title">{{ movie.title }}</h5>
            <p>Release Date : {{ movie.release_date }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
