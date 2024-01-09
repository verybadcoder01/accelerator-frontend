<script>
import BACKEND_LINK from "@/../assets/config.js"

let offset = 0, limit = 50

async function GetBrands() {
  const request = new Request(BACKEND_LINK + "/api/brands/open?offset=" + offset.toString() + "&" + "limit=" + limit.toString(), {
    method: "GET",
  })
  offset += limit
  const body = await fetch(request).then((result) => result.text())
  return JSON.parse(body)
}

export default {
  data() {
    return {
      brandData: [],
      loading: false
    };
  },
  async created() {
    try {
      this.loading = true
      this.brandData = await GetBrands()
      this.loading = false
    } catch (e) {
      console.log(e)
    }
  }
};

</script>

<template>
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
        <td>{{ brand["name"] }}</td>
        <td>{{ brand["location"] }}</td>
        <td>{{ brand["description"] }}</td>
        <td><a href="{{brand['name']}}">Домашняя страница</a></td>
      </tr>
    </template>
    </tbody>
  </table>
</template>

<style scoped>
table {
  overflow-y: scroll;
  display: block;
  border: 2px solid #405cf5;
  border-radius: 5px;
  margin-top: 10px;
}
</style>