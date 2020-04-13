<template>
  <div class="editable-content">
    <base-icon v-if="$api.isAdmin()" @click="editContent" tooltip="editoi">edit</base-icon>
    <slot :content="editableContent"></slot>
  </div>
</template>

<script>
export default {
  name: 'editableContent',

  props: {
    path: {
      type: String,
      required: true
    }
  },

  /* data() {
    return {
      editable: null
    }
  }, */

  /* watch: {
    editableContent: {
      immediate: true,
      handler: function() {
        this.editable = this.editableContent
      }
    }
  }, */

  computed: {
    isImage() {
      const childComponent = this.$children[0].$options.name
      return childComponent === 'baseImage' ? true : false
    },

    editableContent() {
      const state = this.$store.state
      const collection = this.path.split('.')[0]
      const targetDotsRegex = /\./g
      const imageUrl = state.app.imageURL + this.path.replace('images.', '').replace(targetDotsRegex, '/') + '/'
      let path = this.path.split('.')
      //let content = state.content
      const noContent = 'no content'

      if (!state.content[collection]) {
        return noContent
      }

      while (path.length > 0) {
        // create default data structure if it doesn't exist yet
        if (!(path[0] in content)) {
          console.log('TÄNNE MENEE MUTTA VUEXI LÄKKÄÄ -> PÄIVITÄ SET_STATE GENEERISEMMÄKSI!!!');
          
          //const propertyToAdd = path[0]
          let dataToStore = path.length === 1 ? noContent : {}

          //let pathToStore = 'content.'
          //pathToStore += path[0] + '.'
          //console.log(pathToStore);

          //this.$store.dispatch('SET_STATE', { data: dataToStore, path: pathToStore }

          // JATKA TÄMÄN PARISSA HUOMENNA!!!
          // JATKA TÄMÄN PARISSA HUOMENNA!!!
          // JATKA TÄMÄN PARISSA HUOMENNA!!!
          //this.$store.dispatch('SET_STATE_OBJECT', { data: propertyToAdd, object: content, valueToAdd: value })
        }
        // complement path
        content = content[path.shift()]
      }

      return this.isImage
        ? imageUrl + content
        : content
    }
  },

  methods: {
    editContent() { // TARKISTAMATTA!!! -> FIXAA!!!
      const split = this.path.split('@')
      let doc = split[0]
      let path = split[1]
      let data = {
         path: {
           collection: 'content',
           document: doc,
           property: path
         }
      }

      if (this.isImage) { data.image = this.editableContent }
      else { data.text = this.editableContent }

      this.$store.dispatch('modals/SET_MODAL', { active: 'editContent', data: data })
    }
  }
}
</script>

<style lang="scss" scoped>
.editable-content {
  .base-icon {
    @extend %clickable;
    z-index: 1;
    position: relative;
    color: red;
  }
}
</style>