<script setup>
  import {inject,watch} from 'vue';
  const { alert, setAlert } = inject('alert')

  const showJumpToTop = ref(false);

  onMounted(() => {
    window.addEventListener('scroll', (e)=>{
      if(window.scrollY >= 400){
        showJumpToTop.value = true;
      }
      else{
        showJumpToTop.value = false;
      }
    });
  })

  const goTop = () =>{
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
 
</script>


<template>
  <div class="page-wrapper">
    <div class="content-wrapper" >
      <Alert :alert="alert"/>
      <AppBar/>
      <div class="main-wrapper">
        <slot></slot>
      </div>
      <transition name="fade">
        <div v-if="showJumpToTop" class="jump-to-top" @click="goTop">
          <Icon name="mdi:arrow-up" size="24" color="white"/>
        </div>
      </transition>
      <WebsiteFooter/>
    </div>
  </div>
</template>
<style lang="scss">
.page-wrapper{
  @include d-flex(row,flex-start,flex-start);
  min-height: 100%;
  .content-wrapper{
    width: 100%;
    height: 100%;
    position: relative;
    .main-wrapper{
      margin-top: 10px;
      border-radius: 4px;
      padding: 16px;
    }
    .jump-to-top{
      position: fixed;
      bottom: 20px;
      right: 20px;
      background-color: $primary_blue;
      color: $white1;
      border-radius: 50%;
      padding: 10px;
      cursor: pointer;
      transition: all .2s ease;
      z-index: 9999;
      @media (hover: hover){
        &:hover{
          background-color: $warning_blue;
        }
      }
    }
  }
}
</style>