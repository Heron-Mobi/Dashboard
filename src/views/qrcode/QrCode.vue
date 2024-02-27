<!-- 
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0  
-->
<template>
  <div class="container">
    <the-qrcode></the-qrcode>
  </div>
</template>

<script>
import TheQrcode from '../../components/qrcode/QrCode.vue';
export default {
	components: { TheQrcode },
  name: "QrCode",
};
</script>

<style>
</style>
