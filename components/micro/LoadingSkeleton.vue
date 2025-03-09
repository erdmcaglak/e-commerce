<script setup>
  import {ref} from 'vue';
</script>

<template>
  <div class="skeleton"></div>
</template>

<style lang="scss">
.skeleton {
  width: 100%;
  height: 100%;
  border-radius: 4px;
  overflow: hidden;
  
  &:empty::after {
    content:"";
    display:block;
    width: 100%;
    height: 100%;    
    background-image: linear-gradient(90deg, rgba(white, 0) 0, rgba(white, .8) 50%, rgba(white, 0) 100%), linear-gradient(lightgrey 100%, transparent 0);
    background-size: 50% 100%,100% 100%,100% 100%;
    background-position:-150% 0, 0 0,0 0;
    background-repeat: no-repeat;
    animation: loading 1.5s infinite;
  }
}

@keyframes loading {
  to {
    background-position:350% 0,0 0,0 0;
  }
}
</style>