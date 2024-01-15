<script>
import config from "../../assets/config.js";

export default {
  data() {
    return {
      login: '',
      password: '',
    }
  },
  methods: {
    async Login() {
      const request = new Request(config.BACKEND_LINK + "/api/users/login", {
        method: "POST",
        body: JSON.stringify({
          "email": this.login,
          "password": this.password
        })
      })
      const resp = await fetch(request)
      if (resp.status === 403) {
        alert("Неверный пароль!")
      } else if (resp.status === 200) {
        alert("Успешно!")
        const session = await resp.json()
        window.localStorage.setItem('token', session.token)
        window.location.href = '/'
      } else {
        alert(resp.status)
      }
    }
  }
}
</script>

<template>
  <div class="loginwindow">
    <input type="text" v-model.trim="login" placeholder="Введите логин (почту)">
    <input type="text" v-model.trim="password" placeholder="Введите ваш пароль">
    <button @mousedown="Login">
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
.loginwindow {
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