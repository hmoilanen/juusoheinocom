<template>
  <div class="base-index-indicator" :class="classing" :style="cssVars">
    <div
      v-for="(item, index) in items"
      :key="index"
      @click="choose(index)"
      class="item"
      :class="{ active: activeItem === index }"
    >
      <div class="index">{{ item }}</div>
      <div class="bar">
        <div class="progress"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'baseIndexIndicator',

  props: {
    amount: {
      type: Number,
      default: 12
    },
    duration: {
      type: Number,
      default: 3000
    }
  },

  data() {
    return {
      activeItem: null,
      automatic: true,
      beginning: true,
    }
  },

  mounted() {
    setTimeout(() => { // for the first transitioning of .progress to behave as wanted
      this.activeItem = 0
    }, 1)

    let interval = setInterval(() => {
      if (this.automatic) {
        if (this.activeItem === this.items.length - 1) {
          this.activeItem = 0
        } else {
          this.activeItem ++
          if (this.beginning) { // happens only once
            this.beginning = false
          }
        }
      } else {
        clearInterval(interval)
      }
    }, this.duration)
  },

  computed: {
    items() {
      let items = []

      for (let i = 1; i <= this.amount; i++) {
        let number
        if (i < 10) { number = '0' + i }
        else { number = i }
        items.push(number)
      }
      return items
    },
    
    classing() {
      return {
        automatic: this.automatic,
        beginning: this.beginning
      }
    },

    cssVars() {
      return {
        '--transition-duration': this.duration / 1000 + 's'
      }
    }
  },

  methods: {
    choose(index) {
      this.activeItem = index
      this.automatic = false
      this.$emit('new-index', index)
    }
  }
}
</script>

<style lang="scss" scoped>
$index-indicator--color: rgb(180, 180, 180);
$index-indicator--color-active: black;
$index-indicator--width: 50px;
$index-indicator--margin: 0.6em;

.base-index-indicator {
  display: flex;
  font-size: 1.1rem;

  .item {
    display: flex;
    align-items: center;
    .index {
      margin: 0 $index-indicator--margin;
      font-weight: 700;
      color: $index-indicator--color;
      cursor: pointer;
      &:hover { color: $index-indicator--color-active; }
    }
    .bar {
      transition: width 0.25s linear;
      position: relative;
      height: 2px;
      width: 0;
      background:  $index-indicator--color;
    }
    .progress {
      transition: width 0s linear; // mimics 'no transition' if this.automatic: false
      height: 100%;
      width: 0;
      background:  $index-indicator--color-active;
    }
    &.active {
      .index { color: $index-indicator--color-active; }
      .bar { width: $index-indicator--width; }
      .progress { width: 100%; }
    }
  }
  &.beginning { // only for the first interval
    .bar { transition: width 0s linear; }
  }
  &.automatic {
    //.progress { transition: width 3s linear; }
    .progress { transition: width var(--transition-duration) linear; }
  }
}
</style>
