<template>
  <div class="view-home">

    <content-gallery v-model="kritemit" m="xl"></content-gallery>
    
    <base-content-wrapper :compensateNavTop="true">
      <base-div :card="true" p="m" mB="l">
        <base-text :lorem="true"></base-text>
      </base-div>

      <indexIndicator :list="lista" @newIndex="newIndex"></indexIndicator>

      <base-input
        label="laabeli"
        placeholder="type here"
        feedback="palauteonfkjsbad asfdua palauteonfkjsbad asfdua palauteonfkjsbad asfdua palauteonfkjsbad asfdua palauteonfkjsbad asfdua"
        m-b="xl"
      ></base-input>
      <base-input
        label="laabeli"
        :feedback="true"
        mB="l"
      ></base-input>

      <editable-content path="example.image">
        <base-image src="https://image.shutterstock.com/image-photo/beautiful-water-drop-on-dandelion-260nw-789676552.jpg" alt="sd"></base-image>
      </editable-content>

      <!-- <base-image src="https://www.bigstockphoto.com/images/homepage/module-6.jpg"></base-image> -->
      <!-- <base-image src="https://image.shutterstock.com/image-photo/beautiful-water-drop-on-dandelion-260nw-789676552.jpg" alt="kura"></base-image> -->
      <!-- <base-image></base-image> -->

      <br><br>

      <!-- <google-map mapStyle="light"></google-map> -->

      <br><br>

      <dropzone size="100%"></dropzone>

      <editable-content path="example.title">
        <base-text></base-text>
      </editable-content>

      <br>

      <editable-content path="example.title">
        <base-title></base-title>
      </editable-content>

      <br>

      <editable-content path="example.title">
        <base-link></base-link>
      </editable-content>

      <base-divider mY="xl"></base-divider>

      <base-button mB="xl">base-button</base-button>
      <base-button :empty="true" mB="xl">base-button: empty</base-button>
      <base-button :disabled="true" mB="xl">base-button: disabled</base-button>
      <base-button :rounded="true" mB="xl">base-button: rounded</base-button>
      <base-button :highlight="true" mB="xl">base-button: highlight</base-button>
      <base-button :highlight="true" :empty="true" mB="xl">base-button: highlight</base-button>
      <base-button icon="twitch" mB="xl">base-button: icon</base-button>
      <base-button :center="true" mB="xl">base-button: center</base-button>
      <base-button :stretch="true" mB="xl">base-button: stretch</base-button>

      <base-divider mY="xl"></base-divider>
    
      <base-textarea
        label="base-textarea"
        :required="true"
        placeholder="type here..."
        :rows="3"
        mB="xl"
      ></base-textarea>

      <base-dropdown label="base-dropdown" :required="true" mB="xl"></base-dropdown>

      <base-select v-model="selekted" label="base-select" :required="true" mB="xl"></base-select>

      <base-input
        v-model="baseInput1"
        label="base-input"
        :required="true"
        :disabled="false"
        placeholder="placeholder"
        mB="xl"
      ></base-input>

      <base-input
        v-model="baseInput2"
        label="base-input"
        :required="true"
        :disabled="false"
        placeholder="placeholder"
        iconLeft="search"
        iconRight="close"
        mB="xl"
      ></base-input>

      <base-divider mY="xl"></base-divider>

      <base-flex center="x" :wrap="false" mB="xl">
        <base-loader :mR="20"></base-loader>
        <base-loader mode="spinner"></base-loader>
      </base-flex>

      <base-divider mY="xl"></base-divider>

      <base-title size="l" mB="s">BASE TITLE</base-title>
      <base-title size="s" mB="s">base-title</base-title>
      <base-title size="m" mB="s">base-title</base-title>
      <base-title size="l" mB="s">base-title</base-title>
      <base-title size="xl" mB="s">base-title</base-title>

      <base-divider mY="xl"></base-divider>

      <base-text size="s">base-text base-text base-text base-text</base-text>
      <base-text size="m">base-text base-text base-text base-text</base-text>
      <base-text size="l">base-text base-text base-text base-text</base-text>
      <base-text size="xl">base-text base-text base-text base-text</base-text>
      <base-text size="xl" :handle="true">base-text base-text base-text base-text</base-text>

      <base-divider mY="xl"></base-divider>

      <base-flex :column="true">
        <base-link mode="" to="https://google.com/" mB="m">base-link</base-link>
        <base-link mode="tab" to="https://google.com/" mB="m">base-link--tab</base-link>
        <base-link mode="router" to="/pageA">base-link--router</base-link>
      </base-flex>

      <base-divider mY="xl"></base-divider>

      <base-icon size="s" mR="s">cog</base-icon>
      <base-icon size="m" mR="s">cog</base-icon>
      <base-icon size="l" mR="s">cog</base-icon>
      <base-icon size="xl" mR="xl">cog</base-icon>
      <base-icon size="xl" app="twitch" mR="s">twitch</base-icon>
      <base-icon size="xl" app="mixer" mR="s">mixer</base-icon>
      <base-icon size="xl" app="facebook" mR="s">facebook</base-icon>
      <base-icon size="xl" app="twitter" mR="s">twitter</base-icon>
      <base-icon size="xl" app="youtube" mR="s">youtube</base-icon>
      <base-icon size="xl" app="instagram" mR="s">instagram</base-icon>
      <base-icon size="xl" app="discord" mR="s">discord</base-icon>
      <base-icon size="xl" app="reddit" mR="s">reddit</base-icon>
      <base-icon size="xl" app="linkedin" mR="s">linkedin</base-icon>

      <base-divider mY="xl"></base-divider>

      <base-flex :wrap="true">
        <base-tag v-for="tag in 16" :key="tag.index" size="s" :mR="3" :mB="3">base tag</base-tag>
      </base-flex>
      
    </base-content-wrapper>

    <app-footer></app-footer>
  </div>
</template>

<script>
import indexIndicator from '@/components/indexIndicator'
//import googleMap from '@/components/googleMap'
import editableContent from '@/components/editableContent'
import dropzone from '@/components/dropzone'
import appFooter from '@/components/appFooter'
import contentGallery from '@/components/contentGallery'

export default {
  name: 'viewHome',

  components: {
    indexIndicator,
    //googleMap,
    editableContent,
    dropzone,
    appFooter,
    contentGallery
  },

  data() {
    return {
      isOpen: false,
      selekted: '',
      baseInput1: '',
      baseInput2: '',
      lista: ['a', 'b', 'c', 'd', 'e'],
      ikoni: 'close',
      kritemit: []
    }
  },

  created() {
    for (let i = 0; i < 12; i++) {
      this.kritemit.push({
        id: 'id-' + i,
        text: 'item-' + i
      })
    }
  },

  methods: {
    newIndex(index) {
      console.log(index);
    }
  }
}
</script>

<style lang="scss" scoped>
.view-home {}
</style>
