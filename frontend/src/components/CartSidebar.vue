<template>
  <div class="cart-sidebar flex flex-col"
       style="height: 100%">
    <div style="overflow-y: auto; flex: 1; padding-left: 1rem; padding-right: 1rem;">
      <CartLineItem v-for="(cartItem, index) in cartItems"
                    :key="index"
                    :cart-item="cartItem"
                    class="pt-5 pb-5"
                    :style="index < cartItems.length - 1 ? 'border-bottom: solid 1px #f6f6f6;' : null"/>

      <h4 v-if="!cartItems.length"
          class="text-center mt-7"> No items in cart </h4>
    </div>

    <div class="pt-4"
         style="border-top: solid 1px #f6f6f6; padding-left: 1rem; padding-right: 1rem;">
      <div class="flex flex-row justify-between mb-4">
        <h3 class="m-0" style="color: var(--text-color-secondary)"> Total </h3>
        <h3 class="m-0"> {{ cartTotalPrice }} </h3>
      </div>
      <Button label="Proceed to checkout"
              class="mb-3 p-button-info"
              :loading="checkingOut"
              style="height: 35px; width: 100%"
              @click="checkout"/>
<!--      <Button label="Continue shopping"-->
<!--              class="p-button-info"-->
<!--              style="height: 35px; width: 100%"/>-->
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import CartLineItem from './CartLineItem.vue';

  export default {
    name: 'CartSidebar',

    components: { CartLineItem },

    data() {
      return {
        host: 'http://localhost:3000',
        checkingOut: false
      }
    },

    computed: {
      cart() {
        return this.$store.state.cart;
      },

      cartItems() {
        return Object.values(this.cart.items);
      },

      cartTotalPrice() {
        return `$${(this.cart.totalPrice / 100)}`;
      }
    },

    methods: {
      checkout() {
        if (this.checkingOut) return;
        this.checkingOut = true;
        axios.post(`${this.host}/checkout`, { data: { items: this.cartItems } })
          .then(response => {
            console.log(response);
          })
          .finally(() => this.checkingOut = false);
      }
    }
  }
</script>

<style scoped lang="scss">
  .cart-sidebar {
    height: 100%;
    //padding: 1rem 0;
  }
</style>