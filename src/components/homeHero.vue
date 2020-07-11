<template>
  <div class="home-hero">
    <app-content-wrapper>
      <editable-content path="home.hero" #default="{ content }">
        <base-title :size="8" m-b="s" class="black">{{ content.pretitle }}</base-title>
        <base-title
          :size="17"
          :scaling="true"
          m-b="l"
        >{{ content[`title-${locale}`] }}</base-title>
        <base-flex justify="start">
          <base-wrapper max-width="paragraph" :disable-margins="true">
            <app-text :scaling="0.8" >{{ content[`text-${locale}`] }}</app-text>
          </base-wrapper>
        </base-flex>
        <base-link to="projects" m-r="s">{{ content[`link1-${locale}`] }}</base-link>
        <base-link to="contact">{{ content[`link2-${locale}`] }}</base-link>
      </editable-content>
    </app-content-wrapper>
  </div>
</template>

<script>
import appContentWrapper from '@/components/appContentWrapper'
import editableContent from '@/components/editableContent'
import appText from '@/components/appText'

export default {
  name: 'homeHero',

  components: {
    appContentWrapper,
    editableContent,
    appText
  },

  computed: {
    locale() {
      return this.$app.locale()
    }
  }
}
</script>

<style lang="scss" scoped>
$home-hero--color: $app-color--theme;

.home-hero {
  min-height: 100vh;
  background: $app-color--hl;
  display: flex;
  align-items: center;
  .app-content-wrapper { flex: 1; }
  .base-title,
  .base-text {
    &:not(.black) {
      color: $home-hero--color;
    }
  }
}
</style>
