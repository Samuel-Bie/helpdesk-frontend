<template>
  <div id="wrapper" class="auth-main">
    <div class="container">
      <div class="row clearfix">
        <div class="col-12"></div>
        <div class="col-lg-8">
          <div class="auth_detail">
            <h2 class="text-monospace">Help Desk System Front end app</h2>
            <p>For testing perposes use the following credentials.</p>
            <p>
              <pre class="text-white">
'name' => 'Employee User',
'email' => 'employee.user@test.com',
'password' => password,


'name' => 'Regular User',
'email' => 'regular.user@test.com',
'password' => password,

              </pre>



             </p>
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
                @submit.prevent="loginData.submitting === false && loginUser()"
              >
                <div class="form-group">
                  <label for="signin-email" class="control-label sr-only"
                    >Email</label
                  >
                  <input
                    v-model="loginData.email"
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
                    v-model="loginData.password"
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

<script setup>
import axios from "../axios";
import { reactive, ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import useUserStore from "../store/user";

const userStore = useUserStore();
const router = useRouter();

const loginData = reactive({
  email: "employee.user@test.com",
  password: "password",
  submitting: false,
});

const userIsAuth = computed(() => {
  return userStore.userIsAuth;
});

watch(userIsAuth, () => {
  /**
   * By default the userIsAuth value is false.
   * On successful registration, after the storeLoggedInUser
   * method is called, the userIsAuth value is
   * set to true and this watch property is invoked.
   * The code below will then run.
   * If the user is authenticated, redirect to the home page.
   */
  router.push("/");
});

const loginUser = () => {
  axios({
    baseURL: "http://localhost/sanctum/csrf-cookie",
    withCredentials: true,
  })
    .then((response) => {
      axios.post("/auth/token", loginData).then((response) => {
        userStore.storeLoggedInUser(response.data.token, response.data.user);
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
</script>
