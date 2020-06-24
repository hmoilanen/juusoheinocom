<template>
  <editable-content
    v-if="!$app.isLoading()"
    path="home.contact"
    #default="{ content }"
  >
    <base-flex class="home-contact" :column="true" center="x" p-y="l">
      <base-title
        size="xl"
        m-b="m"
      >{{ content[`title-${$app.locale()}`] }}</base-title>
      <base-button
        @click="toContact"
        size="xl"  
      >{{ content[`link-${$app.locale()}`] }}</base-button>
    </base-flex>
  </editable-content>
</template>

<script>
import editableContent from '@/components/editableContent'

export default {
  name: 'homeContact',

  components: { editableContent },

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
