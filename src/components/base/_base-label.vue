<template>
  <label class="base-label">
    <slot>{{ $options.name }}</slot>
    <span v-if="required"> *</span>
  </label>
</template>

<script>
export default {
  name: 'baseLabel',

  props: {
    required: Boolean 
  }
}
</script>

<style lang="scss" scoped>
$label-color: $app-color--input-label;
$label-color--required: $app-color--error;
$label-font: $app-font--label;

.base-label {
  display: block;
  margin-bottom: 0.3em;
  font-size: 0.9em; // Based on parent component's font-size
  font-weight: 500;
  font-family: $label-font;
  color: $label-color;

  span {
    font-size: 1.45em;
    color: $label-color--required;
  }
}
</style>
