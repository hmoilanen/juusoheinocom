<template>
  <div class="home-about">
    <editable-content
      v-if="!$app.isLoading()"
      path="home.about"
      #default="{ content }"
    >
      <base-title>{{ content[`title-${locale}`] }}</base-title>
      <base-text m-b="s">{{ content[`text-${locale}`] }}</base-text>
      <base-title :size="6" m-b="s">"{{ content[`quote-${locale}`] }}"</base-title>
      <base-link to="gallery">{{ content[`link-${locale}`] }}</base-link>
    </editable-content>
  </div>
</template>

<script>
import editableContent from '@/components/editableContent'

export default {
  name: 'homeAbout',

  components: { editableContent },

  computed: {
    locale() {
      return this.$app.locale()
    }
  }
}
</script>

<style lang="scss" scoped>
.home-about {
  min-height: 70vh;
}
</style>
