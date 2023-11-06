import axios from "axios";

function initialstate() {
  return {
    movieName: "",
    movies: [],
  };
}
const getters = {
  movieName: (state) => state.movieName,
  movies: (state) => {
    return state.movies.filter((movie) => movie.adult == false);
  },
};

const baseURL = "https://api.themoviedb.org/3/";
const token = "336df96fbd5d30fd78d14188a3d6ca12";

const actions = {
  async fetchPopularMovies({ commit }) {
    let res = await axios.get(`${baseURL}movie/popular?api_key=${token}`);
    // console.log("RESPONSE", res);
    if (res.status == 200) {
      commit("setmovies", res.data.results);
    }
  },
  async searchMovies({ commit, state, dispatch }) {
    if (state.movieName != "") {
      let res = await axios.get(
        `${baseURL}search/movie?query=${state.movieName}&api_key=${token}`
      );
      // console.log("Search res", res);
      if (res.status == 200) {
        commit("setmovies", res.data.results);
      }
    } else {
      dispatch("fetchPopularMovies");
    }
  },
  async fetchMovieDetails({ commit }, movieid) {
    let result = await axios.get(`${baseURL}movie/${movieid}?api_key=${token}`);
    if (result.status == 200) {
      return result;
    }
  },
  setMovieName({ commit }, value) {
    commit("mutateMovieName", value);
  },
  resetstate({ commit }) {
    commit("resetstate");
  },
};

const mutations = {
  resetstate(state) {
    state = Object.assign(state, initialstate());
  },
  mutateMovieName(state, value) {
    state.movieName = value;
  },
  setmovies(state, data) {
    state.movies = data;
  },
};

export default {
  namespaced: true,
  state: initialstate,
  getters,
  actions,
  mutations,
};
