<script setup>
import LoginButton from "@/components/LoginButton.vue";
import SearchBar from "@/components/SearchBar.vue";
import BrandTable from "@/components/BrandTable.vue";
</script>

<script>

import config from "../../assets/config.js";

export default {
  data() {
    return {
      islogin: 0
    }
  },
  methods: {
    checklogin: async function() {
      const request = new Request(config.BACKEND_LINK + "/api/users/checklogin", {
        method: "GET",
        headers: {
          Authorization: [window.localStorage.getItem('token')]
        }
      })
      const status = await fetch(request).then((resp) => resp.text())
      this.islogin = (status === "true")
    }
  },
  async created() {
    await this.checklogin()
  }
}

</script>

<template>
  <div class="flex-header">
    <div class="flex-child">
      <h1 id="title">Цифровая платформа</h1>
    </div>
    <div class="flex-child" v-if="islogin===false">
      <LoginButton/>
    </div>
    <div v-else>
      <button>
        <router-link to="/lk">
          В личный кабинет
        </router-link>
      </button>
    </div>
  </div>
  <SearchBar/>
  <BrandTable/>
</template>

<style>
#app {
  box-sizing: border-box;
  padding: 0;
  font-family: 'Montserrat', serif;
  max-width: 1500px;
  margin: auto;
  left: 50%;
}

.flex-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: nowrap;
}

.flex-child {
  flex-shrink: 1;
  padding: 1px;
}

.flex-child:nth-child(1) {
  flex-grow: 1
}

</style>
