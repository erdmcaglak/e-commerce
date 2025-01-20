<script setup>
import {menuItems} from '@/enums/enum'

const activeMenu = ref('')
const lastActiveMenu = ref('')

const setActiveMenu = (value,hard) =>{
  if(hard){
    lastActiveMenu.value = value;
  }
  else{
    lastActiveMenu.value = activeMenu.value;
  }
  
  activeMenu.value = value;
}
</script>

<template>
  <ul class="menu-wrapper">
    <li v-for="(item,i) in menuItems" :key="'menuItem'+i" :class="['menu-item-wrapper',activeMenu === item.value ? 'active-menu-item': '']" @mouseenter="setActiveMenu(item.value)" @mouseleave="setActiveMenu('')">
      <NuxtLink 
        :class="['menu-title p10', item.value==='all-categories' ? 'all-category' : '']"
        :to="item.route"
        activeClass="active-main-route">
          <Icon v-if="item.icon" :name="item.icon" size="24"/>
          <span>{{ item.title }}</span>
      </NuxtLink>
    </li>
    <ul v-if="[activeMenu].includes('all-categories')" class="menu" @mouseenter="setActiveMenu('all-categories')" @mouseleave="setActiveMenu('',true)">
      <template  v-for="(item,k) in menuItems" :key="'childItem'+k">
        <template v-if="item.children" >
          <span class="menu-item p8 header" style="pointer-events:none">{{ item.title }}</span>
          <template v-for="(childItem,j) in item.children" :key="'childItem'+j">
            <NuxtLink 
              class="menu-item p8"
              :to="childItem.route"
              activeClass="active-child-route">
              {{ childItem.title }}
            </NuxtLink>
            <template v-for="(deepChildItem,l) in childItem.children" :key="'deepChildItem'+l">
              <NuxtLink 
                class="menu-item p8"
                :to="deepChildItem.route"
                activeClass="active-child-route">
                {{ deepChildItem.title }}
              </NuxtLink>
            </template>
          </template>
        </template>
      </template>
    </ul>
  </ul>
</template>

<style lang="scss" scoped>
.menu-wrapper{
  @include d-flex(row,space-around,center);
  border-bottom: 1px solid $gray1;
  position: relative;
  gap: 4px;
  background-color: $white1;
  @media (hover: hover) {
    &:hover{
      .menu-item-wrapper .menu-title{
        color: $dark1;
      }
    }
  }
  @media screen and (max-width:768px) {
    transform: translate(-99999px,-99999px);
    position: absolute;
    width: 100%;
    z-index: 1;
    background-color: $white1;
    @include d-flex(column,flex-start,stretch);
    padding-bottom: 0;
    top: 100%;
  }
  .active-menu-item{
    .menu-children{
      @media screen and (max-width:768px) {
        height: fit-content!important;
      }
      display: block!important;
    }
    .menu-title{
      color: $dark15!important;
    }
    &::before{
      width: 40%!important;
    }
  }
  .menu-item-wrapper {
    flex: 1 0 auto;
    @include d-flex-center;
    user-select: none;
    transition: all .2s ease;
    position: relative;
    @media screen and (max-width:768px){
      @include d-flex(column,flex-start,stretch);
    }
    &::before{
      transition: all .2s ease;
      content: "";
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 0%;
      height: 1px;
      background-color: $blue14;
    }
    .button-icon{
      transition: none;
    }
    .active-main-route{
      &::before{
        width: 40%;
      }
    }
    @media (hover: hover) {
      &:hover{
        .menu-children{
          @media screen and (max-width:768px) {
            height: fit-content;
          }
          display: block;
        }
        .menu-title{
          color: $dark15;
        }
        &::before{
          width: 40%;
        }
      }
    }

    .active-menu-title{
      color: $dark15!important;
    }
    
    .menu-title{
      @include d-flex-center;
      gap: 8px;
      cursor: pointer;
      text-align: center;
      width: 100%;
      font-weight: 700;
      font-size: 18px;
      color: $dark8;
      @media screen and (max-width:768px){
        text-align: left;
      }
    }
    .all-category{
      @media screen and (max-width:768px) {
        display: none!important;
      }
    }
  }
  .menu{
    position: absolute;
    background-color: $white1;
    border-left: 1px solid $gray1;
    border-right: 1px solid $gray1;
    border-bottom: 1px solid $gray1;
    padding: 6px 0;
    width: 90%;
    left: 50%;
    transform: translateX(-50%);
    top: 100%;
    @include d-flex(column,flex-start,flex-start);
    flex-wrap: wrap;
    max-height: 310px;
    @media screen and (max-width:768px) {
      height: 0;
      overflow: hidden;
      display: block;
      padding: 0;
      border-top: none!important;
      background-color: $white1;
      position: relative;
    }
    .menu-item{
      color: $dark15;
      @media (hover: hover){
        &:hover{
          text-decoration: underline;
          color: $danger_orange;
        }
      }
    }
    .header{
      color: $danger_orange!important;
      text-decoration: underline;
      font-weight: 600;
    }
  }
}
</style>