<script setup>
  import {priceFixer} from "@/utils/utils"

  defineEmits(['click'])

  const props = defineProps({
    small:{type:Boolean,default:false},
    image:{type:String,required:true},
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
    hideEdit:{type:Boolean,default:false},
    class:{type:String,default:''}
  })
</script>

<template>
  <ClientOnly>
    <NuxtLink :to="'/product/'+props.productId" :class="['cart-item-wrapper',props.class]" @click="$emit('click')">
      <div v-if="Math.round((props.discount || 0)) > 0 && props.oldPrice && !props.small" class="cart-item-badge">
        %{{ Math.round(props.discount) }}
      </div>
      <div :class="['cart-item-image-wrapper',props.small ? 'small-image' : 'normal-image']">
        <div class="first-image-wrapper">
          <ImageLoader :src="props.image" :alt="props.title"/>
        </div>
        <!-- <div v-if="props.secondImage" class="second-image-wrapper">
          <ImageLoader :src="props.secondImage" :alt="props.title"/>
        </div> -->
      </div>
      <div :class="['cart-info-wrapper',props.small ? 'px4' : 'px8']" :style="props.small ? 'gap:2px' : ''">
        <div v-if="!props.small" class="cart-item-brand">
          <p :class="props.small ? 'small-text' : ''"><b>{{ props.brand }}</b></p>
        </div>
        <div :class="['cart-item-title']" :style="props.small ? 'height:25px;-webkit-line-clamp:1;align-items:center' : ''">
          <p :class="props.small ? 'small-text' : ''">{{ props.title }}</p>
        </div>
        <div :class="['cart-item-price-wrapper',props.small ? 'row-reverse' : 'column']" :style="props.small ? 'min-height:40px' : ''">
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
    </NuxtLink>
  </ClientOnly>
</template>

<style lang="scss" scoped>

.cart-item-wrapper{
  @include d-flex(column,flex-start,flex-start);
  border: 1px solid $white2;
  border-radius: 4px;
  padding: 4px;
  gap: 8px;
  position: relative;
  transition: all .2s ease;
  &:hover{
    @include box-shadow(0,2px,16px,-8px,rgba(0,0,0));
  }
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
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
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
  .small-image{
    max-height: 150px;
    min-height: 150px;
    height: 150px;
    @media screen and (max-width:768px) {
      max-height: 100px;
      min-height: 100px;
      height: 100px;
    }
  }
  .normal-image{
    max-height: 300px;
    min-height: 300px;
    height: 300px;
    @media screen and (max-width:768px) {
      max-height: 200px;
      min-height: 200px;
      height: 200px;
    }
  }
  .cart-item-image-wrapper{
    cursor: pointer;
    width: 100%;
    @include d-flex-center;
    position: relative;
    overflow: hidden;
    // @media (hover: hover){
    //   &:hover{
    //     .second-image-wrapper{
    //       z-index: 1;
    //       width: 100%;
    //       height: 100%;
    //     }
    //     .first-image-wrapper{
    //       width: 99%;
    //       height: 99%;
    //     }
    //   }
    // }
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
  .small-text{
    font-size: 13px!important;
  }
  .cart-info-wrapper{
    @include d-flex(column,flex-start,stretch);
    width: 100%;
    margin-top: 6px;
    gap: 4px;
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
      cursor: pointer;
      height: 50px;
      @include d-flex(row,flex-start,flex-start);
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
    .cart-item-price-wrapper{
      flex-wrap: wrap;
      min-height: 50px;
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