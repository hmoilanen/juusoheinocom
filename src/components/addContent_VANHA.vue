<template>
  <base-button
    class="add-stuff"
    @click="openEditModal"
  >{{ this.buttonText }}</base-button>
</template>

<script>
import { dataType } from '@/utils/data'
import { isImage } from '@/utils/regex'
import { randomString } from '@/utils/strings'

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
          console.log('this.dataToCompare', this.dataToCompare);
          //this.dataType = dataType(target)
          this.dataType = dataType(this.dataToCompare)
        }
      }
    }
  },

  computed: {
    toBeAdded() {
      //let toBeAdded = this.dataType === 'object' ? {} : ''
      let toBeAdded = {}
      console.log('toBeAdded', toBeAdded);
      
      if (this.dataType === 'object') {
        for (let key in this.dataToCompare) {
          let value = isImage.test(this.dataToCompare[key]) ? '.png' : ''
          
          toBeAdded[key] = value
        }
      } else { // If string
        let key = randomString(6)
        toBeAdded['image-' + key] = ''
      }

      return toBeAdded
    },

    buttonText() {
      return this.$store.state.app.locale === 'en'
        ? 'add content'
        : 'lisää sisältö'
    }
  },

  methods: {
    openEditModal() {
      this.$store.dispatch('modals/SET_MODAL', {
        active: 'editContent',
        data: { content: this.toBeAdded, path: this.path }
      })
    }
  }
}
</script>
