<script setup>
import {onMounted, ref} from "vue";

onMounted(() => {
  document.title = "SHVB-Frontend"
})
</script>

<template>
  <router-view/>
</template>
