<template>
  <div class="cart-line-item flex flex-row">
    <div class="mr-3">
      <div >
        <img :src="metadata.image_url"
             style="height: 75px; width: 75px; padding: 0.8rem; margin: auto 0; object-fit: contain; background-color: #f6f6f6; border-radius: 8px"/>
      </div>
    </div>

    <div class="flex flex-col" style="width: 100%">

      <div class="flex flex-row justify-between mb-4" style="width: 100%">

        <div>
          <div class="mb-3">
            <span class="block mb-2" style="font-size: 0.75rem; opacity: 0.7; text-transform: uppercase; color:var(--text-color-secondary)"> {{ metadata.category }}</span>
            <span style="color: var(--text-color); font-size: 1.15rem; font-weight: 400"> {{ product.name }} </span>
          </div>

          <div class="flex flex-row flex-wrap text-sm">
            <div v-for="(pro, index) in properties"
                 :key="index"
                 class="inline-block mr-2">
              <span style="color:var(--text-color-secondary); opacity: 0.7;"> {{ pro[0] }}: </span>
              <span> {{ pro[1] }}</span>
            </div>

          </div>
        </div>

        <div>
          <Button icon="pi pi-trash"
                  class="p-button-danger p-button-text p-button-sm"
                  @click="updateQuantity(0)"/>
        </div>
<!--        <i class="pi pi-trash" style="font-size: 1rem"></i>-->
      </div>

      <div class="flex flex-row justify-between">
        <div class="flex flex-row justify-between" style="height: 20px">
          <Button icon="pi pi-minus"
                  class="incr-btn p-button-secondary p-button-outlined p-button-sm mr-2"
                  :disabled="cartItem.quantity <= 0"
                  @click="updateQuantity(cartItem.quantity - 1)"/>

          <InputNumber id="horizontal"
                       :value="cartItem.quantity"
                       readonly
                       :step="1"
                       :min="-1"
                       :max="3"
                       inputStyle="width: 50px; height: 20px; font-size: 0.8rem; text-align: center"/>

          <Button icon="pi pi-plus"
                  class="incr-btn p-button-secondary p-button-outlined p-button-sm ml-2"
                  :disabled="cartItem.quantity >= 3"
                  @click="updateQuantity(cartItem.quantity + 1)"/>
        </div>

        <span class="block font-medium"
              style="color: var(--text-color); font-size: 0.95rem; line-height: 20px;"> {{ price }} </span>
      </div>
    </div>
  </div>
</template>

<script>
  import { CartItem } from '../cart.js';

  export default {
    name: 'CartLineItem',

    props: {
      cartItem: {
        type: CartItem,
        required: true
      }
    },

    computed: {
      cart() {
        return this.$store.state.cart;
      },


      product() {
        return this.cartItem.product;
      },

      metadata() {
        return this.product.metadata;
      },

      price() {
        return `$${((this.metadata.price * this.cartItem.quantity) / 100)}`;
      },

      properties() {
        return [
          ['Platform', this.metadata.platform],
          ['Edition', this.metadata.edition],
        ]
      },

      // releaseDate() {
      // return this.metadata.release_date ? moment(this.metadata.release_date).format() : ''
      // }
    },

    methods: {
      updateQuantity(quantity) {
        this.cart.updateCart(this.cartItem.product, quantity)
      }
    }
  }
</script>

<style lang="scss">
  .cart-line-item {
    width: 100%;
  }

  .incr-btn {
    height: 20px !important;
    width: 20px !important;
    border-color: #ced4da !important;
  }

  .incr-btn .p-button-icon {
    font-size: 0.5rem !important;
  }
</style>