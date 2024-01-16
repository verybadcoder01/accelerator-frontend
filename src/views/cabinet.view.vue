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
    GetMyBrands: async function () {
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
  mounted() {
    this.token = localStorage.getItem('token');
  },
  async created() {
    this.loading = true
    await this.GetMyBrands()
    for (let brand of this.brands){
      brand.to ??= await brandTable.methods.url(brand.name)
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
    <div class="greet">
      <h2>Здравствуйте!</h2>
      <button class="backbtn">
        <router-link to="/">
          Вернуться
        </router-link>
      </button>
    </div>
    <div>
      <h2>Ваши бренды:</h2>
      <div v-for="brand in this.brands" class="brands">
        <router-link :to="brand.to">
          {{ brand.name }}
        </router-link>
      </div>
      <button class="addnew">
        <router-link to="/lk/add">
          Добавить новый
        </router-link>
      </button>
    </div>
  </template>
</template>

<style scoped>

.greet {
  display: flex;
  flex-direction: row;
}

.backbtn {
  margin: auto;
  width: 50%;
  padding: 10px;
}

.addnew {
  margin: auto;
  width: 10%;
  padding: 10px;
}

.brands {
  padding-bottom: 10px;
}

</style>