<template>
  <!-- outer wrapper -->
  <div class="base-content-wrapper" :style="styling.outer">
    <!-- inner wrapper -->
    <div class="base-content-wrapper-inner" :style="styling.inner">
      <slot></slot>
    </div>
  </div>
</template>

<script>
//import { mapState, mapGetters } from "vuex";
import { mapState } from 'vuex';

export default {
  props: {
    compensateNavTop: {
      type: Boolean,
      default: false
    },
    resetMaxWidth: {
      type: Boolean,
      default: false
    },
    resetPadding: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    ...mapState('app', ['ui']),
    //...mapGetters('app', ['GET_NAV_LEFT_DIMENSIONS']), // NOTE!: OTA KÄYTTÖÖN KUN TARPEELLISTA!!!

    styling() {
      return {
        outer: {
          paddingTop: this.compensateNavTop ? this.ui.navTopHeight + 'px' : 0,
          //paddingLeft: this.GET_NAV_LEFT_DIMENSIONS // NOTE!: OTA KÄYTTÖÖN KUN TARPEELLISTA!!!
          paddingLeft: 0
        },
        inner: {
          maxWidth: this.resetMaxWidth
            ? false
            : this.ui.contentMaxWidth + 'px',
          padding: this.resetPadding ? 0 : this.ui.contentPadding + 'px'
        }
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.base-content-wrapper {
  width: 100%;
  //@extend %transition--ui-default; // NOTE!: LISÄÄ KUN TARPEELLISTA!!!
}
.base-content-wrapper-inner {
  position: relative;
  margin: 0 auto;
}
</style>
