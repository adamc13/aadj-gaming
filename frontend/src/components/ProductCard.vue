<template>
  <Card class="product-card">
    <template #header>
      <div class="flex justify-center" width="100%" style="padding: 2rem 0 1rem 0">
        <img :src="metadata.image_url"
             style="height: 150px; width: 150px; margin: 0 auto; object-fit: contain"/>
      </div>
    </template>

<!--    <template #title>-->
<!--      <span style="color: black; font-size: 1.35rem"> {{ price }} </span>-->
<!--    </template>-->

<!--    <template #subtitle>-->
<!--      <span class="product-name" style="color: black;"> {{ product.name }} </span>-->
<!--    </template>-->

    <template #content>
      <div class="flex flex-row justify-between"
           style="width: 100%">
        <div class="mr-3">
          <span class="block"
                style="color: var(--text-color); font-size: 1.35rem; font-weight: bold; margin-bottom: 0.5rem"> {{ price }} </span>
          <span class="product-name" style="color: var(--text-color);"> {{ product.name }} </span>
        </div>

        <div class="flex flex-col">
          <Button :loading="addingToCart === 1"
                  :icon="addingToCart === 0 ? 'pi pi-shopping-cart' : 'pi pi-check'"
                  @click="addToCart"/>
        </div>
      </div>
    </template>

    <template #footer>
      <span v-if="!!metadata.release_date"
            style="color: gray;"> Release Date: {{ metadata.release_date }}
      </span>
<!--      <Button icon="pi pi-check" label="Save" />-->
<!--      <Button icon="pi pi-times" label="Cancel" class="p-button-secondary" style="margin-left: .5em" />-->
    </template>
  </Card>
</template>

<script>
  import moment from 'moment';
  export default {
    name: 'ProductCard',

    props: {
      product: {
        type: Object,
        required: true,
      }
    },

    data() {
      return {
        addingToCart: 0
      }
    },

    computed: {
      metadata() {
        return this.product.metadata;
      },

      price() {
        return `$${(this.metadata.price / 100)}`
      },

      // releaseDate() {
        // return this.metadata.release_date ? moment(this.metadata.release_date).format() : ''
      // }
    },

    methods: {
      addToCart() {
        if (this.addingToCart !== 0) return;

        this.addingToCart = 1;
        this.$store.state.cart.addToCart(this.product);
        setTimeout(() => this.addingToCart = 2, 500);
        setTimeout(() => this.addingToCart = 0, 2000);
      }
    }
  }
</script>

<style lang="scss">
  .product-card {
    //width: 17rem;
    min-width: 13rem;
    max-width: 19rem;
    width: 100%;
    height: 315px;
    flex: 0 0 100%;
    box-shadow: none !important;
    transition: box-shadow .3s;
  }

  .product-card .p-card-content {
    //display: none;
    padding: 0 !important;
  }

  .product-card {
    .p-card-subtitle {
      margin-bottom: 0 !important;
    }
  }

  .product-name {
    color: var(--text-color);
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* number of lines to show */
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .product-card:hover {
    box-shadow: 0 0 11px rgba(33,33,33,.2) !important;
  }
</style>