

class Cart {
  static fromLocalStorage() {
    let cart = new Cart();
    try {
      let localCart = window.localStorage.getItem('cart');
      if (localCart) {
        let items = JSON.parse(localCart).items;
        Object.keys(items)
          .forEach(productId => items[productId] = new CartItem(items[productId].product, items[productId].quantity));
        cart.items = items;
      }
    } catch (e) {
      console.log(e)
      console.error('Failed to load cart');
    }

    return cart;
  }

  constructor() {
    this.items = {};
  }

  get numItems() {
    let total = 0;
    Object.values(this.items).forEach(cartItem => total += cartItem.quantity);

    return total;
  }

  get totalPrice() {
    let total = 0;
    Object.values(this.items).forEach(cartItem => total += cartItem.quantity * cartItem.product.metadata.price);

    return total;
  }

  toJSONString() {
    return JSON.stringify({
      items: this.items
    });
  }

  saveToLocalStorage(name = 'cart') {
    window.localStorage.setItem(name, this.toJSONString());
  }

  updateCart(product, quantity) {
    let cartItem = this.items[product.id];
    if (!cartItem) {
      if (quantity <= 0) return;

      cartItem = new CartItem(product);
    }

    if (quantity <= 0) {
      delete this.items[product.id];
    } else if (quantity < 4) {
      cartItem.quantity = quantity;
      this.items[product.id] = cartItem;
    }

    this.saveToLocalStorage();

    return cartItem;
  }

  addToCart(product) {
    return this.updateCart(product, this.items[product.id] ? this.items[product.id].quantity + 1 : 1);
  }

  removeFromCart(product) {
    this.updateCart(product, 0)
  }
}


class CartItem {
  constructor(product, quantity = 0) {
    this.product = product;
    this.quantity = Math.min(quantity, 3);
  }

  get id() {
    return this.product.id;
  }
}


export { Cart, CartItem }