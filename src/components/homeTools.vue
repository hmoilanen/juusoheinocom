<template>
  <div class="home-tools">
    <app-content-wrapper>
      <template v-if="tools">
        <editable-content path="home.tools.main" #default="{ content }">
          <app-title>{{ content[`title-${$app.locale()}`] }}</app-title>
          <app-text :size="8" :m-b="30">{{ content[`text-${$app.locale()}`] }}</app-text>
          <!-- <base-text :size="textSize">{{ content[`text-${$app.locale()}`] }}</base-text> -->
        
          <base-wrapper max-width="460px">
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
            <base-title :size="4" m-t="m">
              <span>*</span> = {{ content[`nb-${$app.locale()}`] }}
            </base-title>
          </base-wrapper>
        </editable-content>
      </template>
    </app-content-wrapper>
  </div>
</template>

<script>
import appContentWrapper from '@/components/appContentWrapper'
import editableContent from '@/components/editableContent'
import appTitle from '@/components/appTitle'
import appText from '@/components/appText'

export default {
  name: 'homeTools',

  components: {
    appContentWrapper,
    editableContent,
    appTitle,
    appText
  },

  props: {
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
$color--tools-asterisk: $app-color--hl;

.home-tools {
  @extend %home-sections--default-style;

  .grid {
    margin-top: 2rem;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
    grid-gap: 0.6rem;
  }
  .tool {
    position: relative;
    width: 70px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .base-icon {
      margin-bottom: 0.5rem;
    }
  }
  .base-title {
    span {
      font-size: 1.3em;
      color: $color--tools-asterisk;
    }
  }
}
</style>
