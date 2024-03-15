<script setup>
  import {appBarItems} from '@/enums/enum'
  import {ref} from 'vue';

  const isClickedHamMenu = ref(false);

  const toggleMenu = () =>{
    isClickedHamMenu.value = !isClickedHamMenu.value
    let menu = document.querySelector('.app-bar-wrapper');

    if(isClickedHamMenu.value){
      menu.classList.add('slide-app-bar-ltr');
      if(menu.classList.contains('slide-app-bar-rtl')){
        menu.classList.remove('slide-app-bar-rtl')
      }
    }
    else{
      menu.classList.add('slide-app-bar-rtl');
      if(menu.classList.contains('slide-app-bar-ltr')){
        menu.classList.remove('slide-app-bar-ltr')
      }
      setTimeout(()=>{
        menu.classList.remove('slide-app-bar-rtl');
      },150)
    }
  }
</script>
<template>
  <div class="container">
    <div class="hamburger-wrapper" @click="toggleMenu">
      <span class="child-1"></span>
      <span class="child-2"></span>
      <span class="child-3"></span>
    </div>
    <div class="app-bar-wrapper">
      <div class="logo-wrapper">
        <img src="/logo.png" alt="Artisan">
      </div>
      <div class="search-wrapper">
        <Icon name="mdi:magnify" color="black" size="24"/>
        <input type="text" autocomplete="off" spellcheck="false" placeholder="Search">
      </div>
      <div class="app-bar-actions">
        <!-- //TODO Icon komponenti yapılacak -->
        <div class="icon-wrapper">
          <Icon class="button-icon" name="mdi:account" color="black" size="24"/>
        </div>
        <div class="icon-wrapper">
          <Icon class="button-icon" name="mdi:cart-outline" color="black" size="24"/>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang ="scss" scoped>
.container{
  @include d-flex(row,flex-end,center);
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 3;
  .app-bar-wrapper{
    border-bottom: 1px solid $gray1;
    position: relative;
    width: 100%;
    padding: 10px 12px;
    @include d-flex(row,space-between,center);
    transition: all .2s ease;
    @media screen and (max-width:768px) {
      @include d-flex(column,flex-start,center);
      height: 100%;
      width: 60%;
      left: 0;
      top: 0;
      position: fixed;
      z-index: 999;
      gap: 8px;
      display: none;
    }
    .logo-wrapper{
      @include d-flex-center;
      padding: 4px;
    }
    .search-wrapper{
      width: 35%;
      gap: 6px;
      @include d-flex(row,flex-start,center);
      border: 1px solid $gray5;
      border-radius: 4px;
      padding-left: 6px;
      input{
        flex: 1 0 1px;
        outline: none;
        border: none;
        font-size: 16px;
        height: 100%;
        padding: 10px 6px;
      }
    }
    .app-bar-actions{
      @include d-flex-center;
      gap: 4px;
      padding: 0 10px;
      .icon-wrapper{
        transition: all .2s ease;
        padding: 6px;
        border-radius: 99px;
        cursor: pointer;
        &:hover{
          background-color: $white3;
        }
      }
    }
  }
  .slide-app-bar-ltr{
    animation: .2s 1 alternate slideLtr;
    display: flex!important;
  }
  .slide-app-bar-rtl{
    animation: .2s 1 alternate slideRtl;
    display: flex!important;
  }
  .hamburger-wrapper{
    @media screen and (min-width:768px) {
      display: none;
    }
    cursor: pointer;
    user-select: none;
    width: 30px;
    height: 20px;
    position: relative;
    .child-1{
      position: absolute;
      left: 0;
      top: 0;
      height: 2px;
      width: 100%;
      background-color: $gray3;
      border-radius: 99px;
    }
    .child-2{
      position: absolute;
      left: 0;
      top: 50%;
      height: 2px;
      width: 100%;
      background-color: $gray3;
      border-radius: 99px;
    }
    .child-3{
      position: absolute;
      left: 0;
      top: 100%;
      height: 2px;
      width: 100%;
      background-color: $gray3;
      border-radius: 99px;
    }
  }
}

@keyframes slideLtr {
  from{
    transform: translate(-100%, 0);
    opacity: 0;
  }
  to{
    transform: translate(0, 0);
    opacity: 1;
  }
}

@keyframes slideRtl {
  from{
    transform: translate(0, 0);
    opacity: 1;
  }
  to{
    transform: translate(-100%, 0);
    opacity: 1;
  }
}

</style>