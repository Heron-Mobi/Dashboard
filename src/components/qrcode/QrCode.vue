<!-- 
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0 
-->
<template>
  <div class="container">
    <base-card>
      <template v-slot:title>
        <i class="bi bi-phone me-2"></i>App Configuration
      </template>
      <template v-slot:body>
	        <qrcode-vue :value="value" :size="size" level="H" />
      </template>
    </base-card>
  </div>
</template>

<script>

import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import { reactive, computed, onMounted } from "vue";
  import QrcodeVue from 'qrcode.vue'

  export default {
    data() {
      var host = window.location.host; 
      return {
        value: 'heron://' + host + '/config.json',
        size: 300,
      }
    },
    components: {
      QrcodeVue,
    },

};
</script>

<style></style>
