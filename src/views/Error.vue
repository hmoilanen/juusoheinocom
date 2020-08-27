<template>
	<base-view class="view-error">
    <base-wrapper :center="true">
			<base-title
				class="error-face"
				:size="12"
				:scaling="2"
				:uppercase="false"
				:m-b="4"
			>[ O _ o ] / ?</base-title>
      <base-title
				tag="h1"
				:size="22"
				:scaling="4"
				:center="true"
				:m-b="30"
			>404 - Page not found</base-title>
      <!-- <base-title tag="h1">Ooops! Something went wrong</base-title> -->

			<base-link to="/" class="redirect">
				<base-flex center="y" :m-b="18">
					<base-title :size="7">to front page</base-title>
					<base-icon class="redirect-icon" :only-stroke="true">redirect</base-icon>
				</base-flex>
			</base-link>
    </base-wrapper>
	</base-view>
</template>

<script>
export default {
	name: 'ViewError'
}
</script>

<style lang="scss" scoped>
.view-error {
	&::v-deep {
		&.base-view .content {
			display: flex;
			align-items: center;
			padding: 15vmin 6vmin 10vmin;
		}
	}

	.error-face { color: $app-color--hl; }

	.redirect-icon {
		margin-left: 0.5rem;
    margin-top: -0.1rem;
    @extend %clickable;
		transition: transform 0.4s ease;
		transform: translateX(0);
  }
	.redirect:hover .redirect-icon { transform: translateX(5px); }
}
</style>