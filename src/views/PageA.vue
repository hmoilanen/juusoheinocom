<template>
  <div class="view-page-a">
    <base-content-wrapper :compensateNavTop="true">
      Page A
    </base-content-wrapper>

    <app-footer></app-footer>
  </div>
</template>

<script>
import appFooter from "@/components/appFooter";

export default {
  name: "viewPageA",

  components: { appFooter }
};
</script>