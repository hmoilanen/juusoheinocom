<template>
  <div class="editable-content">
    <base-icon v-if="ifAdmin" @click="editContent">edit</base-icon>
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

  provide () {
    return {
      editableContentData: this.editable
    }
  },

  data() {
    return {
      editable: { // Note: has to be object for data to be reactive
        content: ''
      }
    }
  },

  watch: {
    editableContent: {
      immediate: true,
      handler: function() {
        this.editable.content = this.editableContent
      }
    }
  },

  computed: {
    locale() {
      let hostSuffix

      if (process.env.NODE_ENV === 'production') {
        let host = window.location.host.split('.')
        hostSuffix = host[host.length - 1]
      } else {
        hostSuffix = 'en'
      }

      return hostSuffix
    },

    editableContent() {
      let path = this.path.split('.')
      let content = this.$store.state.content[this.locale]

      while (path.length > 0) {
        content = content[path.shift()]
      }      

      return content
    },

    ifAdmin() {
      return this.$store.state.auth.isAdmin
    }
  },

  methods: {
    editContent() {
      let data = { text: this.editableContent, path: `content.${this.locale}.${this.path}` }
      let modal = { active: 'editContent', data: data }

      this.$store.dispatch('modals/SET_MODAL', modal)
    }
  }
}
</script>

<style lang="scss" scoped>
.editable-content {
  .base-icon {
    @extend %clickable;
    color: $app-color--hl;
  }
}
</style>
