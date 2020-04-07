<template>
  <div class="editable-content">
    <base-icon v-if="$api.isAdmin()" @click="editContent" tooltip="editoi">edit</base-icon>
    <slot :content="editable"></slot>
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

  data() {
    return {
      editable: { // Note: has to be object for data to be reactive
        content: ''
      }
    }
  },

  /* provide () { // provide reactive data for child component
    return {
      editableContentData: this.editable
    }
  }, */

  watch: {
    editableContent: {
      immediate: true,
      handler: function() {
        this.editable = this.editableContent
      }
    }
  },

  computed: {
    /* isImage() {
      let innerComponent = this.$slots.default[0].componentOptions.tag
      console.log('innerComponent', innerComponent);
      
      if (this.path.endsWith('image')) return true
      
      // TODO tää ei toimi content handlerissa
      if (innerComponent === 'base-image' || innerComponent === 'base-bg'  ) return true
      else return false
    }, */
    
    editableContent() {
      const split = this.path.split('@')
      let doc = split[0]
      let address = doc + '.' + split[1]
      console.log('split', split);
      console.log('doc', doc);
      console.log('address', address);
      const imageSource = this.$store.state.app.imageURL + address.replace('images.', '').replace(/\./g, '/') + '/'
      console.log('imageSource', imageSource);
      
      let path = address.split('.')
      console.log('path', path);
      console.log('this.path', this.path);
      if (!this.$store.state.content.database) {
        return ''
      }
     
      let content = this.$store.state.content.database

      while (path.length > 0) {
        if (!(path[0] in content)) {
          const addField = path[0]
          //const value = path.length === 1 ? this.isImage ? 'Add image' : 'Add text' : {}
          const value = 'Add text'
          this.$store.dispatch('SET_STATE_OBJECT', { data: addField, object: content, value: value })
        }
        content = content[path.shift()]
      }
      /* return this.isImage
        ? imageSource + content
        : content */
      return content
    }
  },

  methods: {
    editContent() {
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