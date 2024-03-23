<script setup>
  const props = defineProps({
    image:{
      type:String,
      required:true
    },
    secondImage:{
      type:String,
      default:''
    },
    title:{
      type:String,
      required:true
    },
    src:{
      type:String,
      default:'#'
    },
    price:{
      type:[Number,String],
      required:true
    },
    oldPrice:{
      type:[Number,String],
      default:0
    },
    brand:{
      type:String,
      default:''
    },
    rate:{
      type:[String,Number],
      default:0
    },
    productId:{
      type:String,
      required:true
    },
    discount:{
      type:[String,Number],
      default:0
    }
  })

  const priceFixer = (price)=>{
    return '$' + parseFloat(price).toFixed(2).replace('.',',');
  } 

  const isHaveBadge = computed(() => {
    return !!(Math.random()*100 < 25)
  })
</script>

<template>
  <div class="cart-item-wrapper">
    <div v-if="props.discount" class="cart-item-badge">
      %{{ Math.round(props.discount) }}
    </div>
    <div class="cart-item-image-wrapper">
      <div class="first-image-wrapper">
        <img loading="lazy" :src="props.image" :alt="props.title">
      </div>
      <div v-if="props.secondImage" class="second-image-wrapper">
        <img loading="lazy" class="second-image" :src="props.secondImage" :alt="props.title">
      </div>
    </div>
    <div class="cart-info-wrapper px8">
      <div class="cart-item-brand">
        <p><b>{{ props.brand }}</b></p>
      </div>
      <div class="cart-item-title">
        <p>{{ props.title }}</p>
      </div>
      <div class="cart-item-price-wrapper">
        <div v-if="props.oldPrice" class="old-price">
          {{ priceFixer(props.oldPrice) }}
        </div>
        <div :class="['price',props.oldPrice? 'color-red' : '']">
          {{ priceFixer(props.price) }}
        </div>
      </div>
    </div>
  </div>
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
    @include d-flex(column,flex-start,flex-start);
    margin-top: 6px;
    gap: 4px;
    .cart-item-brand{
      text-transform: capitalize;
      height: 20px;
      @include d-flex(row,flex-start,center);
      p{
        font-size: 22px;
        color: $dark10;
        text-align: left;
      }
    }
    .cart-item-title{
      text-transform: capitalize;
      cursor: pointer;
      @extend .cart-item-brand;
      min-height: 50px;
      &:hover{
        text-decoration: underline;
      }
      p{
        color: $dark10;
        font-size: 20px;
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
</style>