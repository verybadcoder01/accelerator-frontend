<script>
import config from "../../assets/config.js";

export default {
  data() {
    return {
      name: '',
      surname: '',
      login: '',
      password: '',
    }
  },
  methods: {
    async Register() {
      const request = new Request(config.BACKEND_LINK + "/api/users/register", {
        method: "POST",
        body: JSON.stringify({
          "name": this.name,
          "surname": this.surname,
          "email": this.login,
          "password": this.password
        })
      })
      const resp = await fetch(request)
      if (resp.status !== 200) {
        alert(resp.status)
      } else {
        alert("Успешно!")
        window.location.href = '/'
      }
    }
  }
}

</script>

<template>
  <div class="regwindow">
    <input type="text" v-model.trim="name" placeholder="Введите имя">
    <input type="text" v-model.trim="surname" placeholder="Введите фамилию">
    <input type="text" v-model.trim="login" placeholder="Введите почту">
    <input type="text" v-model.trim="password" placeholder="Придумайте пароль">
    <button @mousedown="Register">
      Подтвердить
    </button>
    <button>
      <router-link to="/">
        Вернуться
      </router-link>
    </button>
  </div>
</template>

<style scoped>

.regwindow {
  display: flex;
  flex-direction: column;
}

input {
  padding-bottom: 5px;
  padding-top: 5px;
  width: auto;
  height: auto;
}

button {
  padding-bottom: 5px;
  padding-top: 5px;
  width: auto;
  height: auto;
}

</style>