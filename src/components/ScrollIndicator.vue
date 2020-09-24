<template>
	<div class="scroll-indicator"></div>
</template>

<script>
export default {
	name: 'ScrollIndicator'
}
</script>

<style lang="scss" scoped>
$scroll-indicator--color-bg: $app-color--secondary;
$scroll-indicator--color-hl: $app-color--hl;
$scroll-indicator--width: 2px;
$scroll-indicator--height: 25px;

.scroll-indicator {
	overflow: hidden;
	position: fixed;
	bottom: 20px;
	left: 50%;
	transform: translateX(-50%);
	width: $scroll-indicator--width;
	height: $scroll-indicator--height;
	background: $scroll-indicator--color-bg;
	&::after {
		content: "";
		position: absolute;
		width: $scroll-indicator--width;
		height: $scroll-indicator--width;
		background: $scroll-indicator--color-hl;
		animation: scroll 1.6s ease-out infinite;
	}

	@keyframes scroll {
		0%, 10% { transform: translateY(-#{$scroll-indicator--width}); }
		80%, 100% { transform: translateY(#{$scroll-indicator--height}); }
	}
}
</style>