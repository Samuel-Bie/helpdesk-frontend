<template>
  <div id="wrapper">
    <nav class="navbar navbar-fixed-top">
      <div class="container-fluid">
        <div class="navbar-left">
          <div class="navbar-btn">
            <router-link to="/"
              ><img
                src="/assets/images/vue-logo.png"
                alt="Vue.js Training Logo"
                class="img-fluid logo"
            /></router-link>
            <button type="button" class="btn-toggle-offcanvas">
              <i class="lnr lnr-menu fa fa-bars"></i>
            </button>
          </div>
          <a href="javascript:void(0);" class="icon-menu btn-toggle-fullwidth"
            ><i class="fa fa-arrow-left"></i
          ></a>
        </div>

        <div class="navbar-right">
          <div id="navbar-menu">
            <ul class="nav navbar-nav">
              <li>
                <a
                  href="javascript:void(0);"
                  class="right_toggle icon-menu"
                  title="Right Menu"
                  ><i class="icon-settings"></i
                ></a>
              </li>
              <li>
                <a
                  @click.prevent="loggingOut === false && logUserOut()"
                  href="#"
                  class="icon-menu"
                  ><i class="icon-power"></i
                ></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>

    <div id="left-sidebar" class="sidebar">
      <div class="navbar-brand">
        <router-link to="/"> <span>Help Desk System</span></router-link>
        <button
          type="button"
          class="btn-toggle-offcanvas btn btn-sm btn-default float-right"
        >
          <i class="lnr lnr-menu fa fa-chevron-circle-left"></i>
        </button>
      </div>
      <div class="sidebar-scroll">
        <div class="user-account">
          <div class="dropdown">
            <span>Welcome,</span>
            <a
              href="javascript:void(0);"
              class="dropdown-toggle user-name"
              data-toggle="dropdown"
              ><strong>{{ userStore.user.name }}</strong></a
            >
            <ul class="dropdown-menu dropdown-menu-right account">
              <li class="divider"></li>
              <li>
                <a
                  @click.prevent="loggingOut === false && logUserOut()"
                  href="#"
                  ><i class="icon-power"></i>Logout</a
                >
              </li>
            </ul>
          </div>
        </div>
        <nav id="left-sidebar-nav" class="sidebar-nav">
          <ul id="main-menu" class="metismenu">
            <li class="active">
              <router-link to="/"
                ><i class="icon-home"></i><span>Main</span></router-link
              >
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <div id="main-content">
      <div class="block-header">
        <div class="row clearfix">
          <div class="col-md-6 col-sm-12">
            <h2>Dashboard</h2>
          </div>
          <div class="col-md-6 col-sm-12 text-right">
            <ul class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link to="/"><i class="icon-home"></i></router-link>
              </li>
              <li class="breadcrumb-item active">Dashboard</li>
            </ul>
            <router-link class="btn btn-info" to="/ticket/create"
              >New Ticket</router-link
            >
          </div>
        </div>
      </div>

      <div class="container-fluid">
        <div class="row clearfix">
          <div class="col-lg-12 col-md-12 col-sm-12">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";

import { ref } from "vue";
import axios from "../axios";
import useUserStore from "../store/user";

const router = useRouter();
const userStore = useUserStore();
const loggingOut = ref(false);

const logUserOut = () => {
  loggingOut.value = true;

  const token = userStore.userToken;
  axios
    .post(
      "auth/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then(() => {
      userStore.logoutUser();
      loggingOut.value = false;
    });
};
</script>
