<script setup>
  //Home Page
  import {ref} from 'vue'
  import {getProducts} from '@/utils/utils'
  const axios = useNuxtApp().$axios;

  const recomendedForYou = ref([])
  const shopTheLook = ref([])
  const ourPicks = ref([])
  const lastVisitWidgets = ref([]);

  recomendedForYou.value = await getProducts();
  shopTheLook.value = await getProducts();
  ourPicks.value = await getProducts();

  onMounted(() => {
    if(!window.localStorage.getItem('last-visited')){
      window.localStorage.setItem('last-visited',JSON.stringify([]))
    }

    let lastVisitedList = JSON.parse(window.localStorage.getItem('last-visited'));

    lastVisitWidgets.value = lastVisitedList
  })

  useHead({
    title: 'Modern Shopping',
    meta: [
      { name: 'description', content: 'Discover trending products with Artisan. Experience modern and fast online shopping.' },
      { name: 'keywords', content: 'artisan, e-commerce, online shopping, shop, vue3, nuxt3' },

      // Open Graph
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: 'Artisan - Modern Shopping' },
      { property: 'og:description', content: 'Experience modern online shopping with Artisan. Trending products await you.' },
      { property: 'og:image', content: 'https://artisanzen.vercel.app/logo.png' },
      { property: 'og:url', content: 'https://artisanzen.vercel.app/' },

      // Twitter
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Artisan - Modern Shopping' },
      { name: 'twitter:description', content: 'Experience modern online shopping with Artisan.' },
      { name: 'twitter:image', content: 'https://artisanzen.vercel.app/logo.png' }
    ]
  })

</script>

<template>
  <div class="home-page">
    <NuxtLink to="/category/sale" class="hp-banner">
      <div class="img-1">
        <ImageLoader class="img" src="/sales.jpg" alt="" :skeletonClass="'min-250'"/>
      </div>
    </NuxtLink>
    <Slider
      sliderTitle="Recomended For You"
      :sliderList="recomendedForYou"
    />
    <NuxtLink to="/category/clothes" class="hp-banner">
      <div class="img-2">
        <ImageLoader class="img" src="/banner_2.png" alt="" :skeletonClass="'min-250'"/>
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
    <Slider
      v-if="lastVisitWidgets.length > 0"
      sliderTitle="Last Visited"
      :sliderList="lastVisitWidgets"
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
    min-height: 500px;
    @media screen and (max-width:768px) {
      min-height: 500px;
      max-height: 500px;
      height: 500px;
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
    .min-250{
      max-height: 800px;
      height: 500px;
      min-height: 250px;
      @media screen and (max-width:768px) {
        min-height: 500px;
        max-height: 500px;
        height: 500px;
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