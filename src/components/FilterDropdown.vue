<template>
  <div class="mb-3">
    <select class="form-control" v-model="selectedFilter" @change="handleFilter">
      <option value="">Select Filter</option>
    </select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedFilter: ''
    };
  },
  methods: {
    handleFilter() {
      this.$emit('filter', this.selectedFilter);
    }
  }
};
</script>

<style scoped>
/* Add scoped  stylinghere */
</style>
