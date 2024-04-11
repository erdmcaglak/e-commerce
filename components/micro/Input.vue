<script setup>
import {computed} from 'vue'
  const model = defineModel('model')
  const props = defineProps({
    type:{type:String,default:'text'},
    rounded:{type:Boolean,default:false},
    placeHolderText:{type:String,default:''},
    borderColor:{type:String,default:'#000'},
    underLine:{type:Boolean,default:false},
    textColor:{type:String,default:'#010101'}
  })

  const styleObject = computed(()=>{
    return{
      '--border-color': props.borderColor
    }
  })
</script>

<template>
  <div :style="styleObject" :class="['input-wrapper',props.rounded ? 'rounded': '',props.underLine?'underline-input':'']">
    <input :style="styleObject" class="input-comp" :placeholder="placeHolderText" :type="props.type" v-model="model">
  </div>
  
</template>

<style lang="scss" scoped>
.input-wrapper{
  border: 1px solid var(--border-color);
  width: 100%;
  .input-comp{
    outline: none;
    border: none;
    padding: 4px 8px;
    background-color: transparent;
    font-size: 16px;
    color: $dark15;
    width: 100%;
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
}
.rounded{
  border-radius: 4px;
}
.underline-input{
  border: none!important;
  position: relative;
  &::before{
    content: "";
    height: 1px;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--border-color);
  }
}


</style>