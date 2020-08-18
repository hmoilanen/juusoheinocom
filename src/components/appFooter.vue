<template>
  <div class="app-footer" ref="footer" :style="styling">
    <!-- <base-wrapper maxWidth="max" :padding="true"> -->
    <app-content-wrapper>
      <base-grid colMin="240px" fillType="fill" :gap="{ x: '4rem', y: '2rem' }">
        <base-spacer class="about" size="xl">
          <app-external-links></app-external-links>

          <div>
            <base-text
              @click="copyEmail('jhcom-email')"
              :clickable="true"
              :size="8"
              :weight="700"
            >{{ this.email }}</base-text>
            <input id="jhcom-email" type="hidden" :value="email">
          </div>

          <locale-toggler></locale-toggler>
          
          <base-flex center="y">
            <base-icon
							class="login--juusoheino"
              @click="logging"
              app="juusoheino"
              :size="18"
              :m-l="-4"
              :m-r="4"
            >juusoheino</base-icon>
            <base-flex :column="true" :m-t="1">
              <app-text>{{ this.official.watermark }}</app-text>
              <app-text class="love">
                Made with
                <base-icon :size="5">love</base-icon>
              </app-text>
            </base-flex>
          </base-flex>
        </base-spacer>

        <base-flex :column="true">
          <!-- <base-title :size="8">Go to</base-title> -->
          <base-spacer size="m">
            <footer-link
              v-for="(link, index) in links"
              :key="index"
              :to="link.path"
              :active="isActiveRoute(link.name)"
            >
              {{ link.title.toUpperCase() }}
            </footer-link>
          </base-spacer>
        </base-flex>
      </base-grid>
      
      <base-flex
        class="backtotop"
        @click="backToTop"
        center="x"
        m-t="xl"
      >
        <base-icon :size="10" :clickable="true">backtotop</base-icon>
      </base-flex>
    </app-content-wrapper>
      

    <!-- </base-wrapper> -->
  </div>
</template>

<script>
import { navLinks } from '@/utils/navigation'
import { copyToClipboard, scrollToTop } from '@/utils/exec'
import appContentWrapper from '@/components/appContentWrapper'
import appExternalLinks from '@/components/appExternalLinks'
import localeToggler from '@/components/localeToggler'
import footerLink from '@/components/footerLink'
import appText from '@/components/appText'

export default {
  name: 'appFooter',

  components: {
    appContentWrapper,
    appExternalLinks,
    localeToggler,
    footerLink,
    appText
  },

  data() {
    return {
      email: 'email is pending...',
      emailCopied: false
    }
  },

  mounted() {
    this.calcFooterHeight()

    window.addEventListener('resize', this.calcFooterHeight)
    this.$once('hook:beforeDestroy', () => {      
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
      return navLinks()
    },

    official() {
      return this.$store.getters['app/GET_OFFICIAL']
    },

    styling() {
      //let defaultPadding = this.$store.state.ui.contentPaddingDefault
      let defaultPadding = 5
      return {
        //padding: `${defaultPadding * 2}px ${defaultPadding}px ${defaultPadding}px ${defaultPadding}px`
        //paddingTop: `${defaultPadding * 2}px`
        paddingTop: `${defaultPadding}vmax`,
        paddingBottom: `${defaultPadding * 1}vmax`
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
      let isLogged = this.$app.isLogged()
      if (isLogged) {
        this.$store.dispatch('modals/SET_MODAL', { active: 'logout' })
      } else {
        this.$store.dispatch('modals/SET_MODAL', { active: 'login' })
      }
    },

    copyEmail(id) {
      if (!this.emailCopied && this.email !== 'email is pending...') {
        copyToClipboard(id)
        let copiedText = this.$store.state.content.components.footer[`copied-${this.$app.locale()}`]
        this.email += ` - ${copiedText}!`
        this.emailCopied = true

        setTimeout(() => {
          this.emailCopied = false
          this.email = this.official.email
        }, 3000)
      }
    },

    backToTop() {
      scrollToTop()
    }
  }
}
</script>

<style lang="scss" scoped>
$footer--color-bg: $app-color--theme;
$footer--color-highlight: $app-color--hl;

.app-footer {
  position: relative;
  border-top: 1px solid rgb(240, 240, 240);
  background: $footer--color-bg;
  
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

  .backtotop {
    &::v-deep {
      .base-icon {
				@extend %icon--only-stroke;
        &:hover .backtotop-move { transform: translateY(-15%); }
        .backtotop-move {
					transition: all 0.5s ease;
					transform: translateY(10%);
				}
      }
    }
  }
}
</style>
