<script setup>
  import {ref} from 'vue'
  import {colors,defaultSizes,numberSizes} from "@/enums/enum"

  const selectedSize = ref('');
  const currentSizeArr = ref([]);
  const emit = defineEmits(['selectTrigger'])

  const props = defineProps({
    excludeList:{
      type:[Array,String,Number],
      default:()=>[]
    },
    sizeType:{
      type:String,
      default:'default' //! default,number,color
    }
  })

  if(props.sizeType === 'color'){
    currentSizeArr.value = colors;
  }
  else if(props.sizeType === 'number'){
    currentSizeArr.value = numberSizes
  }
  else{
    currentSizeArr.value = defaultSizes
  }

  const selectSize = (item,index) =>{
    let excludeControl = false;
    if(props.sizeType !== 'color'){
      if(Array.isArray(props.excludeList)){
        excludeControl = props.excludeList.includes(item.value)
      }
      else{
        if(typeof props.excludeList === 'string'){
          excludeControl = props.excludeList === index.toString();
        }
        else{
          excludeControl = props.excludeList === parseInt(index)
        }
      }
    }
    if(!excludeControl){
      selectedSize.value = item.value;
      emit('selectTrigger',{
        type:props.sizeType,
        item
      })
    }
  }

  const isExclude = (index,item) =>{
    if(Array.isArray(props.excludeList)){
      return props.excludeList.includes(item.value)
    }
    else{
      if(typeof props.excludeList === 'string'){
        return props.excludeList === index.toString();
      }
      else{
        return props.excludeList === parseInt(index)
      }
    }
  }
</script>

<template>
  <div class="sizes-container">
    <div class="size-header">
      {{props.sizeType !== 'color' ? 'Select Size' : 'Select Color'}}
    </div>
    <div class="sizes-wrapper">
      <template v-for="(item,i) in currentSizeArr" :key="'sizes'+i">
        <div v-if="props.sizeType !== 'color'" @click="selectSize(item,i)"  :class="['size-item',isExclude(i,item) ? 'disabled-size-item' : '',selectedSize === item.value ? 'selected-size-item' : '']">
          {{item.title}}
        </div>

        <div v-else @click="selectSize(item,i)"  :class="['size-item rounded',selectedSize === item.value ? 'selected-size-item' : '']">
          <div class="size-color" :style="{backgroundColor:item.value}"></div>
        </div>
      </template>
    </div>
  </div>
  
</template>

<style lang="scss" scoped>
.sizes-container{
  padding: 15px 0;
  @include d-flex(column,flex-start,flex-start);
  gap: 10px;
  .size-header{
    font-weight: 700;
    font-size: 14px;
  }
  .sizes-wrapper{
    @include d-flex(row,flex-start,center);
    flex-wrap: wrap;
    gap: 10px;
    .size-item{
      padding: 6px 10px;
      border: 1px solid $gray1;
      color: $dark8;
      font-weight: 300;
      min-width: 50px;
      @include d-flex-center;
      text-align: center;
      transition: all .1s ease;
      user-select: none;
      cursor: pointer;
      @media (hover: hover){
        &:hover{
          border-color: $red3;
          color: $red3;
        }
      }
      .size-color{
        border-radius: 999px;
        width: 20px;
        height: 20px;
      }
    }
    .rounded{
      border-radius: 999px;
      width: fit-content!important;
      padding: 4px!important;
      min-width: unset!important;
    }
    .selected-size-item{
      @extend .size-item;
      border-color: $red5;
      color: $red5;
    }
    .disabled-size-item{
      padding: 6px 10px;
      border: 1px solid $gray1;
      color: $gray1;
      font-weight: 300;
      min-width: 50px;
      @include d-flex-center;
      text-align: center;
      user-select: none;
      pointer-events: none;
      position: relative;
      &::before{
        content:"";
        width: 120%;
        height: 2px;
        background-color: $gray1;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%) rotate(33deg);
        transform-origin: center;      
      }
    }
  }
}

</style>