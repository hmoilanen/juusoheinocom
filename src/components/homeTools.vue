<template>
  <div class="home-tools">
    <template v-if="tools">
      <editable-content path="home.tools.main" #default="{ content }">
        <base-title>{{ content[`title-${$app.locale()}`] }}</base-title>
        <base-text>{{ content[`text-${$app.locale()}`] }}</base-text>
        <base-text>* = {{ content[`nb-${$app.locale()}`] }}</base-text>
      </editable-content>
      <div class="grid">
        <div
          class="tool"
          v-for="(tool, key) in tools"
          :key="key"
        >
          <base-icon size="xl">{{ key }}</base-icon>
          <base-title :size="5" :truncate="true">{{ tool.title }}</base-title>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import editableContent from '@/components/editableContent'

export default {
  name: 'homeTools',

  components: { editableContent },

  computed: {
    tools() {
      if (!this.$app.isLoading()) {
        let reorderedTools = {}
        let { main, order, ...tools} = this.$store.state.content.home.tools

        for (let tool of order) {          
          reorderedTools[tool] = tools[tool]
        }

        return reorderedTools
      } else return null

    }
  }
}
</script>

<style lang="scss" scoped>
.home-tools {
  .grid {
    margin-top: 2rem; //POISTUU!!

    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
    grid-gap: 0.6rem;
  }

  .tool {
    position: relative;
    overflow: hidden;
    width: 70px;
    //eight: 70px;
    //border: 1px solid rgb(230, 230, 230);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .base-icon {
      margin-bottom: 0.5rem;
      //opacity: 0.7;
    }
  }
}
</style>
