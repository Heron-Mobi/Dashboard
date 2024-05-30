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
	<div>
	<button @click="twitterIntegrate" class="btn btn-primary m-3"
          	v-if="!isLoadingTwitter">
		<i class="bi bi-twitter me-2"></i>
		<span v-if="twitterLink.set">
		  Twitter already integrated. Click to reset.
		</span>
		<span v-else>
		  Integrate Twitter
		</span>
	</button>
        <base-spinner v-if="isLoadingTwitter">Loading ...</base-spinner>
	</div>
	<div>
	<button @click="sqsToggle" class="btn btn-primary m-3"
          	v-if="!isLoadingSQS">
		<i class="bi bi-arrow-down-square-fill me-2"></i>
		<span v-if="sqs.sqsdeployed">
		  Disable external integration.
		</span>
		<span v-else>
		  Enable external integration.
		</span>
	</button>
        <base-spinner v-if="isLoadingSQS">Loading ...</base-spinner>
	</div>
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
    },
    sqsToggle() {
	this.toggleSQSExists(this.sqs.sqsdeployed)
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

    async function loadSQS() {
      try {
	await store.dispatch("fetchSQS");
      } catch (err) {
	console.log(err)
        setMessage("Problem loading external integration.", "alert-danger");
        store.dispatch("setIsLoadingSQS", false);
      }
    }


    async function toggleSQSExists(exists) {
      var action =  "create";
      if (exists) {
	      action = "delete";
      }
      try {
	await store.dispatch("setSQS", action );
        setMessage(
	   "Your external integration was " + action + "d.",
          "alert-success"
        );
      } catch (err) {
        setMessage(
	  "Problem " + action + "ing the external integration.",
          "alert-danger"
        );
      }
    }

    onMounted(function() {
      if (route.params.message) {
        message.value = route.params.message;
      }
      loadTwitterLink();
      loadSQS();
    });
    const sqs = computed(function() {
      return store.getters.getSQS;
    });
    const isLoadingTwitter = computed(function() {
      return store.getters.getIsLoadingTwitter;
    });

    const isLoadingSQS = computed(function() {
      return store.getters.getIsLoadingSQS;
    });
    return {
      twitterLink,
      sqs,
      toggleSQSExists,
      useStore,
      isLoadingTwitter,
      isLoadingSQS,
      loadTwitterLink,
      message,
      messageStyleType,
    };
  },
};
</script>

<style></style>
