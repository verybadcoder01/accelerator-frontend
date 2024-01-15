<script>
export default {
  data() {
    return {
      name: ''
    }
  },
  mounted() {
    this.name = localStorage.getItem('token');
  }
}
</script>

<template>
<div>
  <h2>Здравствуйте, {{ name }}!</h2>
</div>
</template>

<style scoped>

</style>