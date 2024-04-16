<script setup>
import {ref} from 'vue'
  const alert = ref({});
  const basketItemCount = ref(0)

  const setAlert = obj => {
    alert.value = obj;
  }

  const setBasketItemCount = () =>{
    basketItemCount.value = JSON.parse(window.localStorage.getItem('basket-items'))?.reduce((a,b)=>a+b.quantity,0) || 0
  }

  onMounted(() => {
    setBasketItemCount();
  })

  provide('basketItemCount',{basketItemCount,setBasketItemCount})
  provide('alert', {alert,setAlert});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>