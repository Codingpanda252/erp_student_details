<template>
  <div class="mb-3">
    <input type="text" class="form-control" v-model="searchQuery" @input="handleSearch" placeholder="Search...">
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: ''
    };
  },
  methods: {
    handleSearch() {
      this.$emit('search', this.searchQuery);
    }
  }
};
</script>

<style scoped>
/* Add scoped styling here */
</style>
