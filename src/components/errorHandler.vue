<template>
  <div class="error-handler" :style="styling">

    <!-- POISTA!!! -->
    <base-button @click="addError">add (poista tämä nappi)</base-button>

    <transition-group
      v-if="errors"
      name="anim"
      tag="div"
      appear
    >
      <div v-for="error in errors" :key="error.id" class="error">
        <base-title size="s" tag="h3">ERROR: <span>{{ error.id }}</span></base-title>
        <base-text mT="s">{{ error.text }}</base-text>
        <base-button @click="dismiss(error)" :empty="true" size="s" mT="m">ok</base-button>
      </div>
    </transition-group>

  </div>
</template>

<script>
export default {
  name: 'errorHandler',

  computed: {
    errors() {
      return this.$store.state.app.errors
    },

    styling () {
      let ui = this.$store.state.app.ui

      return {
        zIndex: ui.zIndex.errorHandler ? ui.zIndex.errorHandler : false,
        top: ui.navTopHeight ? ui.navTopHeight + 'px' : 0
      }
    }
  },

  methods: {
    addError () {
      // HUOM!!! RIKKE! POISTA TÄMÄ JA KAIKKI STOREN TÄHÄN LIITTYVÄ KURA!!!
      // HUOM!!! RIKKE! POISTA TÄMÄ JA KAIKKI STOREN TÄHÄN LIITTYVÄ KURA!!!
      // HUOM!!! RIKKE! POISTA TÄMÄ JA KAIKKI STOREN TÄHÄN LIITTYVÄ KURA!!!
      let error = {
        type: 404,
        id: Date.now(),
        text: '404 - page not found'
      }

      this.$store.dispatch('app/SET_ERROR', error)
    },

    dismiss (error) {
      this.$store.dispatch('app/DELETE_ERROR', error)
    }
  }
}
</script>

<style lang="scss" scoped>
$error-color: $app-color--error;
$error-color--border: $app-color--main;
$error-color--bg: $app-color--theme;

.error-handler {
  position: fixed;
  //top: ; // see: this.styling
  right: 0;
  bottom: 0;
  overflow-y: auto;
  width: 90vmin;
  max-width: 350px;
  padding: 0.8rem;
  display: flex;
  flex-direction: column-reverse;
  pointer-events: none;
  & > * { pointer-events: auto; }

  .error {
    flex-shrink: 0;
    margin-bottom: 0.4rem;
    padding: 1.2rem 1.2rem;
    border-radius: 3px;
    border: 1px solid $error-color--border;
    background-color: $error-color--bg;

    .base-title span { color: $error-color; }
  }
}

// animations
$animation-duration: 0.5s;

.anim-enter { opacity: 0; }
.anim-leave { opacity: 1; }
.anim-enter-active {
  animation: anim-in $animation-duration ease forwards;
  transition: opacity $animation-duration;
}
.anim-leave-active  {
  animation: anim-out $animation-duration ease forwards;
  opacity: 0;
  transition: opacity $animation-duration;
  position: absolute;
}
.anim-move { transition: transform $animation-duration; }

@keyframes anim-in {
  from { transform: translateX(100%); }
  to { transform: translateX(0%); }
}
@keyframes anim-out {
  from { transform: translateX(0%); }
  to { transform: translateX(100%); }
}
</style>
