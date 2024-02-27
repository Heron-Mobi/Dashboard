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
        <i class="bi bi-broadcast me-2"></i>My Signals
      </template>
      <template v-slot:body>
        <table class="table table-hover table-striped">
          <thead>
            <tr>
              <th scope="col">Type</th>
              <th scope="col">Settings</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(signal, index) in signal_data" :key="index">
              <td>
		<select v-model="signal['signal-type']" class="form-select">
			<option selected value="unknown">Please select one</option>
			<option value="email"> Email </option>
			<option value="twitter"> Twitter </option>
		</select>
              </td>
              <td>
		<input class="form-control col-md-6"
			:placeholder = "signalfields[signal['signal-type']].label"
			v-model="signal.config[signalfields[signal['signal-type']].name]" >
	      </td>
            </tr>
          </tbody>
        </table>
	<button @click="addItem" class="btn btn-primary m-3"
          	v-if="!isLoading"
		>Add Signal</button>
	<button @click="saveSignals" class="btn btn-primary m-3"
          	v-if="!isLoading"
		> {{ buttonSaveText }} </button>
        <div
          class="alert alert-primary"
          role="alert"
          v-if="signal_data.length < 1 && !isLoading"
        >
          You have not added any signals yet
        </div>
        <base-spinner v-if="isLoading">Loading ...</base-spinner>
        <div class="text-end">
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

  data() {
    return{
     signalfields: {
	'twitter': {
		'name': 'twitter-handle',
		'label': 'Twitter Handle'
	},
	'email':{ 
		'name': 'destination',
		'label': 'Destination'
	},
	'unknown':{ 
		'name': 'choose',
		'label': 'Choose a Signal type'
	},
     }
   }
  },	

  methods: {
    addItem() {
      this.signal_data.push({
		      "signal-type": "unknown",
		      "config": {
		      }
	      
      });
    },

    saveSignals() {
      console.log(this.signal_data)
      this.saveSignalConfig()
    }
  },
  setup() {
    // create a reference to Vuex store
    const store = useStore();
    const signals = reactive([]);

    //get access to Vuex router
    const router = useRouter();
    const route = useRoute();
    const buttonSaveText = ref('Save Signals');
    //sets up hook for message alerting
    const { message, messageStyleType, setMessage } = useAlert();

    async function loadSignals() {
      try {
        await store.dispatch("fetchSignals");
      } catch (err) {
	console.log(err)
        setMessage("Problem loading signals.", "alert-danger");
        store.dispatch("setIsLoading", false);
      }
    }
    const signal_data = computed(function() {
      return store.getters.getSignals;
    });
    const identityId = computed(function() {
      return store.getters.getId;
    });
    onMounted(function() {
      if (route.params.message) {
        message.value = route.params.message;
      }
      loadSignals();
    });
    
    async function saveSignalConfig() {
      buttonSaveText.value = "Saving ...";

      try {
	await store.dispatch("saveSignals", {'signals': this.signal_data } );
        setMessage(
          "Your signals have been saved.",
          "alert-success"
        );
	buttonSaveText.value = 'Save Signals';
      } catch (err) {
        setMessage(
          "Problem saving config. Please try again later",
          "alert-danger"
        );
	buttonSaveText.value = 'Save Signals';
        store.dispatch("setIsLoading", false);
      }
    }
    const isLoading = computed(function() {
      return store.getters.getIsLoading;
    });

    return {
      buttonSaveText,
      useStore,
      signals,
      identityId,
      signal_data,
      isLoading,
      loadSignals,
      saveSignalConfig,
      message,
      messageStyleType,
    };
  },
};
</script>

<style></style>
