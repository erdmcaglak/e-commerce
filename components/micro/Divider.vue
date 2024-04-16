<script setup>
  import {computed} from 'vue' 
  const props = defineProps({
    vertical:{type:Boolean,default:false},
    color:{type:String,default:'#E6E6E6'}
  })

  const styleObject = computed(()=>{
    return{
      '--background':props.color
    }
  })
</script>

<template>
  <div :style="styleObject" :class="['divider',vertical?'vertical':'horizontal']"></div>
</template>

<style lang="scss" scoped>
.divider{
  background-color: var(--background);
  margin: 10px 0;
}
.vertical{
  align-self: stretch;
  width: 1px;
}
.horizontal{
  width: 100%!important;
  height: 1px;
}
</style>