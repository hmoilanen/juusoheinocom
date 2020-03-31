
<template>
  <div class="content-gallery" :style="mixinMargins">
    <base-flex>
      <base-title>content gallery</base-title>
      <base-button @click="addContent">add</base-button>
    </base-flex>

    <sortable-list v-model="rearrangedItems" v-slot="{ items }">
      <base-div class="grid" :style="styling">

        <sortable-list-item v-for="kritemi in items" :key="kritemi.id">
          <base-div :card="true">
            <base-image></base-image>
            <base-text>{{ kritemi.text }}</base-text>

            <sortable-list-item-handle>
              <base-icon></base-icon>
            </sortable-list-item-handle>
          </base-div>
        </sortable-list-item>
        
      </base-div>
    </sortable-list>
  </div>
</template>

<script>
import { margins } from '@/utils/mixins'
import sortableList from '@/components/sortableList'
import sortableListItem from '@/components/sortableListItem'
import sortableListItemHandle from '@/components/sortableListItemHandle'

export default {
  name: 'contentGallery',

  mixins: [margins],

  components: {
    sortableList,
    sortableListItem,
    sortableListItemHandle
  },

  props: {
    value: {
      type: Array,
      required: true
    },
    sizeMin: {
      type: String,
      default: '200px' // VAI PITÄISIKÖ TÄÄ TEHDÄ SAMALLA size-PROPILLA KUIN BASE-KOMPONENTIT
    }
  },

  data() {
    return {
      items: []
    }
  },

  computed: {
    rearrangedItems: {
      get: function() {
        return this.value
      },
      set: function(newValue) {
        this.$emit('input', newValue)
      },
    },

    styling() {
      return {
        gridTemplateColumns: `repeat(auto-fill, minmax(${this.sizeMin}, 1fr))`
      }
    }
  },

  methods: {
    addContent() {
      this.$store.dispatch('modals/SET_MODAL', { active: 'addContent' })
    }
  }
}
</script>

<style lang="scss" scoped>
.content-gallery {
  //margin: 0 auto;

  .grid {
    display: grid;
    grid-gap: 10px;

    .draggable-mirror { opacity: 0.9; }
    .draggable--over { opacity: 0.2; }
  }
}
</style>
