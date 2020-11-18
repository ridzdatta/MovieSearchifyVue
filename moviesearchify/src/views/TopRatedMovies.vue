<template>
  <v-container>
    <media-nav
      :pageTitle="pageTitle"
      :sortCriteria="sortCriteria"
      @popularity="sortBy('popularity')"
      @vote_average="sortBy('vote_average')"
      @release_date="sortBy('release_date')"
    ></media-nav>
    <media-grid :movies="movies" :imageURL="imageURL"></media-grid>
    <div class="text-center" v-if="showPagination">
      <v-pagination color="primary" v-model="page" :length="3" :value="page"></v-pagination>
    </div>
  </v-container>
</template>

<script>
  import axios from "axios";
  import MediaGrid from "../components/MediaGrid.vue";
  import MediaNav from "../components/MediaNav.vue";
  import Constants from "../constant.js";

  export default {
    components: {
      mediaGrid: MediaGrid,
      mediaNav: MediaNav
    },
    data() {
      return {
        movies: [],
        sortCriteria: "Most Popular",
        pageTitle: "Top Rated Movies",
        sortedBy: "popularity",
        page: 1,
        showPagination: false
      };
    },
    methods: {
      init() {
        const key = process.env.VUE_APP_KEY;
        
        const options = {  headers: {'Access-Control-Allow-Origin': '*'}};
        axios
          .get(
            Constants.API_BASE_LINK + "api/Movies"
          )
          .then(response => {
            // handle success
            console.log(response);
            var dataResponse = response.data;
            var newArr=[];
            for (var i = 0; i < dataResponse.length; i++) {
              var obj = dataResponse[i];

              obj.original_language = obj.Language;
              obj.location = obj.Location;
              obj.overview = obj.Plot;
              obj.poster_path = obj.Poster;
              obj.soundeffects = obj.SoundEffects;
              obj.stills = obj.Stills;
              obj.title = obj.Title;
              obj.id = obj.imdbID;
              obj.vote_average = obj.imdbRating;
              obj.adult =  false;
              obj.video = false;

              delete obj.Language;
              delete obj.Location;
              delete obj.Plot;
              delete obj.Poster;
              delete obj.SoundEffects;
              delete obj.Stills;
              delete obj.Title;
              delete obj.imdbID;
              delete obj.imdbRating;
   
              newArr.push(obj);
              }
              this.movies = newArr;
          })
          .catch(error => {
            // handle error
            console.log(error);
          })
          .finally(() => {
            // always executed

            this.sortBy(this.sortedBy);
            this.showPagination = true;
          });
      },
      sortBy(prop) {
        if (prop === "vote_average") {
          this.sortCriteria = "Highest Rated";
        }
        this.sortedBy = prop;
        this.movies.sort((a, b) => (a[prop] > b[prop] ? -1 : 1));
      }
    },
    watch: {
      page: function(page) {
        this.init();
      }
    },
    mounted() {
      this.init();
    }
  };
</script>

<style>
</style>
