<template>
  <form class="base-form" @submit.prevent>
    <slot></slot>
  </form>
</template>

<script>

// TARVIIKO TÄTÄ OLLENKAAN?
export default { name: 'baseForm' }
</script>
