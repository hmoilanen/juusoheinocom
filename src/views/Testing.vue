<template>
  <base-view>

    <!-- <base-image :src=""></base-image> -->
    <img :src="kuva" alt="eitoimi">

    <!-- <editable-content path="text.home.title.fi" #default="{ content }">
      <base-title>{{ content }}</base-title>
    </editable-content> -->
    <br>
    <!-- <editable-content path="text.home.stringi.kikkelis.kokkelis.jeejee" #default="{ content }"> -->

    <editable-content path="text.home.testObject" #default="{ content }">
    <!-- <editable-content path="text.home.testObject" #default="{ content }"> -->
      <base-title :center="true">{{ content }}</base-title>
    </editable-content>
    <br>

    <base-scroller style="height: 400px; width: 200px;" scrollbarWidth="2px">
      <base-text :lorem="true"></base-text>
    </base-scroller>
    <br>
    <base-scroller style="height: 400px; width: 200px;" :hideScrollbar="true">
      <base-text :lorem="true"></base-text>
    </base-scroller>

    <base-icon style="color: blue;">juuso-heino</base-icon>
    <content-carousel></content-carousel>

    <base-wrapper maxWidth="paragraph">
      <base-title size="s" mB="s">This is title text</base-title>
      <base-text size="s" :lorem="true"></base-text>
      <base-divider mY="xl"></base-divider>
      <base-title size="m" mB="m">This is title text</base-title>
      <base-text size="m" :lorem="true"></base-text>
      <base-divider mY="xl"></base-divider>
      <base-title size="l" mB="l">This is title text</base-title>
      <base-text size="l" :lorem="true"></base-text>
      <base-divider mY="xl"></base-divider>
      <base-title size="xl" mB="xl">This is title text</base-title>
      <base-text size="xl" :lorem="true"></base-text>
    </base-wrapper>

    <br><br>

    <!-- <div>teataus: {{ this.apptests }}</div> -->
    <div v-for="(item, key) in apptests" :key="key">{{ key }}: {{ item }}</div>
    <br>
    <div>{{ apptests[this.properti] }}</div>

    <!-- <editable-content path="content.texti.houmi.titteli" #default="{ content }">
      <base-text>{{ content[loc] }}</base-text>
    </editable-content>
    <editable-content path="content.text.home.title" #default="{ content }">
      <base-text>{{ content[loc] }}</base-text>
    </editable-content>
    <editable-content path="content.images.home.title" #default="{ content }">
      <base-image>{{ content[loc] }}</base-image>
    </editable-content> -->

    <base-wrapper :padding="true">
      <base-button v-for="(napi, index) in 20" :key="index" mB="m">!</base-button>
    </base-wrapper>

  </base-view>
</template>

<script>
import contentCarousel from '@/components/contentCarousel'
import indexIndicator from '@/components/indexIndicator'
import editableContent from '@/components/editableContent'

export default {
  name: 'viewTesting',

  components: {
    contentCarousel,
    indexIndicator,
    editableContent
  },

  data() {
    return {
      loc: 'en',
      properti: 'boolean',
      taimi: 3000
    }
  },

  async created() {
    let data = false
    let path = 'app.apptests'
    let property = this.properti

    //await this.$api.()

    /* setTimeout(() => {
      this.$store.dispatch('SET_STATE',
        { data: 'prekele', path: path, property: 'stringy' }
      )
    }, 1000) */
  },

  computed: {
    apptests() {
      return this.$store.state.app.apptests
    },

    kuva() {
      let imageURL = this.$store.getters['app/GET_URL'].imageURL
      //console.log('imageURL', imageURL);
      
      return `${imageURL}joni-hoitaa.png`
    }
  },

  methods: {
    newIndex(index) {
      console.log(index);
    },

    aika() {
      this.taimi += 500
    }
  }
}
</script>

<style lang="scss" scoped>
</style>