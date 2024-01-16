<script>
import config from "../../assets/config.js";

export default {
  data() {
    return {
      brand: {},
      loading: false
    }
  },
  methods: {
    async GetByName() {
      const getBrandReq = new Request(config.BACKEND_LINK + "/api/brands/get_brand_by_id?id=" + window.location.href.split('/').at(-1), {
        method: "GET"
      })
      const resp = await fetch(getBrandReq)
      this.brand = await resp.json()
    }
  },
  async created() {
    try {
      this.loading = true
      await this.GetByName()
      this.loading = false
    } catch (e) {
      console.log(e)
    }
  }
}

</script>

<template>
  <template v-if="loading">
    <h2>Loading, please wait</h2>
  </template>
  <template v-else>
    <button class="back">
      <router-link to="/">На главную</router-link>
    </button>
    <div class="row1">
      <div class="general">
        <h3>Общая информация</h3>
        <p>{{ brand.description }}</p>
      </div>
      <div class="owners">
        <h3>Владельцы</h3>
        <p v-for="owner in brand.owners">{{ owner.person.name }} {{ owner.person.surname }}</p>
      </div>
      <div class="contacts">
        <h3>Контакты</h3>
        <p v-for="contact in brand.contacts">{{ contact.link }}</p>
      </div>
    </div>
    <div class="row2">
      <div class="stats">
        <h3>Статистика</h3>
        <table>
          <thead>
          <tr>
            <th>Название метрики</th>
            <th>Описание метрики</th>
            <th>Начало периода</th>
            <th>Окончание периода</th>
            <th>Результат</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="stat in brand.statistics">
            <td>{{ stat.name }}</td>
            <td>{{ stat.description }}</td>
            <td>{{ stat.startPeriod.split('T')[0] }}</td>
            <td>{{ stat.endPeriod.split('T')[0] }}</td>
            <td>{{ stat.value }}</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="products">
        <h3>Продукты</h3>
        <table>
          <thead>
          <tr>
            <th>Название</th>
            <th>Описание</th>
            <th>Цена начинается с, руб.</th>
            <th>Цена не превышает, руб.</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="product in brand.products">
            <td>{{ product.name }}</td>
            <td>{{ product.description }}</td>
            <td>{{ product.price.lowEnd }}</td>
            <td>{{ product.price.highEnd }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>

</template>

<style scoped>
.row1 {
  display: flex;
  flex-direction: row;
}

.general, .owners, .contacts, .stats, .products {
  flex: 1 1 0px;
  text-align: center;
}

.row2 {
  display: flex;
  flex-direction: row;
}

.back {
  position: absolute;
  margin: 0;
  padding: 0;
}

table {
  overflow-y: scroll;
  display: block;
  border-radius: 5px;
  margin-top: 10px;
  padding-left: 10px;
}
</style>