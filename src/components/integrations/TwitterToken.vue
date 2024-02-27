<template>
  <div class="container">
    <base-message :type="messageStyleType" v-if="message">{{
      message
    }}</base-message>
    <base-card>
      <template v-slot:title>
        <i class="bi bi-person-fill me-2"></i>Saving Twitter Token
      </template>
      <template v-slot:body>
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

  setup() {
    // create a reference to Vuex store
    const store = useStore();

    //get access to Vuex router
    const router = useRouter();
    const route = useRoute();
    //sets up hook for message alerting
    const { message, messageStyleType, setMessage } = useAlert();

    async function saveTwitterToken() {
      try {
        await store.dispatch("setTwitterToken", window.location.href);
        router.replace({
          name: "Integrations",
          params: { message: "Twitter token set" },
        });
      } catch (err) {
	console.log(err)
        setMessage("Problem saving twitter token.", "alert-danger");
        store.dispatch("setIsLoading", false);
      }
    }
    onMounted(function() {
      if (route.params.message) {
        message.value = route.params.message;
      }
      saveTwitterToken();
    });
    
    const isLoading = computed(function() {
      return store.getters.getIsLoading;
    });

    return {
      saveTwitterToken,
      useStore,
      isLoading,
      message,
      messageStyleType,
    };
  },
};
</script>

<style></style>
