<script setup>
import {computed} from 'vue'
  const model = defineModel('model')
  const props = defineProps({
    type:{type:String,default:'text'},
    rounded:{type:Boolean,default:false},
    placeHolderText:{type:String,default:''},
    label:{type:String,default:''},
    borderColor:{type:String,default:'#E6E6E6'},
    underLine:{type:Boolean,default:false},
    textColor:{type:String,default:'#010101'},
    required:{type:Boolean,default:false},
    inputId:{type:[String,Number],default:'input'}
  })
  const textAreaInput = ref(null)

  const styleObject = computed(()=>{
    return{
      '--border-color': props.borderColor
    }
  })

  const getText = (type) => {
    if(props.required){
      return '*' + props[type] 
    }

    return props[type]
  }

  const resizeTextArea = () =>{
    if(!model.value) {
      textAreaInput.value.style.height = '60px'
    }
    else{
      textAreaInput.value.style.height = textAreaInput.value.scrollHeight < 60 ? '60px' : textAreaInput.value.scrollHeight+'px'
    }
  }
</script>

<template>
  <div v-if="type!=='textField'" :style="styleObject" :class="['input-wrapper',props.rounded ? 'rounded': '',props.underLine?'underline-input':'',model ? 'active':'']">
    <input :id="inputId" :style="styleObject" class="input-comp" :placeholder="!label ? getText('placeHolderText') : ''" :type="props.type" v-model="model">
    <label v-if="label" :for="inputId">{{getText('label')}}</label>
  </div>
  <div v-else :style="styleObject" :class="['text-area-wrapper',model ? 'active':'',props.rounded ? 'rounded': '']">
    <textarea :id="inputId" v-model="model" ref="textAreaInput" :placeholder="!label ? getText('placeHolderText') : ''" :style="styleObject" class="textarea-comp" @input="resizeTextArea" rows="1"></textarea>
    <label v-if="label" :for="inputId">{{getText('label')}}</label>
  </div>
  
</template>

<style lang="scss" scoped>
.input-wrapper{
  border: 1px solid var(--border-color);
  width: 100%;
  position: relative;
  padding: 8px 6px;
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
    &:focus ~ label{
      top:0;
      padding: 0 4px;
      left: 8px;
      font-size:14px;
      color:$gray9;
      background-color: $white1;
    }
  }
}
.active{
  label{
    top:0!important;
    padding: 0 4px;
    left: 8px;
    font-size:14px!important;
    color:$gray9!important;
    background-color: $white1;
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
.text-area-wrapper{
  position: relative;
  height: fit-content;
  border: 1px solid var(--border-color);
  .textarea-comp{
    font-size: 16px;
    border-radius: 6px;
    outline: none!important;
    border: none!important;
    width: 100%;
    padding: 12px 14px;
    overflow: hidden!important;
    min-height: 60px;
    color: $dark15;
    &:focus ~ label{
      top:0;
      padding: 0 4px;
      left: 8px;
      font-size:14px;
      color:$gray9;
      background-color: $white1;
    }
  }
}
label{
  position: absolute;
  pointer-events: none;
  transition: all .2s ease;
  left: 14px;
  top: 50%;
  z-index: 0;
  color: $gray13;
  transform: translateY(-50%);
  user-select: none;
}


</style>