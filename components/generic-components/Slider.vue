
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
</script>

<template>
  <div class="slider-wrapper">
      <ClientOnly>
        <h1 class="slider-title" v-if="props.sliderTitle">{{ sliderTitle }}</h1>
        <Swiper
          :modules="[Navigation]"
          :slidesPerView="5"
          :slidesPerGroup="5"
          navigation
          spaceBetween="10"
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
  padding: 10px 0;
  width: 100%;
  position: relative;
  max-width: 1600px;
  margin: 20px auto;
  .slider-title{
    padding: 10px 0;
    margin-bottom: 5px;
  }
}
</style>