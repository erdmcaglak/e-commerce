<script setup>
  //Home Page
  import { Navigation } from 'swiper/modules';
  import {ref} from 'vue'
  const axios = useNuxtApp().$axios;

  const sliderList = ref([])

  const randomList = [];
  const randomGenerator = () =>{
    let randomNumber = Math.floor(Math.random() *100) +1
    if(randomList.includes(randomNumber)){
      randomGenerator();
    }

    randomList.push(randomNumber);

    if(randomList.length < 15) randomGenerator();
  }
  randomGenerator();

  const recRandom = async (i)=>{
    let {data} = await axios.get(`/products/${randomList[i]}`)
    sliderList.value.push(data);
    i++;
    if(randomList[i]){
      recRandom(i);
    }
  }
  recRandom(0)

</script>

<template>
  <div class="home-page">
    <NuxtLink to="/sale" class="hp-banner">
      <img src="/sales.jpg" alt="">
    </NuxtLink>
    <div class="slider-wrapper">
      <ClientOnly>
        <Swiper
          :modules="[Navigation]"
          :slidesPerView="5"
          :slidesPerGroup="4"
          :loop="true"
          navigation
        >
          <SwiperSlide v-for="slide in sliderList" :key="slide">
            <strong>{{ slide?.title || 'aaaa' }}</strong>
          </SwiperSlide>
        </Swiper>
      </ClientOnly>
    </div>
  </div>
  
</template>

<style lang="scss">
.home-page{
  overflow: hidden;
  width: 100%;
  height: 10000px;
  @include d-flex(column,flex-start,stretch);
  .hp-banner{
    @include d-flex-center;
    overflow: hidden;
    cursor: pointer;
    border-radius: 4px;
    img{
      width: 100%;
    }
  }
  .slider-wrapper{
    padding: 10px 0;
    width: 100%;
    position: relative;
  }
}
</style>