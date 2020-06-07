<template>
  <div class="home-tools">
    <base-title>Tools</base-title>
    <template v-if="tools">
      <div
        v-for="(tool, key) in tools"
        :key="key"
        class="tool"
      >
        <base-flex center="y">
          <base-icon size="xl" m-r="s">{{ key }}</base-icon>
          <base-title size="l">{{ tool.title }}</base-title>
          <base-text v-if="!tool.advanced" size="s">basics</base-text>
        </base-flex>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'homeTools',

  computed: {
    tools() {
      let reorderedTools = {}

      if (!this.$store.state.app.isLoading) {
        let tools = this.$store.state.content.home.tools

        for (let tool of tools.order) {
          reorderedTools[tool] = tools[tool]
        }
      }

      return reorderedTools
    }
  }
}
</script>

<style lang="scss" scoped>
.home-tools {
  .tool {

  }
}
</style>
