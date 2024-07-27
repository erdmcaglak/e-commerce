<script setup>
  import {priceFixer} from "@/utils/utils"
  const quantity = defineModel('quantity')
  const emit = defineEmits(['removeTrigger'])

  const props = defineProps({
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

  const removeTriggerFunc = () =>{
    emit('removeTrigger')
  }
</script>

<template>
  <ClientOnly>
    <NuxtLink :to="!props.row ? '/product/'+props.productId : ''" :class="['cart-item-wrapper',props.row ? 'row' : '']">
      <div v-if="props.discount && props.oldPrice && !props.row" class="cart-item-badge">
        %{{ Math.round(props.discount) }}
      </div>
      <div class="cart-item-image-wrapper">
        <NuxtLink :to="props.row ? '/product/'+props.productId : ''" class="first-image-wrapper">
          <img loading="lazy" :src="props.image" :alt="props.title">
        </NuxtLink>
        <div v-if="props.secondImage && !props.row" class="second-image-wrapper">
          <img loading="lazy" class="second-image" :src="props.secondImage" :alt="props.title">
        </div>
      </div>
      <div class="cart-info-wrapper px8">
        <div class="names-wrapper">
          <div class="cart-item-brand">
            <p><b>{{ props.brand }}</b></p>
          </div>
          <NuxtLink :to="props.row ? '/product/'+props.productId : ''" class="cart-item-title">
            <p>{{ props.title }} <span v-if="props.row && props.options?.size">{{props.options.size.title}}</span></p>
          </NuxtLink>
          <div v-if="props.row && props.options?.color" class="cart-item-color">
            Color: 
            <div class="color-div" :style="{backgroundColor:props.options?.color.value}"></div>
          </div>
        </div>
        <div class="quantity-and-price">
          <Quantity
            v-if="props.row && !props.hideEdit"
            v-model:model="quantity"
            :max="props.stock"
            :min="1"
          />
          <div class="cart-item-price-wrapper">
            <div v-if="props.oldPrice && (!props.row || !props.hideEdit)" class="old-price">
              {{ priceFixer(props.oldPrice) }}
            </div>
            <div :class="['price',props.oldPrice && !props.row ? 'color-red' : '']">
              <span v-if="!props.row">
                {{ priceFixer(props.price) }}
                 
              </span>
              <span v-else>
                {{ priceFixer(parseFloat((props.price * props.quantity).toFixed(2))) }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <!-- <Button
        v-if="props.row && !props.hideEdit"
        icon="mdi:delete-outline"
        fontSize="24px"
        fontColor="#FF0505"
        text
        hoveredBackground="#FFCCCC"
        background="transparent"
        hoveredColor="#CC0000"
        padding="6px"
        rounded="999px"
        @clickTrigger="removeTriggerFunc"
      /> -->
    </NuxtLink>
  </ClientOnly>
  
</template>

<style lang="scss" scoped>
.cart-item-wrapper{
  @include d-flex(column,flex-start,flex-start);
  border: 1px solid $white2;
  
  padding: 4px;
  gap: 8px;
  position: relative;
  .cart-item-badge{
    position: absolute;
    top: 0;
    left: 0;
    padding: 8px 10px;
    background-color: $red12;
    color: $white3;
    z-index: 2;
    font-size: 14px;
    min-width: 50px;
    font-weight: 600;
    text-align: center;
    &::after{
      content:"";
      position: absolute;
      height: 100%;
      width: 20px;
      left: 99%;
      top: 0;
      clip-path: polygon(50% 0, 15% 50%, 50% 100%, 0 100%, 0 50%, 0 0);
      background-color: $red12;
      
    }
  }
  .cart-item-image-wrapper{
    cursor: pointer;
    width: 100%;
    @include d-flex-center;
    max-height: 300px;
    min-height: 300px;
    height: 300px;
    position: relative;
    overflow: hidden;
    @media screen and (max-width:768px) {
      max-height: 200px;
      min-height: 200px;
      height: 200px;
    }
    &:hover{
      .second-image-wrapper{
        z-index: 1;
        width: 100%;
        height: 100%;
      }
      .first-image-wrapper{
        width: 99%;
        height: 99%;
      }
    }
    .first-image-wrapper{
      width: 100%;
      height: 100%;
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
  .cart-info-wrapper{
    @include d-flex(column,flex-start,stretch);
    width: 100%;
    margin-top: 6px;
    gap: 4px;
    .cart-item-brand{
      text-transform: capitalize;
      height: 45px;
      @include d-flex(row,flex-start,center);
       display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      p{
        width: 100%;
        font-size: 18px;
        color: $dark10;
        text-align: left;
      }
    }
    .cart-item-title{
      text-transform: capitalize;
      cursor: pointer;
      @extend .cart-item-brand;
      min-height: 50px;
      @include d-flex(row,flex-start,flex-start);
      gap: 4px;
      &:hover{
        text-decoration: underline;
      }
      p{
        color: $dark10;
        font-size: 16px;
      }
    }
    .cart-item-price-wrapper{
      min-height: 50px;
      @include d-flex(column,flex-end,flex-start);
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
        padding-bottom: 8px;
      }
      .color-red{
        color: $red12!important;
      }
    }
  }
}

.row{
  flex-direction:row!important;
  align-items:center!important;
  border: none!important;
  .cart-item-image-wrapper{
    max-height: 100px!important;
    min-height: 100px!important;
    min-width: 100px!important;
    max-width: 100px!important;
    height: 100px!important;
    width: 100px!important;
    &:hover{
      .first-image-wrapper{
        width:100%!important;
        height: 100%!important;
      }
    }
  }
  .cart-info-wrapper{
    flex-direction: row!important;
    justify-content: space-between!important;
    align-items: center!important;
    @media screen and (max-width:1024px) {
      flex-direction: column!important;
      align-items: flex-start!important;
    }
    .names-wrapper{
      width: 250px;
      max-width: 250px;
      min-width: 250px;
      @media screen and (max-width:480px) {
        width: unset!important;
        max-width: unset!important;
        min-width: unset!important;
      }
      .cart-item-brand,.cart-item-title{
        height: fit-content!important;
        min-height: unset!important;
        padding: 3px 0;
        p{
          width: fit-content!important;
        }
      }
      .cart-item-color{
        font-size: 14px;
        @include d-flex(row,flex-start,center);
        gap: 4px;
        font-weight: 700;
        .color-div{
          width: 30px;
          height: 15px;
          border-radius: 4px;
        }
      }
    }
    .quantity-and-price{
      @include d-flex(row,flex-start,center);
      @media screen and (max-width:480px) {
        flex-wrap: wrap;
      }
      .cart-item-price-wrapper{
        min-width: 100px!important;
        align-items: center!important;
        justify-content: center!important;
        @media screen and (max-width:400px) {
          align-items:flex-start!important;
          padding: 5px 0;
        }
        .price{
          padding:0!important;
        }
      }
    }
    
    
  }
}
</style>