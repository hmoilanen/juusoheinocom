<template>
  <base-flex class="home-contact" :column="true" center="x" p-y="l">
    <base-title size="xl" m-b="m">Have an idea?</base-title>
    <base-button @click="toContact" size="xl">Let's talk!</base-button>
  </base-flex>
</template>

<script>
export default {
  name: 'homeContact',

  methods: {
    toContact() {
      this.$router.push('/contact')
    }
  }
}
</script>

<style lang="scss" scoped>
.home-contact {}
</style>
