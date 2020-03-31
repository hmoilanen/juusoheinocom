<template>
  <div class="modal-handler" :style="styling">

    <div class="modal">
      <span @click="closeModal" class="close">close</span>

      <!-- <form v-if="activeModal" @submit.prevent> -->
      <template v-if="activeModal">
        <component
          :is="activeModal"
          :modalData="modalData"
          @closeModal="closeModal"
        ></component>
      </template>
      <!-- </form> -->
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'modalHandler',

  components: {
    //claim: () => import('@/components/modals/modalClaim'),
    addContent: () => import('@/components/modals/modalAddContent'),
    editContent: () => import('@/components/modals/modalEditContent'),
    logout: () => import('@/components/modals/modalLogout')
    //manageEntityHandles: () => import('@/components/modals/modalManageEntityHandles'),
    //passwordRecovery: () => import('@/components/modals/modalPasswordRecovery'),
    //purchase: () => import('@/components/modals/modalPurchase'),
    //search: () => import('@/components/modals/modalSearch'),
    //signIn: () => import('@/components/modals/modalSignIn'),
    //sort: () => import('@/components/modals/modalSort'),
    //sources: () => import('@/components/modals/modalSources'),
    //changeAvatar: () => import('@/components/modals/modalChangeAvatar')
  },

  created() {
    const escapeHandler = e => {
      if (e.key === 'Escape') {
        this.closeModal()
      }
    }

    document.addEventListener('keydown', escapeHandler)
    this.$store.dispatch('SET_STATE', { data: true, path: 'app.ui.preventBodyScrolling' })

    this.$on('hook:beforeDestroy', () => {
      document.removeEventListener('keydown', escapeHandler)
      this.$store.dispatch('SET_STATE', { data: false, path: 'app.ui.preventBodyScrolling' })
    })
  },

  computed: {
    ...mapState('modals', ['activeModal']),

    modalData () {
      return this.$store.state.modals.modalData
    },

    styling () {
      return { zIndex: this.$store.state.app.ui.zIndex.modalHandler }
    }
  },

  methods: {
    closeModal() {
      this.$store.dispatch('modals/SET_MODAL')
    }
  }
}
</script>

<style lang="scss" scoped>
$modal-color: $app-color--main;
$modal-color--bg: $app-color--handler-bg;
$modal-color--bg-card: $app-color--theme;
$modal-padding: 2rem;

.modal-handler {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow-y: auto;
  //padding: 3.5rem 1.4rem; // nämä säädetään state.ui:n mukaan myöhemmin!
  padding: 2rem 0;
  //background-color: rgba(0, 0, 0, 0.5);
  background-color: $modal-color--bg;
  
  //.dark & {}

  .modal {
    position: relative;
    margin: 0 auto;
    width: 90vmin;
    max-width: 500px;
    padding: $modal-padding;
    //padding-top: calc(#{$modal-padding} * 1.2);
    //padding: $modal-padding calc(#{$modal-padding} * 0.8);
    border-radius: 3px;
    background-color: $modal-color--bg-card;
    color: $modal-color;
    /* box-shadow:
      0.5px 1px 3px rgba(0, 0, 0, 0.25),
      0 15px 30px 0 rgba(0, 0, 0, 0.11),
      0 5px 15px 0 rgba(0, 0, 0, 0.08); */
  }

  .close {
    position: absolute;
    top: calc(#{$modal-padding} * 0.4);
    right: calc(#{$modal-padding} * 0.45);
    font-size: 0.9rem;
    //transition: all 0.3s ease-in-out;
    //transform: rotate(0deg);
    cursor: pointer;
    &:hover {
      //transform: rotate(180deg);
      opacity: 0.5;
    }
  }
}

</style>
