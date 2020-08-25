<template>
  <div class="content-carousel-indicator" :class="classing" :style="cssVars">
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
  name: 'contentCarouselIndicator',

  props: {
		active: Number,
    amount: Number,
		duration: Number,
		paused: Boolean
  },

  data() {
    return {
      activeItem: null,
			pending: true // To trigger the div.progress transition
    }
	},
	
	watch: {
		active: {
			immediate: true,
			handler() {
				this.activeItem = this.active
			}
		},

		paused: {
			immediate: true,
			handler(newValue) {
				if (!newValue && this.pending) {
					this.pending = false
				}
			}
		}
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
				paused: this.paused,
				pending: this.pending
      }
    },

    cssVars() {
      return {
        '--content-carousel-indicator--transition-duration': this.duration / 1000 + 's'
      }
    }
  },

  methods: {
    choose(index) {
      this.activeItem = index
      this.$emit('new-index', index)
    }
  }
}
</script>

<style lang="scss" scoped>
$index-indicator--color: $app-color--secondary;
$index-indicator--color-active: $app-color--main;
$index-indicator--width: 50px;
$index-indicator--margin: 0.6em;

.content-carousel-indicator {
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
      height: 100%;
      width: 0;
      background: $index-indicator--color-active;
    }
    &.active {
      .index { color: $index-indicator--color-active; }
			.bar { width: $index-indicator--width; }
			.progress {
				width: 100% ;
				transition: width var(--content-carousel-indicator--transition-duration) linear; // see: this.cssVars
			}
    }
	}
	
  &.paused {
		.progress { transition: width 0s linear !important; }
	}
	&.pending {
		.progress { width: 0 !important; }
	}
}
</style>
