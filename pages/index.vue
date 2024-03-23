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
      <img src="/sales.jpg" alt="">
    </NuxtLink>
    <Slider
      sliderTitle="Recomended For You"
      :sliderList= "recomendedForYou"
      />
    <LazyNuxtLink to="/category/clothes" class="hp-banner">
      <img loading="lazy" src="/banner_2.png" alt=""/>
    </LazyNuxtLink>
    <Slider
      sliderTitle="Shop The Look"
      :sliderList= "shopTheLook"
      />
    <Slider
      sliderTitle="Our Picks"
      :sliderList= "ourPicks"
      />
  </div>
  
</template>

<style lang="scss">
.home-page{
  overflow: hidden;
  width: 100%;
  @include d-flex(column,flex-start,stretch);
  .hp-banner{
    @include d-flex(row,center,flex-start);
    overflow: hidden;
    cursor: pointer;
    border-radius: 4px;
    max-height: 800px;
    img{
      width: 100%;
    }
  }
}
</style>