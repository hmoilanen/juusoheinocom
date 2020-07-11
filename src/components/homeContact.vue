<template>
  <app-content-wrapper max-width="paragraph">
    <editable-content
      v-if="!$app.isLoading()"
      path="home.contact"
      #default="{ content }"
    >
      <base-flex class="home-contact" :column="true" center="x" p-y="l">
        <base-title
          size="xl"
          :center="true"
          m-b="m"
        >{{ content[`title-${$app.locale()}`] }}</base-title>
        <base-button
          @click="toContact"
          size="xl"  
          :highlight="true"
        >{{ content[`link-${$app.locale()}`] }}</base-button>
      </base-flex>
    </editable-content>
  </app-content-wrapper>
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
.home-contact {}
</style>
