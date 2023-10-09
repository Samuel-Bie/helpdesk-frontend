<template>
  <div id="wrapper" class="auth-main">
    <div class="container">
      <div class="row clearfix">
        <div class="col-12"></div>
        <div class="col-lg-8">
          <div class="auth_detail">
            <h2 class="text-monospace">
              VISONAIRE
            </h2>
            <p>Basic Helpdesk System.</p>
            <ul class="social-links list-unstyled">
              <li class="mr-1">
                <a
                  class="btn btn-default"
                  href="https://github.com/samuel-bie"
                  target="_blank"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="github"
                  ><i class="fa fa-github"></i
                ></a>
              </li>
              <li class="mr-1">
                <a
                  class="btn btn-default"
                  href="https://linkedin.com/in/samuelbie"
                  target="_blank"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="linkedin"
                  ><i class="fa fa-linkedin"></i
                ></a>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="card">
            <div class="header">
              <p class="lead">Login to your account</p>
            </div>
            <div class="body">
              <form
                class="form-auth-small"
                @submit.prevent="submitting === false && loginUser()"
              >
                <div class="form-group">
                  <label for="signin-email" class="control-label sr-only"
                    >Email</label
                  >
                  <input
                    v-model="email"
                    type="email"
                    class="form-control"
                    id="signin-email"
                    placeholder="Email"
                  />
                </div>
                <div class="form-group">
                  <label for="signin-password" class="control-label sr-only"
                    >Password</label
                  >
                  <input
                    v-model="password"
                    type="password"
                    class="form-control"
                    id="signin-password"
                    placeholder="Password"
                  />
                </div>
                <div class="form-group clearfix">
                  <label class="fancy-checkbox element-left">
                    <input type="checkbox" />
                    <span>Remember me</span>
                  </label>
                </div>
                <button type="submit" class="btn btn-primary btn-lg btn-block">
                  LOGIN
                </button>
                <div class="bottom">
                  <span class="helper-text m-b-10"
                    ><i class="fa fa-lock"></i
                    ><a href="javascript: void(0);">Forgot password?</a></span
                  >
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import useGeneralStore from "../store/general";
import useUserStore from "../store/user";
import { mapActions, mapState } from "pinia";
export default {
  data: () => {
    return {
      email: "",
      password: "",
      submitting: false,
    };
  },
  computed: {
    ...mapState(useGeneralStore, ["API_URL"]),
    ...mapState(useUserStore, ["userIsAuth"]),
  },
  watch: {
    userIsAuth() {
      /*
                    By default the userIsAuth value is false.
                    On successful registration, after the storeLoggedInUser
                    method is called, the userIsAuth value is
                    set to true and this watch property is invoked.
                    The code below will then run.
                */
      this.$router.push("/");
    },
  },
  methods: {
    ...mapActions(useUserStore, ["storeLoggedInUser"]),
    loginUser() {
      const _this = this;

      axios.get(`${_this.API_URL}/sanctum/csrf-cookie`).then((response) => {
        _this.submitting = true;
        axios
          .post(`${_this.API_URL}/api/auth/token`, {
            email: _this.email,
            password: _this.password,
          })
          .then((RESPONSE) => {
            const token = RESPONSE.data.token;
            const user = RESPONSE.data.user;
            _this.storeLoggedInUser(token, user);


            console.log(token, user)
          })
          .catch((ERROR) => {
            console.log(ERROR);
            alert(ERROR.response.data.message);
          })
          .then(() => {
            _this.submitting = false;
          });
      });
    },
  },
};
</script>

<style></style>
