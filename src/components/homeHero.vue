<template>
  <div class="home-hero">
    <editable-content :path="editablePath" #default="{ content }">
        <base-title>{{ content.title }}</base-title>
        <base-text>{{ content.text }}</base-text>
    </editable-content>
  </div>
</template>

<script>
import editableContent from '@/components/editableContent'

export default {
  name: 'homeHero',

  components: { editableContent },

  computed: {
    editablePath() {
      let locale = this.$store.state.app.locale
      return 'home.hero.' + locale
    }
  }
}
</script>

<style lang="scss" scoped>
.home-hero {
  // DUMMY-TYYLIT -> VAHTUU / POSTUU!!
  min-height: 50vh;
  background: $app-color--hl;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
