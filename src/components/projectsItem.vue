<template>
  <div class="projects-item" :class="classing">
		<div class="bg">
			<base-bg :source="imageURL(projectThumbnail)" posY="top"></base-bg>
		</div>

		<div class="info">
			<base-title :size="11" :scaling="0.5">
				{{ this.item['title-' + $app.locale()] || 'item' }}
			</base-title>  
			<base-title :size="6" :scaling="0.5">
				{{ this.item['type-' + $app.locale()] }}, {{ this.item.year }}
			</base-title>
		</div>
  </div>
</template>

<script>
import { isTouchDevice } from '@/utils/system'

export default {
  name: 'ProjectsItem',

  props: {
    item: {
			type: Object,
			required: true
		}
	},

  methods: {
    imageURL(URL) {
      const imageURL = this.$store.getters['app/GET_URL'].imageURL
			return `${imageURL}projects/${this.$vnode.key}/${URL}`
    }
	},
	
	computed: {
		projectThumbnail() {
			return this.item.images.slice(-1)
		},

		classing() {
			return {
				'is-touch-device': isTouchDevice() ? true : false
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.projects-item {
	overflow: hidden;
	position: relative;
  @extend %clickable;
	transition: box-shadow 0.1s ease-in-out;
	box-shadow:
		0 0 5px rgba(0, 0, 0, 0.05),
		0 0 16px rgba(0, 0, 0, 0.04);
	&:hover {
		box-shadow:
			0 3px 5px rgba(0, 0, 0, 0.1),
			0 6px 18px rgba(0, 0, 0, 0.3);
		.bg { opacity: 0.95; }
		.info { transform: translateY(0); }
	}

  .info {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		padding: 1.4rem;
		background: rgba(0, 0, 0, 0.5);
		transition: transform 0.2s ease-in-out;
		transform: translateY(100%);
		&::v-deep * { color: white; }
	}
	
  .bg {
    position: relative;
    height: 0;
		padding-bottom: 100%;
		transition: opacity 0.2s ease-in-out;
	}
	
	&.is-touch-device {
		.info { transform: translateY(0); }
	}
}
</style>
