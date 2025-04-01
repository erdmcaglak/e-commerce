<script setup>
  import {ref} from 'vue';
  const props = defineProps({
    src:{type:String,required:true},
    alt:{type:String,required:true},
    class:{type:String,default:''},
    skeletonClass:{type:String,default:''},
  })
</script>

<template>
  <div class="loading-image-wrapper">
    <NuxtImg
      :src="props.src"
      :alt="props.alt"
      fit="contain"
      :custom="true"
      loading="lazy"
      sizes="sm:300px md:600px lg:1200px" 
      v-slot="{ src, isLoaded, imgAttrs, loading }"
    >
      <img
        v-if="isLoaded"
        v-bind="imgAttrs"
        :src="src"
        :loading="loading"
        :class="props.class"
      >
      <LoadingSkeleton :class="props.skeletonClass" v-else />
    </NuxtImg>
  </div>
  
</template>

<style lang="scss" scoped>
.loading-image-wrapper{
  width: 100%;
  height: 100%;
  background-color: $white1;
  display: flex;
  img{
    object-fit: contain;
    width: 100%;
  }
}
</style>