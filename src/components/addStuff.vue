<template>
  <div class="add-stuff">
    <base-button @click="openEditModal">add</base-button>
    <div>{{this.toBeAdded}}</div>
  </div>
</template>

<script>
import { dataType } from '@/utils/data'
import { isImage } from '@/utils/regex'

export default {
  name: 'addStuff',

  props: {
    path: String
  },

  data() {
    return {
      dataToCompare: null,
      dataType: ''
    }
  },

  watch: {
    '$store.state.app.isLoading': {
      immediate: true,
      handler(newValue) {
        if (!newValue) { // When loading no more
          let target = this.$store.state.content
          let path = this.path.split('.')
      
          while (path.length > 0) {
            target = target[path.shift()]
          }
      
          this.dataToCompare = target[Object.keys(target)[0]]
          this.dataType = dataType(target)
        }
      }
    }
  },

  computed: {
    toBeAdded() {
      let toBeAdded = this.dataType === 'object' ? {} : ''

      if (this.dataType === 'object') {
        for (let key in this.dataToCompare) {
          let value = isImage.test(this.dataToCompare[key]) ? '.png' : ''
          
          toBeAdded[key] = value
        }
      }

      return toBeAdded
    }
  },

  methods: {
    openEditModal() {
      this.$store.dispatch('modals/SET_MODAL', {
        active: 'editContent',
        data: { content: this.toBeAdded, path: this.path }
      })
      // muodosta datarakenne JOS EI OLE JO JOSSAIN AIEMMIIN MUODOSTETTU!
      // tallenna data storeen
      // tallenna data kantaan
      // tallenna data storageen, mutta vain jos sisältää kuvia!
      // sulje modaali
    }
  }

  // IN-COMPONENT ROUTE GUARDS:
  // See: https://router.vuejs.org/guide/advanced/navigation-guards.html#in-component-guards
  // beforeRouteEnter (to, from, next) {}
  // beforeRouteUpdate (to, from, next) {}
  // beforeRouteLeave (to, from, next) {}
}
</script>

<style lang="scss" scoped>
.add-stuff {
}
</style>
