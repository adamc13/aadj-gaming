<template>
  <div class="product-list card"
       style="padding-top: 0 !important;">
    <DataView :value="products"
              lazy
              :layout="layout"
              paginator
              :rows="30"
              :total-records="30 * numPages"
              @page="onPageChange($event)">
      <template #header>
        <div class="flex justify-between w-full" style="">
          <div style="text-align: left; width: auto">
            <Dropdown v-model="sortKey" :options="sortOptions" optionLabel="label" placeholder="Sort By Price"
                      @change="onSortChange($event)"/>
          </div>
        </div>
      </template>

      <template #grid="slotProps">
        <ProductCard :product="slotProps.data"/>
      </template>
    </DataView>
  </div>
</template>

<script>
  import ProductCard from '../components/ProductCard.vue';
  import axios from 'axios';

  export default {
    name: 'Home',

    components: { ProductCard },

    data() {
      return {
        host: 'http://localhost:3000',
        numPages: 1,
        productPages: [],
        productPageNumTokenMap: {},
        currentPage: 0,
        layout: 'grid',
        sortKey: null,
        sortOrder: null,
        sortField: null,
        sortOptions: [
          {label: 'Price High to Low', value: '!price'},
          {label: 'Price Low to High', value: 'price'},
        ]
      }
    },

    mounted() {
      if (!this.products.length) {
        this.getProducts();
      }
    },

    computed: {
      products() {
        return this.productPages[this.currentPage] || [];
      },
    },

    watch: {
      currentPage(page) {
        this.getProducts(page);
      }
    },

    methods: {
      getProducts(pageNum = 0, params = null) {
        if (this.productPages[pageNum]) return;

        params = Object.assign({}, params || {});
        if (pageNum > 0) {
          params.page = this.productPageNumTokenMap[pageNum];
        }
        axios.get(`${this.host}/products`, { params })
          .then(response => {
            console.log(response);
            if (response.data.has_more && response.data.next_page) {
              this.productPageNumTokenMap[pageNum + 1] = response.data.next_page;
              ++this.numPages;
            }

            this.productPages[pageNum] = response.data.data;
            // this.products = this.productPages[pageNum];
          });
      },

      onPageChange(event) {
        this.currentPage = event.page;
      },

      onSortChange(event){
        const value = event.value.value;
        const sortValue = event.value;

        if (value.indexOf('!') === 0) {
          this.sortOrder = -1;
          this.sortField = value.substring(1, value.length);
          this.sortKey = sortValue;
        }
        else {
          this.sortOrder = 1;
          this.sortField = value;
          this.sortKey = sortValue;
        }
      }
    }
  }
</script>

<style lang="scss">
  .card {
    background: #ffffff;
    padding: 2rem;
    box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
    border-radius: 4px;
    margin-bottom: 2rem;
  }

  .p-dropdown {
    width: 14rem;
    font-weight: normal;
  }

  .product-list .p-grid {
    gap: 10px 30px;
  }
</style>