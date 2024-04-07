<script setup>
  const props = defineProps({
    title:{type:String,default:''},
    fontColor:{type:String,default:'#000'},
    fontSize:{type:String,default:'16px'},
    borderColor:{type:String,default:'#000'},
    rounded:{type:[Boolean,String],default:false},
    text:{type:Boolean,default:false},
    background:{type:String,default:'#fff'},
    hoveredBackground:{type:String,default:'#000'},
    hoveredColor:{type:String,default:'#fff'},
    padding:{type:String,default:'6px 10px'},
    icon:{type:String,default:""},
  })
  const emit = defineEmits(['clickTrigger'])

  const styleObject = computed(() => {
    return{
      '--font-color':props.fontColor,
      '--font-size':props.fontSize,
      '--border-color':props.borderColor,
      '--radius': typeof props.rounded === 'boolean' ? '8px' :  props.rounded,
      '--background':props.background,
      '--hovered-bgc':props.hoveredBackground,
      '--hovered-font-color':props.hoveredColor,
      '--padding':props.padding
    }
  })

  const buttonClick = () =>{
    emit('clickTrigger');
  }
</script>

<template>
  <button @click="buttonClick" :style="styleObject" :class="['generic-btn',rounded?'rounded':'',text?'type-text':'']">
    <Icon v-if="props.icon" :name="props.icon"/>
    <span v-if="title">{{title}}</span>
  </button>
</template>

<style lang="scss" scoped>
.generic-btn{
  @include d-flex-center;
  gap: 4px;
  padding:var(--padding);
  color: var(--font-color);
  outline: none;
  border: 1px solid var(--border-color);
  font-size: var(--font-size);
  cursor: pointer;
  background-color:var(--background);
  transition: all .1s ease;
  &:hover{
    background-color: var(--hovered-bgc);
    color: var(--hovered-font-color);
  }
}
.rounded{
  border-radius: var(--radius);
}
.type-text{
  border: none!important;
  background-color: none!important;
}
</style>