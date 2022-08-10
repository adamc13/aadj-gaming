<template>
  <Toolbar id="nav-bar"
           class="pt-4 pb-4"
           style="background: white; border: none; padding-left: 2rem; padding-right: 2rem">
    <template #start>
      <!--      <img alt="logo"-->
      <!--           src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png"-->
      <!--           height="30"-->
      <!--           class="mr-4">-->
      <h1 class="primary m-0 mr-6" style="margin-right: 2.2rem"> AADJ </h1>

<!--      <Button icon="pi pi-bars"-->
<!--              label="Menu"-->
<!--              class="p-button-secondary p-button-text mr-5"/>-->

      <span class="p-input-icon-left" style="width: 100%; max-width: 400px; display: block">
            <i class="pi pi-search"/>
            <InputText id="top-search-bar" type="text" v-model="searchQuery" placeholder="Search games, consoles & more"/>
        </span>
    </template>

    <template #end>
      <Button icon="pi pi-shopping-cart"
              :label="cart.numItems"
              class="p-button-outlined"
              aria:haspopup="true"
              aria-controls="overlay_panel"
              @click="toggle"/>

      <Sidebar v-model:visible="sidebarOpen"
               position="right"
               class="cart-sidebar-container"
               style="margin: 1rem; height: calc(100vh - 2rem); width: 400px;">
        <template #header>
          <div style="width: 100%">
            <h3 class="m-0"> My Cart </h3>
          </div>
        </template>
        <CartSidebar/>
      </Sidebar>
    </template>
  </Toolbar>

  <!--  <Menubar :model="items">-->
  <!--    <template #start>-->
  <!--      <img alt="logo"-->
  <!--           src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png"-->
  <!--           height="40"-->
  <!--           class="mr-2">-->
  <!--    </template>-->
  <!--    <template #end>-->
  <!--      <InputText placeholder="Search" type="text"/>-->
  <!--    </template>-->
  <!--  </Menubar>-->
</template>

<script>
  import CartSidebar from './CartSidebar.vue';

  export default {
    name: 'NavBar',
    components: { CartSidebar },
    data() {
      return {
        searchQuery: '',
        sidebarOpen: false
      }
    },

    computed: {
      cart() {
        return this.$store.state.cart;
      }
    },

    methods: {
      toggle(event) {
        this.sidebarOpen = true;
        // this.$refs.op.toggle(event);
      },
    }
  }
</script>

<style lang="scss">
  #nav-bar .p-toolbar-group-left {
    flex: 1;
  }

  #top-search-bar {
    width: 100%;
  }

  .cart-sidebar-container {
    .p-sidebar-header-content {
      width: 100%;
    }

    .p-sidebar-content {
      height: 100% !important;
      border-top: solid 1px #f6f6f6;
      padding: 0 !important;
    }
  }

</style>