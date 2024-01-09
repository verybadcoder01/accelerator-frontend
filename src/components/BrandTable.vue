<script setup>
import BACKEND_LINK from "@/../assets/config.js"
import TableRow from "@/components/TableRow.vue";

var offset = 0, limit = 50

async function GetBrands() {
  const request = new Request(BACKEND_LINK + "/api/brands/open?offset=" + offset.toString() + "&" + "limit=" + limit.toString(), {
    method: "GET",
    mode: "no-cors"
  })
  offset += limit
  const body = await fetch(request).then((result) => result.text())
  console.log(body)
  return JSON.parse(body)
}

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
    <tr v-for="brand in GetBrands()">
      <td>{{ brand["name"] }}</td>
      <td>{{ brand["location"] }}</td>
      <td>{{ brand["description"] }}</td>
      <td><a href="{{brand['name']}}">Домашняя страница</a></td>
    </tr>
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