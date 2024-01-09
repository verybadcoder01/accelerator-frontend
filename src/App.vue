<script setup>
import LoginButton from "@/components/LoginButton.vue";
import {onMounted} from "vue";
import SearchBar from "@/components/SearchBar.vue";
import BrandTable from "@/components/BrandTable.vue";

onMounted(() => {
  document.title = "SHVB-Frontend"
})
</script>

<template>
  <div class="flex-header">
    <div class="flex-child">
      <h1 id="title">Цифровая платформа</h1>
    </div>
    <div class="flex-child">
      <LoginButton/>
    </div>
  </div>
  <SearchBar/>
  <BrandTable/>
</template>

<style>
#app {
  box-sizing: border-box;
  padding: 0;
  font-family: 'Montserrat', serif;
  max-width: 1000px;
  margin: auto;
  left: 50%;
}

.flex-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: nowrap;
}

.flex-child {
  flex-shrink: 1;
  padding: 1px;
}

.flex-child:nth-child(1) {
  flex-grow: 1
}

</style>
