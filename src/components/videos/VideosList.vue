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
        <i class="bi bi-camera-video-fill me-2"></i>My Videos
      </template>
      <template v-slot:body>
        <table class="table table-hover table-striped">
          <thead>
            <tr>
              <th scope="col">Video</th>
              <th scope="col">Date</th>
              <th scope="col">Link</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="video in video_data" :key="video.id">
              <td>
                {{ video.id }}
              </td>
              <td>
                {{ video.date }}
              </td>
              <td>	
		      <a v-bind:href="'https://video.heron.mobi/index.html?identityId='+ identityId +'&timestamp=' +  video.id" target="_blank">
			      Link</a>
              </td>
              <td>
                <router-link
                  v-if="video.id"
                  :to="{ name: 'DeleteVideo', params: { id: video.id } }"
                >
                  <i class="bi bi-trash-fill"></i>
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
        <div
          class="alert alert-primary"
          role="alert"
          v-if="video_data.length < 1 && !isLoading"
        >
          You have not added any videos yet
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
import { reactive, computed, onMounted } from "vue";
import useAlert from "../../hooks/alert";

export default {
  setup() {
    // create a reference to Vuex store
    const store = useStore();
    const videos = reactive([]);

    //get access to Vuex router
    const router = useRouter();
    const route = useRoute();

    //sets up hook for message alerting
    const { message, messageStyleType, setMessage } = useAlert();

    async function loadVideos() {
      try {
        await store.dispatch("fetchVideos");
      } catch (err) {
        setMessage("Problem loading videos.", "alert-danger");
        store.dispatch("setIsLoading", false);
      }
    }


    function deleteVideo(id) {
      router.push(`/delete-video/${id}`);
    }

    const video_data = computed(function() {
      return store.getters.getVideos;
    });
    const identityId = computed(function() {
      return store.getters.getId;
    });
    onMounted(function() {
      if (route.params.message) {
        message.value = route.params.message;
      }
      loadVideos();
    });

    const isLoading = computed(function() {
      return store.getters.getIsLoading;
    });

    return {
      useStore,
      videos,
      identityId,
      video_data,
      deleteVideo,
      isLoading,
      loadVideos,
      message,
      messageStyleType,
    };
  },
};
</script>

<style></style>
