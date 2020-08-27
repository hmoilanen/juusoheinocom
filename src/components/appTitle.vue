<template>
  <div
		class="app-title"
		:class="classing"
		:style="mixinMargins"
	>
    <div class="line"></div>
    <base-title :size="size" :scaling="1">
      <slot>{{ $options.name }}</slot>
    </base-title>
    <slot name="icon"></slot>
  </div>
</template>

<script>
import { margins } from '@/utils/mixins'

export default {
  name: 'AppTitle',

	mixins: [margins],
	
	props: {
		size: {
      type: [Number, String],
      default: 's'
    },
		inverted: Boolean
	},
	
	computed: {
		classing() {
			return {
				inverted: this.inverted
			}
		}
	}
}
</script>

<style lang="scss" scoped>
$app-title--color: $app-color--main;
$app-title--color-inverted: $app-color--theme;

.app-title {
  margin-bottom: 1em;
  display: flex;
  align-items: center;

  .line {
    margin-right: 0.5rem;
    width: 6vmin;
    min-width: 10px;
    max-width: 18px;
    height: 2px;
    background: $app-title--color;
	}

  .base-title {
		margin-right: 0.85rem;
		color: $app-title--color;
	}

	&.inverted {
		.line { background: $app-title--color-inverted; }
		.base-title { color: $app-title--color-inverted; }
	}
}
</style>
