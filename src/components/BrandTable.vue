<script>
import config from "@/../assets/config.js"

let offset = 0, limit = 50

async function GetBrands() {
  const request = new Request(config.BACKEND_LINK + "/api/brands/open?offset=" + offset.toString() + "&" + "limit=" + limit.toString(), {
    method: "GET",
  })
  offset += limit
  const body = await fetch(request);
  return await body.json()
}

export default {
  data() {
    return {
      brandData: [],
      loading: false
    };
  },
  methods: {
    url: async function (item) {
      const request = new Request(config.BACKEND_LINK + "/api/brands/get_brand_by_name?name=" + item, {
        method: "GET"
      })
      const body = await fetch(request).then((resp) => resp.text())
      return "brand/" + body
    }
  },
  async created() {
    try {
      this.loading = true
      this.brandData = await GetBrands()
      for (let brand of this.brandData) {
        brand.to = await this.url(brand.name)
      }
      this.loading = false
    } catch (e) {
      console.log(e)
    }
  }
};

</script>

<template>
  <div class="tablediv">
    <table>
      <thead>
        <tr>
          <th>Название</th>
          <th>Локация</th>
          <th>Описание</th>
          <th>На страницу</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="loading">
          <h2>loading</h2>
        </template>
        <template v-else>
          <tr v-for="brand in brandData">
            <td>{{ brand.name }}</td>
            <td>{{ brand.location }}</td>
            <td>{{ brand.description }}</td>
            <td><router-link :to="brand.to">Домашняя страница</router-link></td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
table {
  overflow-y: scroll;
  border: 2px solid #405cf5;
  border-radius: 5px;
  margin-top: 10px;
  width: 100%;
  border-collapse: collapse;
  border-radius: 5px; 
}

th, td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
}

.tablediv {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100uv;
  margin: 0;
}
</style>