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
      content: null
    }
  },

  watch: {
    isLoading: {
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

          this.content = target
          // palauttaa nyt aina stringin
          // jos olisikin objekti:
          // -palauta koko objekti
          // -tutki myös, pitääkö objekti sisällään: containsImage: true
            // -jos pitää, hae kannasta samasta polusta imagen filename
        }
      }
    }
  },

  computed: {
    isLoading() {
      return this.$store.state.app.isLoading
    },

    editableContent() {
      if (!this.content) {
        return 'loading...'
      } else return this.content
    },

    classing() {
      return {
        'is-editable': this.$api.isLogged()
      }
    }
  },

  methods: {
    openEditModal() {
      this.$store.dispatch('modals/SET_MODAL', {
        active: 'editContent',
        data: { content: this.content, path: this.path }
      })
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