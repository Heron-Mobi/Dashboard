/*
  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
  SPDX-License-Identifier: MIT-0 
*/
import { createRouter, createWebHistory } from "vue-router";

import SignUp from "@/views/auth/SignUp";
import SignIn from "@/views/auth/SignIn";
import ForgotPassword from "@/views/auth/ForgotPassword";
import Confirm from "@/views/auth/Confirm";
import NotFound from "@/views/NotFound";
import Settings from "@/views/auth/Settings";
import Videos from "@/views/videos/Videos";
import Signals from "@/views/signals/Signals";
import Integrations from "@/views/integrations/Integrations";
import TwitterToken from "@/views/integrations/TwitterToken";
import QrCode from "@/views/qrcode/QrCode";
import DeleteVideo from "@/views/videos/DeleteVideo";
import store from "../store/index.js";

const routes = [
  {
    path: "/",
    component: Videos,
    beforeEnter: isAuthenticated,
    meta: {
      requiresAuth: true,
    },
  },
  { path: "/signup", name: "SignUp", component: SignUp },
  { path: "/signin", name: "SignIn", component: SignIn },
  {
    path: "/forgotpassword",
    name: "ForgotPassword",
    component: ForgotPassword,
  },
  { path: "/confirm", name: "Confirm", component: Confirm },
  {
    path: "/settings",
    name: "Settings",
    component: Settings,
    beforeEnter: isAuthenticated,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/videos",
    name: "Videos",
    component: Videos,
    beforeEnter: isAuthenticated,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/signals",
    name: "Signals",
    component: Signals,
    beforeEnter: isAuthenticated,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/integrations",
    name: "Integrations",
    component: Integrations,
    beforeEnter: isAuthenticated,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/integrations/twittertoken",
    name: "TwitterToken",
    component: TwitterToken,
    beforeEnter: isAuthenticated,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/qrcode",
    name: "QrCode",
    component: QrCode,
    beforeEnter: isAuthenticated,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/delete-video/:id",
    name: "DeleteVideo",
    component: DeleteVideo,
    beforeEnter: isAuthenticated,
    meta: {
      requiresAuth: true,
    },
  },
  { path: "/:notFound(.*)", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

function isAuthenticated(to, from, next) {
  if (store.getters.isAuthenticated) {
    next();
  } else {
    next("/signin");
  }
}

export default router;
