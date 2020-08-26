<template>
  <div class="tab-bar" :style="cssVars">
    <div
      v-for="(tab, index) in tabs"
      :key="index"
      @click="chooseTab(index)"
      class="tab"
      :class="{ ['tab-' + (index + 1)]: true }"
    >{{ tab }}</div>
    <div class="indicator"></div>
  </div>
</template>

<script>
// Note: created for this app but ended up not used. Put somewhere safe

export default {
  name: 'TabBar',

  props: {
    tabs: {
      type: Array,
      default: () => {
        let array = []
        for (let i = 0; i < 5; i++) {
          array.push((i + 1))
        }
        return array
      }
    }
  },

  data() {
    return {
      state: 0,
    }
  },

  computed: {
    cssVars() {
      return {
        '--tab-state': this.state,
        '--tab-amount': this.tabs.length,
      }
    }
  },

  methods: {
    chooseTab(index) {
      this.state = index
    }
  }
}
</script>

<style lang="scss" scoped>
.tab-bar {
  margin: 0 auto;
  position: relative;
  height: 35px;
  display: flex;
  background: rgb(35, 37, 41);

  .indicator {
    pointer-events: none;
    position: absolute;
    top: 0;
    left: calc(100% - ((100% / var(--tab-amount)) * (var(--tab-amount) - var(--tab-state))));
    width: calc(100% / var(--tab-amount));
    height: 100%;
    background: rgb(85, 89, 99);
    transition: left 0.25s ease-in-out;
  }

  .tab {
    z-index: 1;
    position: relative;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    @extend %clickable;
  }
}
</style>
