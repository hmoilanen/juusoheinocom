<template>
  <div class="home-hero">
    <editable-content path="home.hero" #default="{ content }">
        <base-title :size="6">{{ content.pretitle }}</base-title>
        <base-title>{{ content[`title-${locale}`] }}</base-title>
        <base-text>{{ content[`text-${locale}`] }}</base-text>
        <base-link to="projects" m-r="s">{{ content[`link1-${locale}`] }}</base-link>
        <base-link to="gallery">{{ content[`link2-${locale}`] }}</base-link>
    </editable-content>
  </div>
</template>

<script>
import editableContent from '@/components/editableContent'

export default {
  name: 'homeHero',

  components: { editableContent },

  computed: {
    locale() {
      return this.$app.locale()
    }
  }
}
</script>

<style lang="scss" scoped>
.home-hero {
  min-height: 100vh;
  padding: 1rem; //TEE TÄSTÄ DYNAAMINEN!!!
  
  // DUMMY-TYYLIT -> VAHTUU / POSTUU!!??
  background: $app-color--hl;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
