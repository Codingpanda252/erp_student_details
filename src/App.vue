<template>
  <div id="app">
    <div class="container">
      <header class="header">
        <h1 class="title">ERP Student Details</h1>
        <div class="search-bar">
          <input type="text" v-model="searchKeyword" placeholder="Search..." />
          <i class="fas fa-search"></i> 
        </div>
      </header>
      <main class="main">
        <div class="toolbar">
          <div class="sort-by">
            <label for="sortBy">Sort By:</label>
            <select id="sortBy" v-model="sortKey" class="select-dropdown">
              <option value="">Select</option>
              <option v-for="field in fields" :value="field.toLowerCase()" :key="field">
                {{ field }}
              </option>
            </select>
          </div>
        </div>
        <div class="table-container">
          <table class="table">
            <thead>
              <tr>
                <th v-for="field in fields" :key="field" @click="sortColumn(field.toLowerCase())">
                  {{ field }}
                  <span v-if="sortKey === field.toLowerCase()" class="sort-arrow">
                    {{ sortOrders[sortKey] === 1 ? '▼' : '▲' }}
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, index) in sortedData" :key="index" class="table-row" @click="selectRow(index)">
                <td v-for="(field, key) in row" :key="key">{{ field }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
    <footer class="footer">
      <div class="footer-content">
        <p class="footer-text">College ERP for MAIT</p>
        <p class="footer-text">Made by ERP group</p>
        <p class="footer-text">&copy; 2024 All rights reserved</p>
      </div>
    </footer>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      allData: [],
      searchKeyword: "",
      sortKey: "",
      sortOrders: {},
      selectedRow: null,
      fields: [
        "Roll No",
        "Name",
        "Subject ID",
        "Credits",
        "Internal No",
        "External No",
        "Total",
        "Semester",
        "SID",
        "Category",
        "Decision Date",
        "Batch",
        "Exam"
      ]
    };
  },
  computed: {
    sortedData() {
      return this.sortData(this.filteredData);
    },
    filteredData() {
      let filtered = this.allData;
      if (this.searchKeyword) {
        filtered = filtered.filter(row => {
          for (let field of this.fields) {
            const fieldValue = row[field.toLowerCase()];
            if (typeof fieldValue === 'string' && fieldValue.toLowerCase().includes(this.searchKeyword.toLowerCase())) {
              return true;
            }
          }
          return false;
        });
      }
      return filtered;
    }
  },
  methods: {
    fetchData() {
      axios
        .get("http://localhost:3000/data")
        .then(response => {
          this.allData = response.data;
        })
        .catch(error => {
          console.error("Error fetching data:", error);
        });
    },
    sortData(data) {
      if (!this.sortKey) return data;

      return data.sort((a, b) => {
        const fieldA = (typeof a[this.sortKey.toLowerCase()] === 'string' ? a[this.sortKey.toLowerCase()] : '').toLowerCase();
        const fieldB = (typeof b[this.sortKey.toLowerCase()] === 'string' ? b[this.sortKey.toLowerCase()] : '').toLowerCase();
        return (fieldA < fieldB ? -1 : 1) * this.sortOrders[this.sortKey];
      });
    },
    sortColumn(key) {
      if (this.sortKey === key) {
        this.sortOrders[key] *= -1;
      } else {
        this.sortKey = key;
        this.sortOrders[key] = 1;
      }
    },
    selectRow(index) {
      this.selectedRow = index;
    }
  },
  created() {
    this.fetchData();
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  background-color: #111827; 
  color: #fff;
  padding: 20px;
  margin-bottom: 0;
  position: relative;
}

.title {
  margin: 0;
  font-size: 32px; 
}

.search-bar {
  position: relative;
  width: 100%;
}

.search-bar input {
  width: calc(100% - 40px);
  padding: 14px 20px; 
  margin-top: 10px;
  border: none;
  border-radius: 25px; 
  font-size: 18px; 
  background-color: #f0f4f8; 
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.search-bar i {
  position: absolute;
  top: 50%;
  right: 20px; 
  transform: translateY(-50%);
  color: #6b7280; 
  font-size: 20px;
}

.main {
  flex: 1;
  padding: 20px;
}

.toolbar {
  margin-bottom: 20px;
}

.sort-by {
  margin-right: 20px;
}

.select-dropdown {
  padding: 12px 20px;
  font-size: 18px; 
  border: none;
  border-radius: 25px; 
  background-color: #f0f4f8;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
  color: #6b7280; 
}

.table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  border: 4px solid #1f2937; 
}

.table th,
.table td {
  border: 4px solid #1f2937; 
  padding: 14px; 
  position: relative;
}

.table th {
  background-color: #e2e8f0; 
  cursor: pointer;
  font-size: 18px; 
  transition: background-color 0.3s ease; 
}

.sort-arrow {
  position: absolute;
  right: 10px; 
  top: 50%;
  transform: translateY(-50%);
  color: #6b7280; 
}

.table th:hover {
  background-color: #cbd5e1; 
}

.table-row {
  cursor: pointer;
}

.table-row:hover {
  background-color: #f0f4f8; 
}

.footer {
  background-color: #111827; 
  color: #fff;
  padding: 20px;
  margin-top: auto; 
}

.footer-content {
  text-align: center;
}

.footer-text {
  margin: 8px 0; 
  font-size: 18px;
}


@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');
</style>
