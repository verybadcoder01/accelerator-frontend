<script>
import config from "../../assets/config.js";
import Image from "primevue/image";

export default {
  components: {
    Image,
  },
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
    <div class="back">
      <button class="backbtn">
        <router-link to="/">На главную</router-link>
      </button>
      <button class="backbtn">
        <router-link to="/lk">В личный кабинет</router-link>
      </button>
    </div>
    <div class="info">
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
      <div class="prodstat">
        <div class="products">
          <table>
            <caption>
              <h3>Продукты</h3>
            </caption>
            <thead>
              <tr>
                <th>Название</th>
                <th>Описание</th>
                <th>Цена начинается с, руб.</th>
                <th>Цена не превышает, руб.</th>
                <th>Изображения</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in brand.products">
                <td>{{ product.name }}</td>
                <td>{{ product.description }}</td>
                <td>{{ product.price.lowEnd }}</td>
                <td>{{ product.price.highEnd }}</td>
                <td>
                  <div class="imgcont">
                    <div v-for="curimg in product.images">
                      <Image preview alt="Photo">
                        <template #image>
                          <img :src="curimg" alt="Photo" class="smallimg" />
                        </template>
                        <template #preview>
                          <img :src="curimg" alt="Photo" class="fullimg" />
                        </template>
                      </Image>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="stats">
          <table>
            <caption>
              <h3>Статистика</h3>
            </caption>
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
      </div>
    </div>
  </template>
</template>

<style scoped>
.row1 {
  display: flex;
  flex-direction: column;
  width: 30%;
}

.general,
.owners,
.contacts,
.stats,
.products {
  flex: 1 1 0px;
  text-align: center;
}

.products,
.stats {
  display: flex;
  flex-direction: row;
}

.prodstat {
  width: 65%;
  display: flex;
  flex-direction: column;
}

.info {
  display: flex;
  justify-content: space-between;
}

.imgcont {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.smallimg {
  width: 100%;
  height: 100%;
  padding-left: 5px;
}

.fullimg {
  position: fixed;
  left: 50%;
  right: 50%;
  transform: translate(-50%, -50%);
}

.back {
  position: fixed;
  top: 10px;
  left: 10px;
}

.backbtn {
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
  margin-right: 5px;
}

table {
  overflow-y: auto;
  display: block;
  border-radius: 5px;
  margin-bottom: 20px;
  padding-left: 10px;
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

th {
  background-color: #f2f2f2;
}
</style>