<template>
  <div class="home-contact">
    <app-content-wrapper>
      <editable-content
        v-if="!$app.isLoading()"
        path="home.contact"
        #default="{ content }"
      >
        <base-title
          size="xl"
          :center="true"
          :m-b="20"
        >{{ content[`title-${$app.locale()}`] }}</base-title>
        <base-button
          @click="toContact"
          size="xl"  
          :center="true"
          :highlight="true"
        >{{ content[`link-${$app.locale()}`] }}</base-button>
      </editable-content>
    </app-content-wrapper>
  </div>
</template>

<script>
import appContentWrapper from '@/components/appContentWrapper'
import editableContent from '@/components/editableContent'

export default {
  name: 'homeContact',

  components: {
    appContentWrapper,
    editableContent
  },

  methods: {
    toContact() {
      this.$router.push('/contact')
    }
  }
}
</script>

<style lang="scss" scoped>
.home-contact {
  @extend %home-sections--default-style;
}
</style>
