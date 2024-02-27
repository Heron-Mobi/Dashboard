/*
  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
  SPDX-License-Identifier: MIT-0 
*/
export default {
  deleteVideo(state, payload) {
    // const item = state.videos.find(video => video.id === payload);
    // state.videos.splice(state.videos.indexOf(item), 1);

    state.videos = state.videos.filter((video) => video.id !== payload);
  },
  setVideos(state, payload) {
    console.log(payload);
    state.videos = payload.videos;
    state.identityId = payload.id.IdentityId;
  },
  setVideo(state, payload) {
    state.video = payload;
  },
};
