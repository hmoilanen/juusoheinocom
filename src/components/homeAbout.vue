<template>
  <div class="home-about">
    <app-content-wrapper max-width="paragraph">
      <editable-content
        v-if="!$app.isLoading()"
        path="home.about"
        #default="{ content }"
      >
        <app-title>{{ content[`title-${locale}`] }}</app-title>
        <app-text :size="8">{{ content[`text-${locale}`] }}</app-text>
        <div class="quote">
          <base-icon :size="90">quote</base-icon>
          <base-title :center="true" :size="10">"{{ content[`quote-${locale}`] }}"</base-title>
        </div>
        <!-- <base-link to="gallery">{{ content[`link-${locale}`] }}</base-link> -->
      </editable-content>
    </app-content-wrapper>
  </div>
</template>

<script>
import appContentWrapper from '@/components/appContentWrapper'
import editableContent from '@/components/editableContent'
import appTitle from '@/components/appTitle'
import appText from '@/components/appText'

export default {
  name: 'homeAbout',

  components: {
    appContentWrapper,
    editableContent,
    appTitle,
    appText
  },

  /* props: {
    textSize: [String, Number]
  }, */

  computed: {
    locale() {
      return this.$app.locale()
    }
  }
}
</script>

<style lang="scss" scoped>
$color--icon-quote: $app-color--hl2;

.home-about {
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .quote {
    margin: 0 auto;
    margin-top: 4rem;
    max-width: 900px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    .base-icon {
      z-index: -1;
      position: absolute;
      top: 60%;
      left: 25%;
      //transform: translateY(-50%);
      transform: translate(-50%, -50%);
      color: $color--icon-quote;
    }
  }
}
</style>
