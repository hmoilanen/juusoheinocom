<template>
  <base-link
		class="footer-link"
		:class="{ active: active }"
		:to="to"
	>
    <base-title
      :size="6"
			:scaling="0.2"
      :weight="700"
    >
      <slot>{{ $options.name }}</slot>
    </base-title>
  </base-link>
</template>

<script>
export default {
  name: 'FooterLink',

  props: {
    to: [String, Object],
    active: Boolean
	},
	
	computed: {
		styling() {
			const margin = window.innerWidth > 800
				?	'1.8em'
				: '0.8em'

			return {
				margin: `0 ${margin}`
			}
		}
	}
}
</script>

<style lang="scss" scoped>
$footer-link--color: $app-color--main;
$footer-link--color-hl: $app-color--hl;

.footer-link {
  .base-title {
    position: relative;
    display: flex;
		align-items: center;
		margin: 0 0.8em;

		@media only screen and (min-width: 800px) { margin: 0 1.4em; }

    &::before {
      content: "";
      position: absolute;
			top: calc(100% + 0.2rem);
			left: 50%;
			transform: translateX(-50%);
      width: 0;
      height: 3px;
      background: $footer-link--color;
      transition: all 0.3s ease;
    }
    &:hover {
      &::before { width: 100%; }
		}
	}

	&.active {
		@extend %disabled;
		& > * { color: $footer-link--color-hl; }
	}
}
</style>
