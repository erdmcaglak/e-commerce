
<script setup>
  import { Navigation } from 'swiper/modules';

  const props = defineProps({
    sliderList:{
      type:Array,
      required:true
    },
    sliderTitle:{
      type:String,
      default:''
    }
  })

  const slidePerView = ref(5)
  const slidePerGroup = ref(5)

  const setOptions = () =>{
    if(window.innerWidth<=480){
      slidePerView.value = 1;
      slidePerGroup.value = 1;
    }
    else if(window.innerWidth<=768){
      slidePerView.value = 2;
      slidePerGroup.value = 2;
    }
    else if(window.innerWidth<=1024){
      slidePerView.value = 3;
      slidePerGroup.value = 3;
    }
    else if(window.innerWidth<=1600){
      slidePerView.value = 4;
      slidePerGroup.value = 4;
    }
    else{
      slidePerView.value = 5;
      slidePerGroup.value = 5;
    }
  }

  onMounted(() => {
    setOptions();
    window.addEventListener('resize',()=>{
      setOptions()
    })
  })
</script>

<template>
  <div class="slider-wrapper container-main">
      <ClientOnly>
        <h1 class="slider-title" v-if="props.sliderTitle">{{ props.sliderTitle }}</h1>
        <!-- //!breakpoint çalışmıyor workaround uygulandı -->
        <Swiper
          :modules="[Navigation]"
          :slidesPerView="slidePerView"
          :slidesPerGroup="slidePerGroup"
          navigation
          space-between="10" 
        >
          <SwiperSlide v-for="(item,i) in props.sliderList" :key="'specialSlider'+i">
            <Cart
              :image="item.images[0]"
              :secondImage="item.images[1] || ''"
              :brand="item.brand || ''"
              :title="item.title"
              :price="item.price"
              :oldPrice="item.oldPrice || 0"
              :discount="item.discountPercentage || 1"
              :productId="item.id.toString()"
            />
          </SwiperSlide>
        </Swiper>
      </ClientOnly>
    </div>
</template>

<style lang="scss">
.slider-wrapper{
  width: 100%;
  position: relative;
  min-height: 600px;
  @include d-flex(column,center,flex-start);
  .slider-title{
    padding: 10px 0;
    margin-bottom: 5px;
  }
  .swiper-horizontal{
    width: 100%;
  }
}
</style>