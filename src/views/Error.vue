<template>
  <div class="view-error">
    <base-wrapper :compensateNavTop="true">
      <base-title tag="h1">404 - Page not found</base-title>
      <!-- <base-title tag="h1">Ooops! Something went wrong</base-title> -->
      
      <base-link to="/" mode="router">
        <base-text>back to front page</base-text>
      </base-link>
    </base-wrapper>

    <app-footer></app-footer>
  </div>
</template>

<script>
// TODO: TEE TARKASTELU JOSSA SELVITETÄÄN MIKÄ ON MENNYT VIKAAN JA UI MUUTTUU SEN MUKAAN

import appFooter from '@/components/appFooter'

export default {
  name: 'viewError',

  components: { appFooter }
}
</script>
