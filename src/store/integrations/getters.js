/*
  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
  SPDX-License-Identifier: MIT-0 
*/
export default {
  getTwitterLink(state) {
    console.log(state.twitterLink)
    return state.twitterLink;
  },
  getSQS(state) {
    console.log(state.sqs)
    return state.sqs;
  },
};
