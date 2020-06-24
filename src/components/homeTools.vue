<template>
  <div class="home-tools">
    <template v-if="tools">
      <editable-content path="home.tools.main" #default="{ content }">
        <base-title :size="titleSize">{{ content[`title-${$app.locale()}`] }}</base-title>
        <base-text :size="textSize">{{ content[`text-${$app.locale()}`] }}</base-text>
        <base-text>* = {{ content[`nb-${$app.locale()}`] }}</base-text>
      </editable-content>
      <base-wrapper maxWidth="medium">
        <div class="grid">
          <div
            class="tool"
            v-for="(tool, key) in tools"
            :key="key"
          >
            <base-icon size="xl">{{ key }}</base-icon>
            <base-title :size="4" :truncate="true">
              {{ tool.title }}
              <span v-if="!tool.advanced">*</span>
            </base-title>
          </div>
        </div>
      </base-wrapper>
    </template>
  </div>
</template>

<script>
import editableContent from '@/components/editableContent'

export default {
  name: 'homeTools',

  components: { editableContent },

  props: {
    titleSize: [String, Number],
    textSize: [String, Number]
  },

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
    //overflow: hidden;
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
