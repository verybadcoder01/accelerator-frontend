<script>
import config from "../../assets/config.js";
import url from "./BrandTable.vue"

export default {
  data() {
    return {
      value: ''
    }
  },
  methods: {
    async SearchByName() {
      const request = new Request(config.BACKEND_LINK + "/api/brands/get_brand_by_name?name=" + this.value, {
        method: "GET"
      })
      const res = await fetch(request)
      if (res.status !== 200) {
        alert("Такого бренда не существует!")
      } else {
        window.location.href = await url.methods.url(this.value)
      }
    }
  }
}

</script>

<template>
  <div>
    <input type="text" v-model.trim="value" @keydown.enter="SearchByName" placeholder="Введите название бренда..."
           class="searchbar">
  </div>
</template>

<style scoped>
.searchbar {
  width: 100%;
  height: 40px;
  font-size: 16px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>