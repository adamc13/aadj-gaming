<template>
  <div>
    <div class="flex flex-row justify-between">
      <h3 class="m-0"></h3>

      <i v-if="expandable"
         :class="`pi pi-${expanded ? 'minus' : 'plus'}`" style="font-size: 2rem"/>
    </div>

<!--    <Checkbox v-for="(" -->
<!--              :value="" :binary="true" />-->
  </div>
</template>

<script>
  export default {
    name: 'FilterSet',

    props: {
      title: {
        type: String,
        required: true
      },
      expandable: Boolean,
      selected: {
        type: Array,
        required: true
      },
      options: {
        type: Array,
        required: true
      }
    },

    data() {
      return {
        expanded: !this.expandable
      }
    }
  }
</script>

<style scoped>

</style>