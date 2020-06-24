<template>
  <div
    class="contact-link"
    :class="classing"
    @mouseenter="expand"
    @mouseleave="expand(false)"
    @click="goToContact"
  >
    <base-icon size="xl">contact</base-icon>
    <base-text v-if="expanded" size="s">contact me</base-text>
  </div>
</template>

<script>
export default {
  name: 'contactLink',

  data() {
    return {
      expanded: false,
      hidden: false
    }
  },

  watch: {
    $route: {
      immediate: true,
      handler() {
        if (this.$route.name === 'contact') {
          this.hidden = true
        } else {
          this.hidden = false
        }
      }
    }
  },

  computed: {
    classing() {
      return {
        expanded: this.expanded,
        hidden: this.hidden
      }
    }
  },

  methods: {
    expand(out) {
      if (!out) {
        this.expanded = false
      } else {
        this.expanded = true
      }
    },

    goToContact() {
      if (this.$route.name !== 'contact') {
        this.$router.push({ name: 'contact' })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$contact-link--colour-bg: $app-color--hl;
$link-height: 48px;

.contact-link {
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  //width: $link-height;
  width: auto;
  height: $link-height;
  //border-radius: calc(#{$link-height} / 2);
  padding: 0 calc(#{$link-height} / 2);
  display: flex;
  align-items: center;
  @extend %clickable;
  background: $contact-link--colour-bg;
  color: white;
  transition: width 1s ease;

  .base-icon {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    //stroke: blue;
    //stroke-width: .5em;
  }
  .base-text {
    margin-left: 1rem;
  }

  &.expanded {
    //background: orange;
    //width: 
  }

  &.hidden {
    opacity: 0;
    @extend %disabled;
  }
}
</style>
