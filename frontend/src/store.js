import { createStore } from 'vuex'
import { Cart, CartItem } from './cart';


// Create a new store instance.
const store = createStore({
  state() {
    return {
      cart: Cart.fromLocalStorage()
    }
  },

  mutations: {
    saveCart({ state }) {
      state.cart.saveToLocalStorage();
    }
  }
})


export { store };