<template>
  <div
		class="content-carousel-item"
		:class="classing"
		v-on="listeners"
	>
		<base-bg :source="image" fit="contain"></base-bg>
	</div>
</template>

<script>
export default {
  name: 'ContentCarouselItem',

  props: {
		image: {
			type: String,
			required: true
		},
		clickable: Boolean
	},

	computed: {
		listeners() {
			return { ...this.$listeners }
		},

		classing() {
			return {
				clickable: this.clickable
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.content-carousel-item {
	position: relative; // For <base-bg>
	height: 0;
	padding-bottom: 56.25%;
	&.clickable {
		@extend %clickable;
		&:hover { opacity: 0.8; }
	}
}
</style>
