<template>
  <div
		class="nav-top-logo"
		:class="{ alternative: alternative }"
		@click="toHome"
	>
    <base-icon size="xl">juusoheino</base-icon>
  </div>
</template>

<script>
export default {
	name: 'navTopLogo',
	
  props: {
    alternative: Boolean
	},
	
  methods: {
		toHome() {
			if (this.$route.name !== 'home') {
				this.$router.push('/')
			}
		}
	}
}
</script>

<style lang="scss" scoped>
$nav-to-logo--color-alternative: $app-color--theme;

.nav-top-logo {
  position: relative;
  display: flex;
	align-items: center;
	@extend %clickable;
  &.alternative {
    .base-icon {
      &::v-deep path { fill: $nav-to-logo--color-alternative; }
    }
  }
}
</style>
