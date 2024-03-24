<script setup>
  import {ref} from 'vue';

  const isClickedHamMenu = ref(false);

  const toggleMenu = () =>{
    isClickedHamMenu.value = !isClickedHamMenu.value
    let menu = document.querySelector('.menu-wrapper');

    if(isClickedHamMenu.value){
      menu.classList.add('slide-menu-ttb');
      if(menu.classList.contains('slide-menu-btt')){
        menu.classList.remove('slide-menu-btt')
      }
    }
    else{
      menu.classList.add('slide-menu-btt');
      if(menu.classList.contains('slide-menu-ttb')){
        menu.classList.remove('slide-menu-ttb')
      }
      setTimeout(()=>{
        menu.classList.remove('slide-menu-btt');
      },150)
    }
  }
</script>
<template>
  <div class="container">
    <div class="app-bar-wrapper p10">
      <NuxtLink class="logo-wrapper" to="/">
        <img src="/logo.png" alt="Artisan">
      </NuxtLink>
      <div class="search-wrapper">
        <Icon name="mdi:magnify" color="black" size="24"/>
        <input type="text" autocomplete="off" spellcheck="false" placeholder="Search">
      </div>
      <div class="app-bar-actions">
        <!-- //TODO Icon komponenti yapılacak -->
        <div :class="['hamburger-wrapper', isClickedHamMenu ? 'close' : '']" @click="toggleMenu">
          <span class="child-1"></span>
          <span class="child-2"></span>
          <span class="child-3"></span>
        </div>
        <div class="icon-wrapper">
          <Icon class="button-icon" name="mdi:account" color="black" size="24"/>
        </div>
        <div class="icon-wrapper">
          <Icon class="button-icon" name="mdi:cart-outline" color="black" size="24"/>
        </div>
      </div>
    </div>
    <Menu/>
  </div>
</template>
<style lang="scss" scoped>
.container{
  @include d-flex(column,flex-start,stretch);
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 3;
  @media screen and (max-width:768px){
    position: relative;
  }
  .app-bar-wrapper{
    border-bottom: 1px solid $gray1;
    position: relative;
    width: 100%;
    @include d-flex(row,space-between,center);
    transition: all .2s ease;
    z-index: 3;
    background-color: $white1;
    @media screen and (max-width:768px) {
      @include d-flex(column,flex-start,stretch);
      padding-bottom: 0;
    }
    .hide{
      height: 0!important;
      overflow: hidden;
      opacity: 0;
    }
    .logo-wrapper{
      cursor: pointer;
      user-select: none;
      @include d-flex-center;
      padding: 4px;
      position: relative;
      @media screen and (max-width:768px) {
        width:100%;
      }
    }
    .search-wrapper{
      background-color: $white1;
      width: 35%;
      gap: 6px;
      height: fit-content;
      transition: all .2s ease;
      @include d-flex(row,flex-start,center);
      border: 1px solid $gray5;
      border-radius: 4px;
      padding-left: 6px;
      @media screen and (max-width:768px) {
        width: 100%;
      }
      input{
        flex: 1 0 1px;
        outline: none;
        border: none;
        font-size: 16px;
        height: 100%;
        padding: 10px 6px;
        border-radius: 4px;
      }
    }
    .app-bar-actions{
      @include d-flex-center;
      gap: 4px;
      padding: 0 10px;
      @media screen and (max-width:768px) {
        padding: 10px;
        @include d-flex(row,space-around,center);
      }
      .icon-wrapper{
        transition: all .2s ease;
        padding: 6px;
        border-radius: 99px;
        cursor: pointer;
        @media (hover: hover) {
          &:hover{
            background-color: $white3;
          }
        }
      }
      .hamburger-wrapper{
        @media screen and (max-width:768px) {
          display: block;
        }
        display: none;
        padding: 6px;
        cursor: pointer;
        user-select: none;
        width: 24px;
        height: 12px;
        position: relative;
        .child-1{
          transition: all .2s ease;
          position: absolute;
          left: 0;
          top: 0;
          height: 2px;
          width: 100%;
          background-color: $dark1;
          border-radius: 99px;
        }
        .child-2{
          transition: all .2s ease;
          position: absolute;
          left: 0;
          top: 50%;
          height: 2px;
          width: 100%;
          background-color: $dark1;
          border-radius: 99px;
        }
        .child-3{
          transition: all .2s ease;
          position: absolute;
          left: 0;
          top: 100%;
          height: 2px;
          width: 100%;
          background-color: $dark1;
          border-radius: 99px;
        }
      }
      .close{
        height:17px;
        .child-1{
          transform: rotate(45deg);
          transform-origin: left;
        }
        .child-2{
          opacity: 0;
        }
        .child-3{
          transform: rotate(-45deg);
          transform-origin: left;
        }
      }
    }
  }
  .slide-menu-ttb{
    transform: translate(0,0);
    animation: .2s 1 alternate slideTtb;
    display: flex!important;
  }
  .slide-menu-btt{
    animation: .2s 1 alternate slideBtt;
    display: flex!important;
  }
}

@keyframes slideTtb {
  from{
    transform: translate(0, -100%);
    opacity: 0;
  }
  to{
    transform: translate(0, 0);
    opacity: 1;
  }
}

@keyframes slideBtt {
  from{
    transform: translate(0, 0);
    opacity: 1;
  }
  to{
    transform: translate(0, -100%);
    opacity: 1;
  }
}

</style>