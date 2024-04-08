<script setup>
  import {ref,watch} from 'vue'
  import {alertTypeMap} from "@/enums/enum"

  const alertList = ref([]);
  const pausedAlerts = ref([]);
  const alertMap = ref({});

  const props = defineProps({
    alert:{
      type:[Object],
      required:true
    }
  })

  watch(()=>props.alert,async (newVal,oldVal)=>{
    let alert = {...props.alert}
    alert.token = (Math.floor(Math.random()*1e4) + Date.now())
    alertList.value.unshift(alert);
    timeoutSetter(alert);
  })

  const alertTypeControl = (item)=>{
    return alertTypeMap[item.type] || '#FB8C00';
  }

  const closeAlert = (alert,_clearTimeout=true) =>{
    if(_clearTimeout){
      clearTimeout(alertMap.value[alert.token].clear);
    }
    let index = alertList.value.findIndex(e=>e.token === alert.token);
    alertList.value.splice(index,1);
    delete alertMap.value[alert.token];
  }

  const timeoutSetter = (alert) =>{
    alertMap.value[alert.token] = {
      isStopped:false,
      clear:setTimeout(()=>{closeAlert(alert,false)},3e3)
    }
    alertMap.value = {...alertMap.value}
  }
</script>
<template>
<!-- {
    title: 'Error content'
    type: 'danger'|'success'|'warning' ...
} -->
<div @click.stop class="flash-main">
  <transition-group name="slide-rtl">
    <div @click="closeAlert(item)" v-for="item in alertList" :style="{backgroundColor:alertTypeControl(item)}" :key="item.token" class="flash">
      <div class="alert-icons">
        <Icon v-if="item.type === 'success'" class="button-icon" name="mdi:check-circle" color="#fff" size="20"/>
        <Icon v-else-if="item.type === 'danger'" class="button-icon" name="mdi:close-circle" color="#fff" size="20"/>
        <Icon v-else class="button-icon" name="mdi:alert" color="#fff" size="20"/>
      </div>
      <div class="flash-text">
        {{item.title}}
      </div>
    </div>
  </transition-group>
  </div>
</template>

<style lang="scss" scoped>
.flash-main{
  overflow: auto;
  overflow-x: hidden;
  padding: 10px;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 999;
  @include d-flex(column,flex-start,stretch);
  @media (max-width: 480px) {
    padding: 1px;
    width: 100%;
  }
  @media (min-width: 481px) and (max-width: 768px) {
    padding: 3px;
  }
  @media (min-width: 769px) and (max-width: 1024px){
    padding: 5px;
  }
  @media (min-width: 1025px) and (max-width: 1440px){
    padding: 7px;
  }
  .flash{
    user-select: none;
    @include d-flex(row,flex-start,center);
    margin: 0 0 10px 0;
    gap: 10px;
    padding: 15px 10px;
    color: #fff;
    font-weight: normal;
    border-radius: 4px;
    font-size: 16px;
    width: 450px;
    @media (max-width: 480px) {
      width: 100%;
      padding: 9px 5px;
      gap: 5px;
      margin-bottom: 6px;
    }
    @media (min-width: 481px) and (max-width: 768px) {
      width: 350px;
      padding: 11px 5px;
      gap: 6px;
      margin-bottom: 7px;
    }
    @media (min-width: 769px) and (max-width: 1024px){
      width: 400px;
      padding: 14px 7px;
      gap: 7px;
      margin-bottom: 8px;
    }
    @media (min-width: 1025px) and (max-width: 1440px){
      padding: 14px 7px;
      gap: 8px;
      margin-bottom: 9px;
    }
    .alert-icons{
      @include d-flex-center;
        
    }
    .flash-text{
      @include d-flex-center;
      word-wrap: break-word;
    }
  }
}
</style>