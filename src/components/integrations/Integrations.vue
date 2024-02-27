<!-- 
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0 
-->
<template>
  <div class="container">
    <base-message :type="messageStyleType" v-if="message">{{
      message
    }}</base-message>
    <base-card>
      <template v-slot:title>
        <i class="bi bi-person-fill me-2"></i>Approve Integrations
      </template>
      <template v-slot:body>
	<button @click="twitterIntegrate" class="btn btn-primary m-3"
          	v-if="!isLoading">
		<i class="bi bi-twitter me-2"></i>
		<span v-if="twitterLink.set">
		  Twitter already integrated. Click to reset.
		</span>
		<span v-else>
		  Integrate Twitter
		</span>
	</button>
        <base-spinner v-if="isLoading">Loading ...</base-spinner>
      </template>
    </base-card>
  </div>
</template>

<script>
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import { reactive, computed, onMounted, ref } from "vue";
import useAlert from "../../hooks/alert";

export default {

  methods: {
    twitterIntegrate() {
	window.location.href = this.twitterLink.link
    }
  },
  setup() {
    // create a reference to Vuex store
    const store = useStore();
    //get access to Vuex router
    const router = useRouter();
    const route = useRoute();
    //sets up hook for message alerting
    const { message, messageStyleType, setMessage } = useAlert();

    async function loadTwitterLink() {
      try {
        await store.dispatch("fetchTwitterLink");
      } catch (err) {
	console.log(err)
        setMessage("Problem loading twitter link for approval.", "alert-danger");
        store.dispatch("setIsLoading", false);
      }
    }
    const twitterLink = computed(function() {
      return store.getters.getTwitterLink;
    });
    onMounted(function() {
      if (route.params.message) {
        message.value = route.params.message;
      }
      loadTwitterLink();
    });
    
    const isLoading = computed(function() {
      return store.getters.getIsLoading;
    });

    return {
      twitterLink,
      useStore,
      isLoading,
      loadTwitterLink,
      message,
      messageStyleType,
    };
  },
};
</script>

<style></style>
