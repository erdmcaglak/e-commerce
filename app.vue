<script setup>
  import {ref} from 'vue'
  const alert = ref({});
  const basketItemCount = ref(0)
  const route = useRoute()

  const setAlert = obj => {
    alert.value = obj;
  }

  const setBasketItemCount = () =>{
    if(window.localStorage.getItem('basket-items')){
      basketItemCount.value = JSON.parse(window.localStorage.getItem('basket-items'))?.reduce((a,b)=>a+b.quantity,0) || 0
    }
    else{
      basketItemCount.value = 0;
    }
    
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

<style lang="scss">
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style: none;
  text-decoration: none;
  font-family: 'Roboto', sans-serif;
}
.button-icon{
  cursor: pointer;
  user-select: none;
  transition: all .1s ease;
  border-radius: 99px;
}

.container-main{
  margin: 0 auto;
  max-width: 1600px;
  @media screen and (max-width:1600px){
    max-width: 1100px;
  }
}

html,body,#__nuxt{
  -webkit-tap-highlight-color: transparent;
  height: 100%;
  width: 100%;
  background-color: $white1;
}

textarea {
  resize: none;
}

.hide{
  display: none!important;
  opacity: 0!important;
  height: 0px!important;
  overflow: hidden!important;
}

.p4{
  padding: 4px 6px;
}
.p6{
  padding: 6px 8px;
}
.p8{
  padding: 8px 10px;
}
.p10{
  padding: 10px 12px;
}

.py4{
  padding-top:4px;
  padding-bottom: 4px;
}
.py6{
  padding-top:6px;
  padding-bottom: 6px;
}
.py8{
  padding-top:8px;
  padding-bottom: 8px;
}
.py10{
  padding-top:10px;
  padding-bottom: 10px;
}

.px4{
  padding-left:4px;
  padding-right: 4px;
}
.px6{
  padding-left:6px;
  padding-right: 6px;
}
.px8{
  padding-left:8px;
  padding-right: 8px;
}
.px10{
  padding-left:10px;
  padding-right: 10px;
}

.swiper-button-next, .swiper-button-prev{
  &::after{
    color:black;
  }
}

.row{
  @include d-flex(row,flex-start,center);
}
</style>