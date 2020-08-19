<template>
  <div
		class="app-title"
		:class="classing"
		:style="mixinMargins"
	>
    <div class="line"></div>
    <base-title :size="size" :scaling="1">
      <slot>appTitle.vue</slot>
    </base-title>
    <slot name="icon"></slot>
  </div>
</template>

<script>
import { margins } from '@/utils/mixins'

export default {
  name: 'appTitle',

	mixins: [margins],
	
	props: {
		inverted: Boolean
	},

  data() {
    return {
      size: 's'
    }
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
    min-width: 20px;
    max-width: 30px;
    height: 4px;
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
