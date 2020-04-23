<template>
  <form class="base-form" @submit.prevent>
    <slot></slot>
  </form>
</template>

<script>
export default { name: 'baseForm' }
</script>
