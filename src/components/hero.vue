<template>
  <div class="hero">
    <span>this is hero</span>
  </div>
</template>

<script>
export default {
  name: 'hero',

  data() {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.hero {
  // DUMMY-TYYLIT -> VAHTUU / POSTUU!!
  min-height: 50vh;
  background: $app-color--hl;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
