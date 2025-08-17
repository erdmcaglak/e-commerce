<script setup>
  import {priceFixer} from "@/utils/utils"
  const quantity = defineModel('quantity')
  const emit = defineEmits(['removeTrigger'])
  const {setBasketItemCount} = inject('basketItemCount');

  const props = defineProps({
    small:{type:Boolean,default:false},
    image:{type:String,required:true},
    secondImage:{type:String,default:''},
    title:{type:String,required:true},
    src:{type:String,default:'#'},
    price:{type:[Number,String],required:true},
    oldPrice:{type:[Number,String],default:0},
    brand:{type:String,default:''},
    rate:{type:[String,Number],default:0},
    productId:{type:String,required:true},
    discount:{type:[String,Number],default:0},
    row:{type:Boolean,default:false},
    options:{type:Object},
    stock:{type:[Number,String]},
    hideEdit:{type:Boolean,default:false}
  })

  watch(quantity,()=>{
    quantity.value === 0 && emit('removeTrigger')
    setBasketItemCount();
  })
</script>

<template>
  <ClientOnly>
    <div class="cart-item-wrapper">
      <div class="cart-item-image-wrapper">
        <div class="first-image-wrapper">
          <ImageLoader :src="props.image" :alt="props.title"/>
        </div>
      </div>
      <div class="info-and-price-wrapper">
        <div class="cart-info-wrapper">
          <div v-if="!props.small" class="cart-item-brand">
            <p :class="props.small ? 'small-text' : ''"><b>{{ props.brand }}</b></p>
          </div>
          <div :class="['cart-item-title']" :style="props.small ? 'height:25px;-webkit-line-clamp:1;align-items:center' : ''">
            <p :class="props.small ? 'small-text' : ''">{{ props.title }}</p>
          </div>
        </div>
        <div class="quantity-and-price">
          <Quantity
            v-if="props.row && !props.hideEdit"
            v-model:model="quantity"
            :max="props.stock"
          />
          <div class="cart-item-price-wrapper">
            <div v-if="props.oldPrice" :class="['old-price',props.small ? 'small-text' : '']">
              {{ priceFixer(props.oldPrice) }}
            </div>
            <div :class="['price',props.oldPrice ? 'color-red' : '',props.small ? 'small-text' : '']">
              <span>
                {{ priceFixer(props.price) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<style lang="scss" scoped>

.cart-item-wrapper{
  @include d-flex(row,flex-start,center);
  border: 1px solid $white2;
  border-radius: 4px;
  padding: 6px 10px;
  gap: 8px;
  position: relative;
  
  .cart-item-image-wrapper{
    max-width: 120px;
    min-width: 120px;
    @include d-flex-center;
    position: relative;
    overflow: hidden;
    .first-image-wrapper{
      width: 120px;
      height: 120px;
      background-color: $white1;
      display: flex;
      img{
        object-fit: contain;
        width: 100%;
      }
    }
    .second-image-wrapper{
      height: 99%;
      @extend .first-image-wrapper;
      position: absolute;
      width: 99%;
      left: 50%;
      top: 50%;
      transform:translate(-50%,-50%);
      z-index: -1;
      background-color: $white1;
      img{
        object-fit: contain;
        width: 100%;
      }
    }
  }
  .small-text{
    font-size: 13px!important;
  }
  .info-and-price-wrapper{
    @include d-flex(row,flex-start,center);
    width: 100%;
    flex-wrap: wrap;
    gap: 15px;
    @media screen and (max-width:480px) {
      @include d-flex(column,flex-start,flex-start);
    }
    .cart-info-wrapper{
      @include d-flex(column,flex-start,stretch);
      flex: 1;
      margin-top: 6px;
      gap: 2px;
      .cart-item-brand{
        text-transform: capitalize;
        height: 25px;
        @include d-flex(row,flex-start,center);
        p{
          width: 100%;
          font-size: 18px;
          color: $dark10;
          text-align: left;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
        }
      }
      .cart-item-title{
        text-transform: capitalize;
        @include d-flex(row,flex-start,flex-start);
        height:25px;
        -webkit-line-clamp:1;
        align-items:center;
        gap: 4px;
        p{
          color: $dark10;
          font-size: 16px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
      }
      .row-reverse{
        @include d-flex(row-reverse,flex-end,center);
        .price{
          padding-bottom: 0!important;
          padding-right: 8px;
        }
      }
      .column{
        @include d-flex(column,flex-end,flex-start);
      }
    }
    .quantity-and-price{
      @include d-flex(row,flex-start,center);
      gap: 15px;
      @media screen and (max-width:600px) {
        @include d-flex(column,flex-start,flex-end);
      }
      @media screen and (max-width:480px) {
        @include d-flex(column,flex-start,flex-start);
      }
      .cart-item-price-wrapper{
        flex: 0;
        flex-wrap: wrap;
        min-height: 50px;
        min-width: 150px;
        @include d-flex(column,flex-end,flex-end);
        @media screen and (max-width:480px) {
          min-width: fit-content;
          @include d-flex(column,flex-start,flex-start);
        }
        .old-price{
          font-size: 16px;
          font-weight: 400;
          text-decoration: line-through;
          color: $gray7;
        }
        .price{
          font-size: 20px;
          color: $dark7;
          font-weight: 700;
          padding-bottom: 0!important;
        }
        .color-red{
          color: $red12!important;
        }
      }
    }
    
  }
  
}
</style>