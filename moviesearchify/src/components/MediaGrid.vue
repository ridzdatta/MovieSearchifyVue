<template>
  <v-layout row wrap  @click="showModal = true">
    <v-flex xs12 sm6 md4 lg3 v-for="movie in movies" :key="movie.id">
      <v-card hover class="ma-3" min-height="500">
        <v-layout column align-center fill-height class="text-center">
          <v-img :src="movie.poster_path"></v-img>

          <v-card-title class="font-weight-light">{{movie.title}}</v-card-title>
          <v-spacer></v-spacer>
          <v-card-title class="font-weight-light">{{movie.original_language}}</v-card-title>
          <v-spacer></v-spacer>
           <v-card-title class="font-weight-light">@{{movie.location}}</v-card-title>
          <v-spacer></v-spacer>

          <v-card-text>
            <v-expansion-panels focusable>
              <v-expansion-panel id="synopsis">
                <v-expansion-panel-header>Synopsis</v-expansion-panel-header>
                <v-expansion-panel-content>{{movie.overview}}</v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card-text>
          <v-progress-circular
            size="90"
            color="white"
            rotate="-90"
            width="8"
            :value="movie.vote_average * 10"
            class="font-weight-heavy my-5"
          >{{movie.vote_average * 10}}</v-progress-circular>
        </v-layout>
      </v-card>
    </v-flex>

    <!-- template for the modal component -->
    <script type="text/x-template" id="modal-template">
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">

              <div class="modal-header">
                <slot name="header">
                  default header
                </slot>
              </div>

              <div class="modal-body">
                <slot name="body">
                  default body
                </slot>
              </div>

              <div class="modal-footer">
                <slot name="footer">
                  default footer
                  <button class="modal-default-button" @click="$emit('close')">
                    OK
                  </button>
                </slot>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </script>

  </v-layout>
</template>

<script>
  export default {
    props: ["movies"],
    data() {
      showModal: false;
      return {};
    }
  };
</script>

<style scoped>
  .v-card:hover {
    background: #536dfe;
  }
  .v-card:hover #synopsis {
    /* background: #303030; */
    background: #303030;
  }
  #synopsis {
    background: #536dfe;
  }

  .modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>