<template>
  <div class="view-page-a">
    <base-wrapper :compensateNavTop="true">
      Page A
    </base-wrapper>

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