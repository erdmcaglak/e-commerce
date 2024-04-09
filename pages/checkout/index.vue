<script setup>  
  import {ref} from 'vue'
  const basketProds = ref()
  onMounted(()=>{
    basketProds.value = window.localStorage.getItem('basket-items') ? JSON.parse(window.localStorage.getItem('basket-items')) : undefined
  })
</script>

<template>
  <div class="basket-page-wrapper container-main">
    <div class="products-and-info">
      <template v-if="basketProds">
        <div class="basket-products">
          <Cart
            v-for="(basketItem,i) in basketProds"
            :key="'basketItem' +i"
            row
            v-model:quantity="basketItem.quantity"
            :stock="basketItem.item.stock"
            :options="basketItem.options"
            :image="basketItem.item.images[0]"
            :secondImage="basketItem.item.images[1] || ''"
            :brand="basketItem.item.brand || ''"
            :title="basketItem.item.title"
            :price="basketItem.item.price"
            :oldPrice="basketItem.item.oldPrice || 0"
            :discount="basketItem.item.discountPercentage || 1"
            :productId="basketItem.item.id.toString()"
          />
        </div>
        <div class="basket-summary">

        </div>
      </template>
      <template v-else>
        <div class="not-found">
          Your basket is currently empty
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss">
.basket-page-wrapper{
  height: 10000px;
  @include d-flex(column,flex-start,stretch);
  .products-and-info{
    @include d-flex(row,flex-start,flex-start);
    .basket-products{
      flex: 7 0 1px;
      @include d-flex(column,flex-start,stretch);
    }
    .basket-summary{
      border: 1px solid red;
      flex: 3 0 1px;
      @include d-flex(column,flex-start,stretch);
    }
    .not-found{
      width: 100%;
      @include d-flex-center;
      text-align: center;
      font-size: 36px;
      font-weight: 700;
      color: $dark13;
      padding: 50px 0;
      background-color: $white2;
      border-radius: 4px;
    }
  }
}
</style>