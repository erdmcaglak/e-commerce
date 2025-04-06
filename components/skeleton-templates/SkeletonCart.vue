<script setup>
  import {priceFixer} from "@/utils/utils"

  const props = defineProps({
    small:{type:Boolean,default:false},
    class:{type:String,default:''}
  })
</script>

<template>
  <div class="cart-item-wrapper">
    <div :class="['cart-item-image-wrapper',props.small ? 'small-image' : 'normal-image']">
      <div class="first-image-wrapper">
        <LoadingSkeleton :class="props.class"/>
      </div>
    </div>
    <div :class="['cart-info-wrapper',props.small ? 'px4' : 'px8']" :style="props.small ? 'gap:2px' : ''">
        <div v-if="!props.small" class="cart-item-brand">
          <LoadingSkeleton :class="props.class"/>
        </div>
        <div :class="['cart-item-title']" :style="props.small ? 'height:25px;' : ''">
          <div style="display:flex;width:100%;gap:4px;align-items:center;" :style="props.small ? 'width:75%' : ''">
            <LoadingSkeleton :class="props.class" :style="props.small ? 'height:10px' : 'height:20px'"/>
            <LoadingSkeleton :class="props.class" :style="props.small ? 'height:10px' : 'height:20px'"/>
          </div>
          <LoadingSkeleton :class="props.class" />
        </div>
        <div :class="['cart-item-price-wrapper',props.small ? 'row-reverse' : 'column']" :style="props.small ? 'min-height:40px' : ''">
          <div :class="['old-price',props.small ? 'small-text' : '']">
            <LoadingSkeleton :class="props.class"/>
          </div>
          <div :class="['price',props.small ? 'small-text' : '']">
            <LoadingSkeleton :class="props.class"/>
          </div>
        </div>
      </div>
  </div>
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
  }
  .cart-info-wrapper{
    @include d-flex(column,flex-start,stretch);
    width: 100%;
    margin-top: 6px;
    gap: 4px;
    .cart-item-brand{
      text-transform: capitalize;
      height: 25px;
      width: 150px;
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
      @include d-flex(column,flex-start,flex-start);
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
      gap: 4px;
      min-height: 50px;
      .old-price{
        height:20px;
        width: 50px;
        font-size: 16px;
        font-weight: 400;
        text-decoration: line-through;
        color: $gray7;
      }
      .price{
        height: 20px;
        width: 50px;
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