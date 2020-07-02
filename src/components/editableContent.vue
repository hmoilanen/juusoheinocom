<template>
  <div
    @click="openEditModal"
    class="editable-content"
    :class="classing"
  >
    <slot :content="editableContent"></slot>
  </div>
</template>

<script>
import { dataType, dynamicDataStructure } from '@/utils/data'

export default {
  name: 'editableContent',

  props: {
    path: {
      // Note: path is given as of firebase's, not store's (eg. collection.document.x ...)
      type: String,
      required: true
    }
  },

  data() {
    return {
      content: null,
      storeReferenceCreated: false
    }
  },

  watch: {
    '$store.state.app.isLoading': {
      // After app initiation / loading content from database,
      // build store's data structure for content, if not yet existent.
      immediate: true,
      handler(newValue) {
        if (!newValue) { // when loading no more
          let path = this.path.split('.')
          let target = this.$store.state.content

          while (path.length > 0) {      
            // Create default data structure to store if it doesn't exist yet.
            if (!(path[0] in target)) {              
              let data = path.length === 1 ? 'no content' : {}
              this.$store.dispatch('SET_STATE', { data: data, path: target, property: path[0] })
            }

            target = target[path.shift()]          
          }

          this.storeReferenceCreated = true
        }
      }
    }
  },

  computed: {
    editableContent() {
      if (this.storeReferenceCreated) {
        let path = this.path.split('.')
        let target = this.$store.state.content

        while (path.length > 0) {      
          target = target[path.shift()]          
        }
  
        return target
      } else return 'is loading...'
    },

    /* isLoading() { //OTIN POIS KÄYTÖSTÄ KUN EI NÄYTTÄNY OLEVAN KIINNI MSSÄÄN -> PISTÄ TAKAISIN JOS TULEE ONGELMAA!
      return this.$store.state.app.isLoading
    }, */

    classing() {
      return {
        'is-editable': this.$app.isLogged()
      }
    }
  },

  methods: {
    openEditModal() {
      if (this.$app.isLogged()) {
        this.$store.dispatch('modals/SET_MODAL', {
          active: 'editContent',
          data: { content: this.editableContent, path: this.path }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.editable-content {
  &.is-editable {
    padding: 0.4rem;
    border: 5px dashed red;
    &:hover {
      //border-color: hotpink;
      border-style: solid;
      @extend %clickable;
    }
  }
}
</style>