<template>
  <table class="table">
    <thead>
      <tr>
        <th>Name</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.id">
        <td>{{ item.name }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: ['items']
};
</script>

<style scoped>
/* Add scoped styling here */
</style>
