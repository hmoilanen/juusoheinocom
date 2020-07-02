<template>
  <div class="editable-content">
    <!-- <base-icon v-if="$app.isLogged()" @click="editContent">edit</base-icon> -->
    <template v-if="$app.isLogged()">
      <!-- <base-input :value="editableContent"></base-input> -->
      <base-input v-model="input"></base-input>
      <base-flex m-t="s">
        <base-button
          @click="edit"
          :disabled="!allowEdit"
          m-r="s"
        >save</base-button>
        <base-button
          v-if="allowEdit"
          @click="undo"
          :pseudo="true"
        >undo</base-button>
      </base-flex>
    </template>
    <slot v-else :content="editoitavaJuttu"></slot>
  </div>
</template>

<script>
export default {
  name: 'editableContent',

  props: {
    path: { // Note!: path is given as firebase's path, not store's
      type: String,
      required: true
    }
  },

  data() {
    return {
      input: '',
      inputSafety: '',
    }
  },

  created() {
    //console.log('this.$store.state.app.isLoading', this.$store.state.app.isLoading);
    //this.editoitavaJuttu = this.path
  },

  /* mounted() {
    let path = this.path.split('.')
    let target = this.$store.state.content
    
    while (path.length > 0) {      
      // create default data structure to store if it doesn't exist yet
      if (!(path[0] in target)) {
        let data = path.length === 1 ? 'no content' : {}
        this.$store.dispatch('SET_STATE', { data: data, path: target, property: path[0] })
      }
      target = target[path.shift()]
      console.log('target', target);
      
    }
  }, */

  /* watch: {
    editableContent: {
      immediate: true,
      handler() {
        this.input = this.editableContent
        this.inputSafety = this.editableContent
      }
    }
  }, */

  computed: {
    isImage() {
      if (this.$children) {
        return this.$children[0].$options.name === 'baseImage'
          ? true
          : false
      } else return false
    },

    editoitavaJuttu: {
      get() {
        let path = this.path.split('.')
        let target = this.$store.state.content

        if (this.$store.state.app.isLoading) {
          return 'loading...'
        } else { // if data has been loaded
          while (path.length > 0) {      
            // create default data structure to store if it doesn't exist yet
            if (!(path[0] in target)) {
              console.log('tää puuttuu: ' + path[0]);
              
              let data = path.length === 1 ? 'no content' : {}
              this.$store.dispatch('SET_STATE', { data: data, path: target, property: path[0] })
            }
            target = target[path.shift()]          
          }
          return target
        }
      },
      set(newValue) {
        //console.log('newValue', newValue);
        this.input = newValue
        this.inputSafety = newValue
      }
    },

    editableContent() {
      const state = this.$store.state
      let path = this.path.split('.')
      const target = path[0]
      let content = state.content
      const noContent = 'no content'
      
      //NÄMÄ KUVIA VARTEN >
      const targetDotsRegex = /\./g
      const imageUrl = state.app.imageURL + this.path.replace('images.', '').replace(targetDotsRegex, '/') + '/'

      if (!state.content[target]) {
        return noContent
      }

      while (path.length > 0) {
        console.log('while');
        
        // create default data structure if it doesn't exist yet
        /* if (!(path[0] in content)) {
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
        } */
        // complement path
        content = content[path.shift()]
      }

      console.log('content', content);
      

      return this.isImage
        ? imageUrl + content
        : content
    },

    allowEdit() {
      return this.input !== this.inputSafety
    },
  },

  methods: {
    edit() {
      this.$store.dispatch('SET_STATE', { data: this.input, path: 'content.' + this.path })
    },

    undo() {
      this.input = this.inputSafety
    },

    editContent() { // TARKISTAMATTA!!! -> OTA KÄYTTÖÖN / FIXAA!!!
      //TÄMÄ VALMISTELEE PATHIN OIKEAAN MUOTOON JA SYÖTTÄÄ KÄSITELTÄVÄN DATAN MODAALIA VARTEN
      //...JOLLOIN MODAALLI AUKEAA
      //-> KÄYTÄ AINOASTAAN KUVIEN KANSSA
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
  /* .base-icon {
    @extend %clickable;
    z-index: 1;
    position: relative;
    color: red;
  } */
}
</style>