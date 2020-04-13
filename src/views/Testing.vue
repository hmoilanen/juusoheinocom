<template>
  <base-view>

    <!-- <div>teataus: {{ this.apptests }}</div> -->
    <div v-for="(item, key) in apptests">{{ key }}: {{ item }}</div>
    <br>
    <div>{{ apptests[this.properti] }}</div>

    <editable-content path="content.texti.houmi.titteli" #default="{ content }">
      <base-text>{{ content[loc] }}</base-text>
    </editable-content>
    <editable-content path="content.text.home.title" #default="{ content }">
      <base-text>{{ content[loc] }}</base-text>
    </editable-content>
    <editable-content path="content.images.home.title" #default="{ content }">
      <base-image>{{ content[loc] }}</base-image>
    </editable-content>

    <base-wrapper :padding="true">
      <base-button v-for="(napi, index) in 20" :key="index" mB="m">!</base-button>
    </base-wrapper>

  </base-view>
</template>

<script>
import editableContent from '@/components/editableContent'

export default {
  name: 'viewTesting',

  components: { editableContent },

  data() {
    return {
      loc: 'en',
      properti: 'boolean'
    }
  },

  created() {
    //let onko1 = [] instanceof Array
    //let onko2 = {} instanceof Object
    //console.log('onko1', onko1);
    //console.log('onko2', onko2);
    


    //let data = { b: 2 }
    let data = false
    let path = 'app.apptests'
    let property = this.properti

    setTimeout(() => {
      /* this.$store.dispatch('SET_STATE',
        { data: data, path: path, property: property, update: true }
      ) */
      this.$store.dispatch('SET_STATE',
        { data: 'prekele', path: path, property: 'stringy' }
      )
    }, 1000)

    /* setTimeout(() => {
      this.$store.dispatch('UPDATE_STATEE',
        { data: data, path: path, property: property }
      )
    } , 1000)

    setTimeout(() => {
      this.$store.dispatch('UPDATE_STATEE',
        { data: data2, path: path, property: property }
      )
    } , 2000)

    setTimeout(() => {
      this.$store.dispatch('UPDATE_STATEE',
        { data: data3, path: path, property: property }
      )
    } , 2000) */
  },

  computed: {
    apptests() {
      return this.$store.state.app.apptests
    }
  }
}
</script>