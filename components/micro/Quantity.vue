<script setup>
  import {watch} from 'vue' 
  const model = defineModel('model');
  const props = defineProps({
    min:{type:[Number,String],default:1},
    max:{type:[Number,String],default:100}
  })
  const decreaseQuantity = () =>{
    model.value--;
  }
  const increaseQuantity = () =>{
    model.value++;
  }

  watch(model,(newVal,oldVal)=>{
    if(newVal < props.min) model.value = props.min
    else if(newVal > props.max) model.value = props.max
  })
</script>

<template>
  <div class="quantity-wrapper">
    <Button
      class="buttons"
      icon="mdi:minus"
      @clickTrigger="decreaseQuantity"
    />
    <input v-model="model" :min="min" :max="max" class="quantity-input" type="number">
    <Button
      class="buttons"
      icon="mdi:plus"
      @clickTrigger="increaseQuantity"
    />
  </div>
</template>

<style lang="scss" scoped>
.quantity-wrapper{
  flex: 0 0 auto;
  @include d-flex(row,flex-start,stretch);
  gap: 4px;
  .quantity-input{
    max-width: 50px;
    padding: 6px 10px;
    border-radius: 0;
    font-size: 16px;
    outline: none;
    border: 1px solid $gray3;
    text-align: center;
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    @media screen and (max-width:480px) {
      flex: 1 0 1px;
      max-width: 100%;
    }
  }
  .buttons{
    @media screen and (max-width:480px) {
      display: none!important;
    }
  }
}
</style>