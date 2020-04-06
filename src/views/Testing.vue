<template>
  <base-view>

    <base-wrapper :padding="true">
      <base-button v-for="(napi, index) in 20" :key="index" mB="m">!</base-button>
    </base-wrapper>

  </base-view>
</template>

<script>
export default {
  name: "viewTesting"
}
</script>