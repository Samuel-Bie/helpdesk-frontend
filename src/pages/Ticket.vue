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
              ><strong>{{ user.name }}</strong></a
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
              <li class="breadcrumb-item active">New Ticket</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="container-fluid">
        <div class="row clearfix">
          <div class="col-lg-12 col-md-12 col-sm-12">
            <div class="card">
              <div class="header">
                <h2>New Ticket</h2>
              </div>
              <div class="body">
                <form class="needs-validation" @submit.prevent="submitTicket">
                  <div class="form-row">
                    <div class="col-md-6 mb-3">
                      <label for="validationCustom01">Ticket Title</label>
                      <input
                        type="text"
                        class="form-control"
                        required
                        v-model="ticket.title"
                      />
                    </div>

                    <div class="col-md-3 mb-3">
                      <label for="validationCustom04">Category</label>
                      <select
                        class="custom-select"
                        id="validationCustom04"
                        required
                        v-model="ticket.category"
                      >
                        <option
                          v-for="item in categories"
                          :key="item.id"
                          :value="item.id"
                        >
                          {{ item.name }}
                        </option>
                      </select>
                    </div>

                    <div class="col-md-3 mb-3">
                      <label for="validationCustom04">Priority</label>
                      <select
                        class="custom-select"
                        id="validationCustom04"
                        required
                        v-model="ticket.priority"

                      >
                        <option value="low">low</option>
                        <option value="medium">medium</option>
                        <option value="high">high</option>
                      </select>
                    </div>
                    <div class="col-md-12 mb-3">
                      <label for="validationCustom02">Image URL</label>
                      <input
                        type="text"
                        class="form-control"
                        id="validationCustom02"
                        v-model="ticket.image"
                      />
                    </div>
                    <div class="col-md-12 mb-3">
                      <label for="exampleFormControlTextarea1"
                        >Description</label
                      >
                      <textarea
                        class="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"

                        v-model="ticket.description"
                      ></textarea>
                    </div>
                  </div>
                  <button class="btn btn-primary" type="submit">Save</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import useTicketStore from "../store/ticket";
import useCategoryStore from "../store/category";
import useGeneralStore from "../store/general";
import useUserStore from "../store/user";
import { mapState, mapActions } from "pinia";
export default {
  data: () => {
    return {

      ticket: {
        title: "",
        category: "",
        priority: "",
        image: "",
        description: "",
        status:'open'
      },
      loggingOut: false,
    };
  },
  computed: {
    ...mapState(useTicketStore, ["tickets"]),
    ...mapState(useCategoryStore, ["categories"]),
    ...mapState(useGeneralStore, ["API_URL"]),
    ...mapState(useUserStore, ["token", "userIsAuth", "user"]),
  },
  watch: {
    userIsAuth() {
      /*
                At this point the userIsAuth value is true.
                On successful logout, after the storeLoggedInUser
                method is called, the userIsAuth value is
                set to false and this watch property is invoked.
                The code below will then run.
            */
      this.$router.push("/login");
    },
  },
  methods: {
    ...mapActions(useTicketStore, ["storeTickets"]),
    ...mapActions(useCategoryStore, ["storeCategories"]),
    ...mapActions(useUserStore, ["logoutUser"]),
    logUserOut() {
      const _this = this;
      _this.loggingOut = true;
      axios
        .post(
          `${_this.API_URL}/api/auth/logout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${_this.token}`,
            },
          }
        )
        .then((reponse) => {
          alert(reponse.data.message);
        })
        .catch((error) => {
          console.log(error);
          alert(error.reponse.data.message);
        })
        .then(() => {
          _this.logoutUser();
          _this.loggingOut = false;
        });
    },

    openNewTicketPage() {
      this.$router.push("/new-ticket");
    },

    submitTicket(){
      const _this = this;

      axios
        .post(
          `${_this.API_URL}/api/tickets`,
          {
            ..._this.ticket,
             },
          {
            headers: {
              Authorization: `Bearer ${_this.token}`,
            },
          }
        )
    },




    fetchCategories() {
      const _this = this;
      axios
        .get(`${_this.API_URL}/api/categories`, {
          headers: {
            Authorization: `Bearer ${_this.token}`,
          },
        })
        .then((reponse) => {
          const categories = reponse.data.data;
          _this.storeCategories(categories);

          console.log(categories);
        })
        .catch((error) => {
          console.log(error);
          alert(error.reponse.data.message);
        })
        .then(() => {
          //
        });
    },
  },
  mounted() {
    this.fetchCategories();
  },
};
</script>
