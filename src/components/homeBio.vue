<template>
  <div class="home-bio">
    <base-title>About me</base-title>
    <base-text m-b="s">Some text about myself and my background...</base-text>
    <base-text :lorem="600" m-b="l"></base-text>
  </div>
</template>

<script>
export default {
  name: 'homeBio'
}
</script>

<style lang="scss" scoped>
.home-bio {
}
</style>
