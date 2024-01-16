<script>
import config from "../../assets/config.js"

export default {
  data() {
    return {
      loading: 0,
      token: '',
      owners: [{person: {name: '', surname: '', fathername: '', bioInfo: '', history: []}}],
      contacts: [{typeOf: 0, link: ''}],
      stats: [{name: '', description: '', startPeriod: null, endPeriod: null, value: null}],
      products: [{name: '', description: '', price: {lowEnd: null, highEnd: null, currency: 'рублей'}}],
      brandAdded: {name: '', description: '', location: ''}
    }
  },
  methods: {
    checklogin: async function () {
      const request = new Request(config.BACKEND_LINK + "/api/users/checklogin", {
        method: "GET",
        headers: {
          Authorization: [localStorage.getItem('token')]
        }
      })
      const resp = await fetch(request)
      if (resp.status === 200) {
        if (await resp.text() === "true") {
          this.token = localStorage.getItem('token')
        } else {
          window.location.href = '/'
        }
      } else {
        window.location.href = '/'
      }
    },
    addBrand: async function () {
      this.brandAdded.owners ??= this.owners
      this.brandAdded.contacts ??= this.contacts
      this.brandAdded.statistics ??= this.stats
      this.brandAdded.products ??= this.products
      // TODO: replace this with proper regex with all cases
      for (let contact of this.brandAdded.contacts) {
        if (contact.link[0] === '@') {
          contact.typeOf = 2
        } else if (contact.link[0] !== '@' && contact.link.indexOf('@') !== -1) {
          contact.typeOf = 1
        } else {
          contact.typeOf = 3
        }
      }
      for (let stat of this.brandAdded.statistics) {
        // because backend is kind of weird
        stat.startPeriod += "T00:00:00Z"
        stat.endPeriod += "T00:00:00Z"
      }
      const request = new Request(config.BACKEND_LINK + "/api/users/brands/add", {
        method: "POST",
        headers: {
          Authorization: this.token
        },
        body: JSON.stringify(this.brandAdded)
      })
      const resp = await fetch(request)
      if (resp.status !== 200) {
        alert("Что-то пошло не так!")
      } else {
        alert("Успешно!")
        window.location.href = '/'
      }
    }
  },
  async created() {
    this.loading = true
    await this.checklogin()
    let input = document.querySelectorAll('input')
    for (let i = 0; i < input.length; i++) {
      input[i].setAttribute('size', input[i].getAttribute('placeholder').length);
    }
    this.loading = false
  }
}
</script>

<template>
  <button>
    <router-link to="/">
      Вернуться
    </router-link>
  </button>
  <div class="firstrow">
    <div class="coreinfo">
      <input type="text" v-model.trim="brandAdded.name" placeholder="Введите название">
      <input type="text" v-model.trim="brandAdded.description" placeholder="Введите описание">
      <input type="text" v-model.trim="brandAdded.location" placeholder="Введите место">
    </div>
    <div class="ownersinfo">
      <div class="owner" v-for="owner in owners">
        <input type="text" v-model.trim="owner.person.name" placeholder="Введите имя">
        <input type="text" v-model.trim="owner.person.surname" placeholder="Введите фамилию">
        <input type="text" v-model.trim="owner.person.fathername" placeholder="Введите отчество">
        <input type="text" v-model.trim="owner.person.bioInfo" placeholder="Введите доп. информацию (по желанию)">
      </div>
      <button @mousedown="owners.push({person: {name: '', surname: '', fathername: '', bioInfo: '', history: []}})">
        Добавить владельца
      </button>
      <button @mousedown="owners.splice(-1)">
        Удалить владельца
      </button>
    </div>
    <div class="contactsinfo">
      <input type="text" v-model.trim="contact.link" placeholder="Введите контакт (телеграм, почта, ...)"
             v-for="contact in contacts">
      <button @mousedown="contacts.push({typeOf: 0, link: ''})">
        Добавить контакт
      </button>
      <button @mousedown="contacts.splice(-1)">
        Удалить контакт
      </button>
    </div>
  </div>
  <div class="secondrow">
    <div class="statinfo">
      <div class="onestat" v-for="stat in stats">
        <input type="text" v-model.trim="stat.name" placeholder="Название метрики">
        <input type="text" v-model.trim="stat.description" placeholder="Описание метрики">
        <input type="date" v-model.trim="stat.startPeriod" placeholder="Измерение проводились с">
        <input type="date" v-model.trim="stat.endPeriod" placeholder="Измерение проводилось до">
        <input type="number" v-model.trim="stat.value" placeholder="Введите значение">
      </div>
      <button @mousedown="stats.push({name: '', description: '', startPeriod: null, endPeriod: null, value: null})">
        Добавить метрику
      </button>
      <button @mousedown="stats.splice(-1)">
        Удалить метрику
      </button>
    </div>
    <div class="prodinfo">
      <div class="oneprod" v-for="prod in products">
        <input type="text" v-model.trim="prod.name" placeholder="Название продукта">
        <input type="text" v-model.trim="prod.description"
               placeholder="Описание продукта(достоинства, особенности, ...)">
        <input type="number" v-model.trim="prod.price.lowEnd" placeholder="Цены начинаются от">
        <input type="number" v-model.trim="prod.price.highEnd" placeholder="Цены до">
      </div>
      <button
          @mousedown="products.push({name: '', description: '', price: {lowEnd: null, highEnd: null, currency: 'рублей'}})">
        Добавить продукт
      </button>
      <button @mousedown="products.splice(-1)">
        Удалить продукт
      </button>
    </div>
    <button @mousedown="addBrand">
      Подтвердить
    </button>
  </div>
</template>

<style scoped>

.firstrow {
  display: flex;
  flex-direction: row;
}

.secondrow {
  display: flex;
  flex-direction: row;
  margin-top: 10px;
}

.coreinfo {
  display: flex;
  flex-direction: column;
  margin-right: 10px;
}

.ownersinfo {
  margin-right: 10px;
}

.owner {
  display: flex;
  flex-direction: column;
}

.contactsinfo {
  display: flex;
  flex-direction: column;
}

.onestat {
  display: flex;
  flex-direction: column;
}

.prodinfo {
  margin-left: 10px;
}

.oneprod {
  display: flex;
  flex-direction: column;
}

input {
  padding-top: 5px;
  padding-bottom: 5px;
  width: auto;
}

</style>