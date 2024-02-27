/*
  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
  SPDX-License-Identifier: MIT-0 
*/

/*
  Stores Cognito user pool ID and app client ID config info
  replace with your UserPoolId and ClientId values here
*/


import config from "../../public/config.json";
console.log(config.ClientId)
export const POOL_DATA = {
  UserPoolId: config.UserPoolId,
  ClientId: config.ClientId,
};
