<script setup>
  //Home Page
  import {ref} from 'vue'
  import {getProducts} from '@/utils/utils'
  const axios = useNuxtApp().$axios;

  const recomendedForYou = ref([])
  const shopTheLook = ref([])
  const ourPicks = ref([])

  recomendedForYou.value = await getProducts();
  shopTheLook.value = await getProducts();
  ourPicks.value = await getProducts();

</script>

<template>
  <div class="home-page">
    <NuxtLink to="/category/sale" class="hp-banner">
      <div class="img-1">
        <ImageLoader class="img" src="/sales.jpg" alt=""/>
      </div>
    </NuxtLink>
    <Slider
      sliderTitle="Recomended For You"
      :sliderList="recomendedForYou"
    />
    <NuxtLink to="/category/clothes" class="hp-banner">
      <div class="img-2">
        <ImageLoader class="img" src="/banner_2.png" alt=""/>
      </div>
      
    </NuxtLink>
    <Slider
      sliderTitle="Shop The Look"
      :sliderList="shopTheLook"
    />
    <Slider
      sliderTitle="Our Picks"
      :sliderList="ourPicks"
    />
  </div>
  
</template>

<style lang="scss">
.home-page{
  overflow: hidden;
  width: 100%;
  gap: 20px;
  @include d-flex(column,flex-start,stretch);
  .hp-banner{
    position: relative;
    @include d-flex(row,center,flex-start);
    overflow: hidden;
    cursor: pointer;
    border-radius: 4px;
    max-height: 800px;
    min-height: 250px;
    @media screen and (max-width:768px) {
      min-height: 500px;
      max-height: 500px;
    }
    .img-1{
      height: 100%;
      @media screen and (min-width:769px) {
        width: 100%;
      }
      @media screen and (max-width:768px) {
        width: unset;
        position: absolute;
        right: -350px;
        top: 0;
      }
    }
    .img-2{
      height: 100%;
      @media screen and (min-width:769px) {
        width: 100%;
      }
      @media screen and (max-width:768px) {
        position: absolute;
        left: -130px;
        top: 0;
      }
    }
    .img{
      @media screen and (max-width:768px) {
        width: unset!important;
      }
    }
  }
}
</style>