<template>
  <div class="app-footer" ref="footer" :style="styling">
    <base-wrapper maxWidth="max" :padding="true">
      
      <base-grid colMin="240px" fillType="fill">
        <base-spacer class="about" size="xl">
          <base-flex class="externals">
            <base-link
              v-for="(link, index) in links.externals"
              :key="index"
              :to="link.link"
              mode="tab"
            >
              <base-icon :size="16" m-r="m">{{ link.icon }}</base-icon>
            </base-link>
          </base-flex>

          <div>
            <base-text
              @click="copyEmail('jhcom-email')"
              :clickable="true"
              :size="7"
              :weight="700"
            >{{ this.email }}</base-text>
            <input id="jhcom-email" type="hidden" :value="email">
          </div>
          
          <base-flex center="y">
            <base-icon
              @click="logging"
              app="juusoheino"
              :size="18"
              :m-l="-4"
              :m-r="4"
            >juusoheino</base-icon>
            <base-flex :column="true" :m-t="1">
              <base-text>{{ this.official.watermark }}</base-text>
              <base-text class="love">
                Made with
                <base-icon :size="5">love</base-icon>
              </base-text>
            </base-flex>
          </base-flex>
        </base-spacer>

        <base-flex class="routes" :column="true">
          <!-- <base-title :size="8">Go to</base-title> -->
          <base-spacer>
            <base-link
              v-for="(link, index) in links.routes"
              :key="index"
              :to="link.path"
              mode="router"
            >
              <base-title
                :class="{ active: isActiveRoute(link.name) }"
                :size="7"
                :weight="900"
              >{{ link.title.toUpperCase() }}</base-title>
            </base-link>
          </base-spacer>
        </base-flex>
      </base-grid>
      
      <base-flex
        class="scroller"
        @click="returnToTop"
        center="x"
        m-t="xl"
      >
        <base-icon icon="up" :size="10" mL="s" :clickable="true"></base-icon>
      </base-flex>

    </base-wrapper>

    <!-- <base-icon
      @click="logging"
      :icon="$api.isLogged() ? 'unlocked' : 'locked'"
      :clickable="true"
    ></base-icon> -->
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
    },

    styling() {
      let defaultPadding = this.$store.state.ui.contentPaddingDefault
      return {
        //padding: `${defaultPadding * 2}px ${defaultPadding}px ${defaultPadding}px ${defaultPadding}px`
        paddingTop: `${defaultPadding * 2}px`
      }
    }
  },

  methods: {
    isActiveRoute(linkName) {
      return linkName === this.$route.name
    },

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

        let copiedText = this.$store.state.content.footer.copied[`text-${this.$app.locale()}`]
        this.email += ` - ${copiedText}!`
        this.emailCopied = true

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
$footer--color-highlight: $app-color--hl;

.app-footer {
  border-top: 1px solid rgb(240, 240, 240);

  .grid {
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 2rem;
  }

  .externals {
    .base-icon:hover {
      color: $footer--color-highlight;
    }
  }

  .routes {
    .base-title {
      &:hover { color: $footer--color-highlight; }
      &.active { color: $footer--color-highlight; }
    }
  }
  
  .love {
    .base-icon {
      transition: transform 0.3s ease;
      animation: pulse 1.6s infinite;
      color: $footer--color-highlight;
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
