<template>
  <div class="app-footer" ref="footer" :style="styling">
    <app-content-wrapper>
<base-spacer class="about" size="xl">
			<div class="footer-links">
				<footer-link
					v-for="(link, index) in links"
					:key="index"
					:to="link.path"
					:active="isActiveRoute(link.name)"
				>
					{{ link.title.toUpperCase() }}
				</footer-link>
			</div>

				<base-flex center="x">
					<app-external-links></app-external-links>
				</base-flex>

				<base-flex center="x">
					<locale-toggler></locale-toggler>
				</base-flex>

				<base-flex center="x">
					<base-text
						@click="copyEmail('jhcom-email')"
						:clickable="true"
						:size="7"
						:weight="700"
					>{{ this.email }}</base-text>
					<input id="jhcom-email" type="hidden" :value="email">
				</base-flex>
				
				<base-flex center="x">
					<base-flex center="y">
						<base-icon
							class="CY--login--juusoheino"
							@click="openLogin"
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
				</base-flex>
			</base-spacer>
      
      <base-flex
        class="backtotop"
        @click="backToTop"
        center="x"
        m-t="xl"
      >
        <base-icon
					:size="10"
					:clickable="true"
					:only-stroke="true"
				>backtotop</base-icon>
      </base-flex>

    </app-content-wrapper>
  </div>
</template>

<script>
import { navLinks } from '@/utils/navigation'
import { copyToClipboard, scrollToTop } from '@/utils/exec'
import AppContentWrapper from '@/components/AppContentWrapper'
import AppExternalLinks from '@/components/AppExternalLinks'
import LocaleToggler from '@/components/LocaleToggler'
import FooterLink from '@/components/FooterLink'
import AppText from '@/components/AppText'

export default {
  name: 'AppFooter',

  components: {
    AppContentWrapper,
    AppExternalLinks,
    LocaleToggler,
    FooterLink,
    AppText
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
    '$store.state.app.isLoading': { // For bluffing crawlers
      immediate: true,
      handler(newValue) {
        if (!newValue) {
          setTimeout(() => {
            this.email = this.official.email
          }, 3000)
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
			const defaultPadding = 4
			
      return {
        paddingTop: `${defaultPadding}vmax`,
        paddingBottom: `${defaultPadding * 0.8}vmax`
      }
    }
  },

  methods: {
    isActiveRoute(linkName) {
      return linkName === this.$route.name
    },

    calcFooterHeight() {
      // Store footer's height for ui adjustments
			const footerHeight = this.$refs.footer.offsetHeight
			
      if (footerHeight) {
        this.$store.dispatch('SET_STATE', { data: footerHeight, path: 'ui.footerHeight' })
      }
    },

    openLogin() {
      if (this.$app.isLogged()) {
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
	
	.footer-links {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		padding-bottom: 0rem;
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

  .backtotop {
    &::v-deep {
      .base-icon {
        &:hover .backtotop-move { // See: iconBacktotop.vue
					transform: translateY(-15%);
				}
        .backtotop-move {
					transition: all 0.5s ease;
					transform: translateY(10%);
				}
      }
    }
  }
}
</style>
