<template>
  <base-view>

    <editable-content path="text.home.title" #default="{ content }">
      <base-text>{{ content[loc] }}</base-text>
    </editable-content>
    <editable-content path="images.home.title" #default="{ content }">
      <base-image>{{ content[loc] }}</base-image>
    </editable-content>

    <base-wrapper :padding="true">
      <base-button v-for="(napi, index) in 20" :key="index" mB="m">!</base-button>
    </base-wrapper>

  </base-view>
</template>

<script>
import editableContent from '@/components/editableContent'

export default {
  name: 'viewTesting',

  components: { editableContent },

  data() {
    return {
      loc: 'en'
    }
  }
}
</script>