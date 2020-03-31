<template>
  <div class="view-page-b">
    <base-content-wrapper :compensateNavTop="true">
      Page B
    </base-content-wrapper>

    <app-footer></app-footer>
  </div>
</template>

<script>
import appFooter from "@/components/appFooter";

export default {
  name: "viewPageB",

  components: { appFooter }
};
</script>