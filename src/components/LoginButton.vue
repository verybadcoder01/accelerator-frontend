<script setup>

</script>


<template>
  <div id="btnDiv">
    <button id="regBtn" class="coolbutton" role="button">
      <router-link to="/register">
        Зарегестрироваться
      </router-link>
    </button>
    <button id="signBtn" class="coolbutton" role="button">
      <router-link to="/login">
        Войти
      </router-link>
    </button>
  </div>
</template>

<style scoped>
#regBtn {
  display: inline-block;
}

#signBtn {
  display: inline-block;
  margin: 3px;
}

.coolbutton {
  backface-visibility: hidden;
  background-color: #405cf5;
  border-radius: 6px;
  border-width: 0;
  box-shadow: rgba(50, 50, 93, .1) 0 0 0 1px inset, rgba(50, 50, 93, .1) 0 2px 5px 0, rgba(0, 0, 0, .07) 0 1px 1px 0;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  font-size: 100%;
  height: 44px;
  line-height: 1.15;
  margin: 12px 0 0;
  outline: none;
  overflow: hidden;
  position: relative;
  text-align: center;
  text-transform: none;
  transform: translateZ(0);
  transition: all .2s, box-shadow .08s ease-in;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.coolbutton:disabled {
  cursor: default;
}

.coolbutton:focus {
  box-shadow: rgba(50, 50, 93, .1) 0 0 0 1px inset, rgba(50, 50, 93, .2) 0 6px 15px 0, rgba(0, 0, 0, .1) 0 2px 2px 0, rgba(50, 151, 211, .3) 0 0 0 4px;
}
</style>