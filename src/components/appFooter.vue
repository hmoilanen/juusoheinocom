<template>
  <div class="app-footer" ref="footer">
    <base-flex class="routes" :column="true">
      <base-title :size="8">Go to</base-title>
      <base-link
        v-for="(link, index) in links.routes"
        :key="index"
        :to="link.path"
        mode="router"
      >{{ link.title }}</base-link>
    </base-flex>




    <base-flex class="links" :column="true">
      <base-title :size="8">See also</base-title>
      <base-link
        v-for="(link, index) in links.externals"
        :key="index"
        :to="link.link"
        mode="tab"
      >
        <base-icon :size="12">{{ link.icon }}</base-icon>
        <base-text>{{ link.title }}</base-text>
      </base-link>
    </base-flex>



    <div class="legal">
      <!-- <span>{{ this.official.watermark }}. Made with <span class="heart"> &#10085;</span></span> -->
      <base-icon app="juusoheino" size="xl">juusoheino</base-icon>
      <span>{{ this.official.watermark }}. Made with </span>
      <base-icon class="love" :size="6">love</base-icon>
      <!-- <span>{{ this.official.disclaimer }}</span> -->
    </div>



    <base-flex center="y" mT="m" mB="s">
      <base-text
        @click="copyEmail('jhcom-email')"
        :clickable="true"
        :size="7"
        :weight="700"
      >{{ this.email }}</base-text>
      <input id="jhcom-email" type="hidden" :value="email">
      <!-- <base-text v-if="showCopied" mL="l" :mT="1.5">Copied!</base-text> -->
    </base-flex>



    <!-- TEE TÄMÄ JOTENKIN HIENOMMIN!!! -->
    <base-flex
      class="scroller"
      @click="returnToTop"
      center="y"
      mT="m"
    >
      <span>Back to top</span>
      <base-icon icon="up" :size="6" mL="s"></base-icon>
    </base-flex>



    <base-icon
      @click="logging"
      :icon="$api.isLogged() ? 'unlocked' : 'locked'"
      :clickable="true"
    ></base-icon>
  </div>
</template>

<script>
import { navLinks } from '@/utils/navigation'
import { copyToClipboard, scrollToTop } from '@/utils/exec'

export default {
  name: 'appFooter',

  data() {
    return {
      email: 'email is pending...',
      emailCopied: false
    }
  },

  mounted() {
    this.calcFooterHeight()

    window.addEventListener('resize', this.calcFooterHeight)
    this.$on('hook:beforeDestoy', () => {
      window.removeEventListener('resize', this.calcFooterHeight)
    })
  },

  watch: {
    '$store.state.app.isLoading': { // This is for bluffing crawlers
      immediate: true,
      handler(newValue) {
        if (!newValue) {
          setTimeout(() => {
            this.email = this.official.email
          }, 3000);
        }
      }
    }
  },

  computed: {
    links() {
      return {
        routes: navLinks(),
        externals: this.$store.state.app.externals
      }
    },

    official() {
      return this.$store.getters['app/GET_OFFICIAL']
    }
  },

  methods: {
    calcFooterHeight() {
      // Store footer's height for ui adjustments
      let footerHeight = this.$refs.footer.offsetHeight
      if (footerHeight) {
        this.$store.dispatch('SET_STATE', { data: footerHeight, path: 'ui.footerHeight' })
      }
    },

    logging() {
      let isLogged = this.$api.isLogged()
      if (isLogged) {
        this.$store.dispatch('modals/SET_MODAL', { active: 'logout' })
      } else {
        this.$store.dispatch('modals/SET_MODAL', { active: 'login' })
      }
    },

    copyEmail(id) {
      if (!this.emailCopied && this.email !== 'email is pending...') {
        copyToClipboard(id)

        this.emailCopied = true
        this.email += ' - copied!'

        setTimeout(() => {
          this.emailCopied = false
          this.email = this.official.email
        }, 3000)
      }
    },

    returnToTop() {
      scrollToTop()
    }
  }
}
</script>

<style lang="scss" scoped>
$footer-bg-color: $app-color--main;
$footer-color: $app-color--theme;

.app-footer {
  //grid-area: footer; // TODO!: OTA KÄYTTÖÖN!?
  //position: relative;
  display: flex;
  flex-direction: column;
  align-items:  center;
  //background-color: $footer-bg-color;
  //color: $footer-color;
  border-top: 1px solid rgb(240, 240, 240);

  .routes {
    & > * { display: block; }
  }
  .links {
    //& > *:not(:last-child) { margin-right: 1rem; }
    a {
      display: flex;
      align-items: center;
      .base-icon { margin-right: 0.4rem; }
    }
  }
  .legal {
    .base-icon.love {
      transition: transform 0.3s ease;
      animation: pulse 1.6s infinite;

    }
    @keyframes pulse {
      0%, 34% { transform: scale(1); }
      35% { transform: scale(1.01); }
      50% { transform: scale(1.25); }
      65% { transform: scale(1.01); }
      66%, 100% { transform: scale(1); }
    }
  }
}
</style>
