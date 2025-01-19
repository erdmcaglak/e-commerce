<script setup>  
  import {ref,watch,computed} from 'vue'
  import {priceFixer,getProducts} from "@/utils/utils"
  const basketProds = ref([]);
  const discountCoupon = ref('');
  const basketWidgetProds = await getProducts();
  const router = useRouter();

  watch(basketProds,(newVal,oldVal)=>{
    if(!oldVal) return;
    
    window.localStorage.setItem('basket-items',JSON.stringify(newVal || []));
  },{
    deep:true
  })

  onMounted(()=>{
    basketProds.value = window.localStorage.getItem('basket-items') ? JSON.parse(window.localStorage.getItem('basket-items')) : undefined
  })

  const getSubTotal = computed(() => {
    return basketProds.value.reduce((a,b) => a + parseFloat((b.quantity * b.item.price).toFixed(2)) ,0)
  })

  const calculateDelivery = computed(()=>{
    let totalOldPrice = basketProds.value.reduce((a,b) => a + parseFloat(b.item.oldPrice) ,0)
    let totalPrice = basketProds.value.reduce((a,b) => a + parseFloat(b.item.price) ,0)

    return parseFloat(((totalOldPrice - totalPrice) / (basketProds.value.length + 1)).toFixed(2))
  })

  const getGrandTotal = computed(()=>{
    return (getSubTotal.value + calculateDelivery.value)
  })

  const removeItemFromBasket = (index) =>{
    basketProds.value.splice(index,1);
  }

  const checkout = () =>{
    router.push('/checkout')
  }
</script>

<template>
  <div class="basket-page-wrapper container-main">
    <div v-if="basketProds.length > 0" class="basket-header">
      Your Basket
    </div>
    <div class="products-and-info">
      <template v-if="basketProds.length > 0">
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
            @removeTrigger="removeItemFromBasket(i)"
          />
        </div>
        <Divider vertical/>
        <div class="basket-summary">
          <div class="discount-coupon">
            <div class="title">
              Discount coupon
            </div>
            <Input 
              borderColor="#B3B3B3"
              label="Discount"
              v-model:model="discountCoupon"
              rounded
              textColor="#323232"
            />
          </div>
          <div class="summary-info">
            <div class="summary-header">
              Order Summary
            </div>
            <div class="sub-total price-info">
              <span class="title">Sub Total</span>
              <span class="price">{{priceFixer(getSubTotal)}}</span>
            </div>
            <div class="delivery-total price-info">
              <span class="title">Delivery</span>
              <span class="price">{{priceFixer(calculateDelivery)}}</span>
            </div>
            <div class="grand-total price-info">
              <span class="title">Total</span>
              <span class="price">{{priceFixer(getGrandTotal)}}</span>
            </div>
          </div>
          <Button
            title="Checkout Now"
            rounded="4px"
            fontSize="24px"
            background="#00CC00"
            borderColor="#00CC00"
            hoveredBackground="#00E600"
            fontColor="#fff"
            @clickTrigger="checkout"
          />
        </div>
      </template>
      <template v-else>
        <div class="not-found">
          Your basket is currently empty
        </div>
      </template>
    </div>
    <Divider/>
    <Slider
      sliderTitle="Complemantary Products"
      :sliderList="basketWidgetProds"
    />
  </div>
</template>

<style lang="scss">
.basket-page-wrapper{
  @include d-flex(column,flex-start,stretch);
  gap: 20px;
  .basket-header{
    @include d-flex(row,flex-start,center);
    font-size: 30px;
    font-weight: 500;
    color: $dark13;
  }
  .products-and-info{
    @include d-flex(row,flex-start,flex-start);
    gap: 40px;
    @media screen and (max-width:1024px) {
      flex-direction: column;
    }
    .basket-products{
      flex: 7 0 1px;
      @include d-flex(column,flex-start,stretch);
      @media screen and (max-width:1024px) {
        flex: unset;
        width: 100%!important;
      }
    }
    .basket-summary{
      flex: 3 0 1px;
      @include d-flex(column,flex-start,stretch);
      padding: 10px 0;
      gap: 20px;
      @media screen and (max-width:1024px) {
        flex: unset;
        width: 100%!important;
      }
      .summary-info{
        @include d-flex(column,flex-start,stretch);
        .summary-header{
          @include d-flex(row,flex-start,center);
          text-align: left;
          font-size: 20px;
          text-transform: capitalize;
          font-weight: 700;
          color: $dark13;
          padding: 10px 0;
          border-bottom: 1px solid $gray1;
        }
        .price-info{
          @include d-flex(row,space-between,center);
          padding: 8px 5px;
          .title{
            font-weight: 700;
            color: $dark13;
            font-size: 16px;
          }
          .price{
            font-size: 16px;
            font-weight: 500;
            color: $dark6;
          }
        }
        .grand-total{
          .title{
            font-weight: 700;
            color: $dark13;
            font-size: 22px;
          }
          .price{
            font-size: 22px;
            font-weight: 700;
            color: $dark10;
          }
        }
      }
      .discount-coupon{
        @include d-flex(column,flex-start,flex-start);
        width: 100%;
        gap: 10px;
        .title{
          width: 100%;
          @include d-flex(row,flex-start,center);
          text-align: left;
          font-size: 20px;
          text-transform: capitalize;
          font-weight: 700;
          color: $dark13;
          padding: 10px 0;
          border-bottom: 1px solid $gray1;
        }
      }
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