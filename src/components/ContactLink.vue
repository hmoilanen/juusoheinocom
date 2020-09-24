<template>
  <div
    ref="outer"
    class="contact-link"
    :class="classing"
    :style="[styling.outer, cssVars]"
    @mouseenter="expand"
    @mouseleave="expand(false)"
    @click="goToContact"
  >
    <base-icon ref="icon" :style="styling.icon" size="xl">contact</base-icon>
    <transition name="emerge">
      <base-text
        v-show="expanded"
        ref="inner"
        size="s"
      >{{ contactLinkText }}</base-text>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'ContactLink',

  data() {
    return {
      expanded: false,
      hidden: false,
      height: 48, // 48px = 3rem
      widthInner: 0,
      widthIcon: 0,
      animationDuration: 0.4,
      animationDelay: 0.1
    }
  },

  mounted() {
    this.widthIcon = this.$refs.icon.$el.getBoundingClientRect().width
    this.$on('hook:updated', () => {
      this.widthInner = this.$refs.inner.$el.offsetWidth  
    })
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
    contactLinkText() {
      return this.$app.isLoading()
        ? ''
        : this.$store.state.content.contact.link[this.$app.locale()]
    },

    classing() {
      return {
        expanded: this.expanded,
        hidden: this.hidden
      }
    },

    styling() {
      const padding = this.height * 0.5

      return {
        outer: {
          height: `${this.height}px`,
          width: this.expanded
            ? `${padding + padding + this.widthInner + (padding - (this.widthIcon / 3))}px`
            : `${this.height}px`,
          paddingLeft: this.expanded
            ? false
            : `${padding * 2}px`,
          transition: this.expanded
            ? `width ${this.animationDuration}s ease`
            : `width ${this.animationDuration}s ease ${this.animationDelay}s`
        },
        icon: {
          left: `${padding - (this.widthIcon / 2)}px`
        }
      }
    },

    cssVars() {
      return {
        '--animation-emerge--duration': this.animationDuration + 's',
        '--animation-emerge--delay': this.animationDelay + 's'
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
$contact-link--color: $app-color--theme;
$contact-link--color-bg: $app-color--hl;

.contact-link {
  // width / height / padding-left / transition: see, this.styling
  overflow: hidden;
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  display: flex;
  align-items: center;
  @extend %clickable;
  background: $contact-link--color-bg;
  color: $contact-link--color;
  &.hidden {
    opacity: 0;
    @extend %disabled;
  }
  .base-icon {
    // left: see, this.styling
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  .base-text {
    white-space: nowrap;
    font-weight: 700;
    color: $contact-link--color !important;
  }
}

.emerge-enter {
  transform: translateX(100%);
  opacity: 0;
}
.emerge-leave-to { opacity: 0; }
.emerge-enter-active { transition: all var(--animation-emerge--duration) ease var(--animation-emerge--delay); }
.emerge-leave-active { transition: all var(--animation-emerge--duration) ease; }
</style>
