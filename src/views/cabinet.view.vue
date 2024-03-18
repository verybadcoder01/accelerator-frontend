<script>
import config from "@/../assets/config.js"
import brandtable from "@/components/BrandTable.vue"
import brandTable from "@/components/BrandTable.vue";

export default {
  computed: {
    brandTable() {
      return brandTable
    }
  },
  data() {
    return {
      token: '',
      brands: [],
      loading: 0
    }
  },
  methods: {
    async GetMyBrands() {
      const request = new Request(config.BACKEND_LINK + "/api/users/get_added_brands", {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      const resp = await fetch(request)
      if (resp.status !== 200) {
        window.location.href = '/'
      }
      this.brands = await resp.json()
    }
  },
  async mounted() {
    this.loading = true
    this.token = localStorage.getItem('token');
    await this.GetMyBrands()
    if (this.brands != null) {
      for (let brand of this.brands) {
        brand.to ??= await brandTable.methods.url(brand.name)
      }
    }
    this.loading = false
  }
}
</script>

<template>
  <template v-if="loading">
    <h2>Loading, please wait</h2>
  </template>
  <template v-else>
    <h2>Здравствуйте!</h2>
    <div>
      <h2>Ваши бренды:</h2>
      <div v-for="brand in this.brands" class="brands">
        <router-link :to="brand.to">
          {{ brand.name }}
        </router-link>
      </div>
      <div class="btns">
        <button class="addnew">
          <router-link to="/lk/add">
            Добавить новый
          </router-link>
        </button>
        <button class="backbtn">
          <router-link to="/">
            На главную страницу
          </router-link>
        </button>
      </div>
    </div>
  </template>
</template>

<style scoped>
.backbtn, .addnew {
  margin: 0px;
  width: 10%;
  padding: 10px;
}

.addnew {
  margin-right: 5px;
}

.brands {
  padding-bottom: 10px;
}

.btns {
  display: flex;
  flex-direction: row;
}

button {
  padding: 10px 20px;
  backface-visibility: hidden;
  background-color: #405cf5;
  border-radius: 6px;
  border-width: 0;
  box-shadow: rgba(50, 50, 93, .1) 0 0 0 1px inset, rgba(50, 50, 93, .1) 0 2px 5px 0, rgba(0, 0, 0, .07) 0 1px 1px 0;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  font-size: 100%;
  transform: translateZ(0);
  transition: all .2s, box-shadow .08s ease-in;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}
</style>