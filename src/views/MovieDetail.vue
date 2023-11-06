<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const route = useRoute();

const posterPath = "https://image.tmdb.org/t/p/w500/";
const movieDetails = ref({
  backdrop_path: "",
  title: "",
  overview: "",
  release_date: "",
});
const fetchMovieDetails = () => {
  // 554600
  const movieData = store.dispatch(
    "MovieStore/fetchMovieDetails",
    route.params.id
  );
  movieData
    .then((res: any) => {
      movieDetails.value = res.data;
      console.log("data", movieDetails.value);
    })
    .catch((error: string) => {
      console.log(error);
    });
};
fetchMovieDetails();
</script>
<template>
  <div class="container mt-5">
    <div class="d-flex justify-content-between">
      <div class="ml-auto">
        <a href="/">Back</a>
      </div>
    </div>
    <div class="card mb-3 mt-2">
      <img
        :src="posterPath + movieDetails.backdrop_path"
        class="card-img-top"
        alt="img"
      />
      <div class="card-body">
        <h5 class="card-title">{{ movieDetails.title }}</h5>
        <p class="card-text">
          {{ movieDetails.overview }}
        </p>
        <p class="card-text">
          <small class="text-muted"
            >Release Date: {{ movieDetails.release_date }}</small
          >
        </p>
      </div>
    </div>
  </div>
</template>
<style scoped>
.card img {
  width: 100%;
  height: 300px;
}
</style>
