<template>
  <header>
    <div class="px-3 py-2 bg-dark text-white">
      <div class="container">
        <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <router-link
              :to="{name:'home'}"
              custom
              v-slot="{ href, navigate }">
            <a :href="href" @click="navigate"
               class="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none">
              CAR RENTING
            </a>
          </router-link>


          <ul class="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
            <router-link
                :to="{name:'home'}"
                custom
                v-slot="{ href, navigate,isExactActive }">
              <li>
                <a :href="href" @click="navigate" :class="isExactActive ? 'text-secondary' : 'text-white'"
                   class="nav-link">
                  Home
                </a>
              </li>
            </router-link>
            <router-link
                :to="{name:'cars'}"
                custom
                v-slot="{ href, navigate,isExactActive }">
              <li>
                <a :href="href" @click="navigate" :class="isExactActive ? 'text-secondary' : 'text-white'"
                   class="nav-link">
                  Cars
                </a>
              </li>
            </router-link>
            <router-link
                :to="{name:'my-cars'}"
                custom
                v-slot="{ href, navigate,isExactActive }">
              <li>
                <a :href="href" @click="navigate" :class="isExactActive ? 'text-secondary' : 'text-white'"
                   class="nav-link" v-if="accountId">
                  My cars
                </a>
                <a class="nav-link disabled-link" v-else>
                  My cars
                </a>
              </li>
            </router-link>
            <router-link
                :to="{name:'my-rents'}"
                custom
                v-slot="{ href, navigate,isExactActive }">
              <li>
                <a :href="href" @click="navigate" :class="isExactActive ? 'text-secondary' : 'text-white'" v-if="accountId"
                   class="nav-link">
                  My rents
                </a>
                <a class="nav-link disabled-link" v-else>
                  My rents
                </a>
              </li>
            </router-link>
            <router-link
                :to="{name:'create-car'}"
                custom
                v-slot="{ href, navigate,isExactActive }">
              <li>
                <a :href="href" @click="navigate" :class="isExactActive ? 'text-secondary' : 'text-white'" v-if="accountId"
                   class="nav-link">
                  Create Car
                </a>
                <a class="nav-link disabled-link" v-else>
                  Create Car
                </a>
              </li>
            </router-link>

            <li style="border-left: 1px solid #999">
              <div v-if="!accountId">
                <a href="javascript:void(0)" class="nav-link text-white btn" @click.prevent="login">
                  Login
                </a>
              </div>
              <div class="d-flex" v-else>
                <a href="javascript:void(0)" class="nav-link text-white text-decoration-underline" v-clipboard:copy="accountId">
                  {{ shortAddressId }} <font-awesome-icon icon="copy" />
                </a>
                <a href="javascript:void(0)" class="btn btn-outline-danger nav-link text-white " @click.prevent="signOut">
                  Sign out
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>

  <!--  <header id="header" class="d-flex align-items-center">-->
  <!--    <div class="container d-flex align-items-center">-->

  <!--      <h1 class="logo me-auto">-->
  <!--        <router-link :to="{name:'home'}">{{appName}}</router-link>-->
  <!--      </h1>-->
  <!--      &lt;!&ndash; Uncomment below if you prefer to use an image logo &ndash;&gt;-->
  <!--      &lt;!&ndash; <a href="index.html" class="logo me-auto"><img src="assets/img/logo.png" alt="" class="img-fluid"></a>&ndash;&gt;-->

  <!--      <nav id="navbar" class="navbar">-->
  <!--        <ul>-->
  <!--          <li>-->
  <!--            <router-link-->
  <!--                :to="{name:'home'}"-->
  <!--                custom-->
  <!--                v-slot="{ href, navigate, isExactActive }">-->
  <!--              <a :href="href" @click="navigate"-->
  <!--                 class="nav-link scrollto" :class="isExactActive ? 'active' : ''" >Home</a>-->
  <!--            </router-link>-->
  <!--          </li>-->
  <!--          <li>-->
  <!--            <router-link-->
  <!--                :to="{name:'about'}"-->
  <!--                custom-->
  <!--                v-slot="{ href, navigate, isExactActive }">-->
  <!--              <a :href="href" @click="navigate"-->
  <!--                 class="nav-link scrollto" :class="isExactActive ? 'active' : ''" >About</a>-->
  <!--            </router-link>-->
  <!--          </li>-->
  <!--          <li>-->
  <!--            <router-link-->
  <!--                :to="{name:'meetings'}"-->
  <!--                custom-->
  <!--                v-slot="{ href, navigate, isExactActive }">-->
  <!--              <a :href="href" @click="navigate"-->
  <!--                 class="nav-link scrollto" :class="isExactActive ? 'active' : ''" >Meetings</a>-->
  <!--            </router-link>-->
  <!--          </li>-->
  <!--          <li class="dropdown" style="margin-left: 30px"  v-if="isSignedIn">-->
  <!--            <a href="#" class="text-decoration-underline"><span class="mx-2">{{ shortAddressId }}</span> <font-awesome-icon icon="caret-down" /></a>-->
  <!--            <ul class="p-2">-->
  <!--              <li><button class="btn btn-outline-success w-100" v-clipboard:copy="accountId" >{{ shortAddressId }} <font-awesome-icon icon="copy" /></button></li>-->
  <!--              <hr>-->
  <!--              <li>-->
  <!--                <router-link-->
  <!--                    :to="{name:'profile-dashboard'}"-->
  <!--                    custom-->
  <!--                    v-slot="{ href, navigate, isExactActive }">-->
  <!--                  <a :href="href" @click="navigate"-->
  <!--                     class="nav-link scrollto" :class="isExactActive ? 'active' : ''" >Profile</a>-->
  <!--                </router-link>-->
  <!--              </li>-->
  <!--&lt;!&ndash;              <li><a href="#">Drop Down 3</a></li>&ndash;&gt;-->
  <!--              <hr>-->
  <!--              <li v-if="isSignedIn"><button class="btn btn-outline-danger w-100"  @click.prevent="signOut" >Sign Out</button></li>-->
  <!--            </ul>-->
  <!--          </li>-->
  <!--          <li style="margin-left: 30px" v-else><button class="btn btn-outline-success m-2" @click.prevent="login" >Log In</button></li>-->
  <!--        </ul>-->
  <!--        <i class="bi bi-list mobile-nav-toggle"></i>-->
  <!--      </nav>&lt;!&ndash; .navbar &ndash;&gt;-->

  <!--    </div>-->
  <!--  </header>-->
</template>

<script>
import {signIn, signOut} from "@/utils";

export default {
  name: "HeaderComp",
  props: ["accountId", "isSignedIn"],
  filters: {
    shortAddress: function (value) {
      if (!value) return ''
      if (value.length > 25) {
        return value.substring(0, 5) + '...' + value.substring(value.length - 5);
      }
      return value;
    }
  },
  methods: {
    async login() {
      if (!this.isSignedIn) {
        await signIn();
      }
    },
    async signOut() {
      await signOut();
      this.$parent.updateInfo();
    },
  },
  computed: {
    appName() {
      return process.env.VUE_APP_APP_NAME
    },
    shortAddressId() {
      return this.$options.filters.shortAddress(this.accountId)
    }
  }
}
</script>

<style scoped>

</style>