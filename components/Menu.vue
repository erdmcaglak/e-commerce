<script setup>
import {menuItems} from '@/enums/enum'
</script>

<template>
  <ul class="menu-wrapper">
    <li v-for="(item,i) in menuItems" :key="'menuItem'+i" class="menu-item-wrapper">
      <NuxtLink 
        class="menu-title p10"
        :to="item.route"
        activeClass="active-main-route">
        {{ item.title }}
      </NuxtLink>
      <ul v-if="item.children" class="menu-children menu">
        <li v-for="(childItem,k) in item.children" :key="'childItem'+k" class="child-item-wrapper">
          <NuxtLink 
            class="child-menu-title p6" 
            :to="childItem.route"
            activeClass="active-child-route">
            {{ childItem.title }}
            <Icon v-if="childItem.children" class="button-icon" name="mdi:chevron-right" size="24"/>
          </NuxtLink>
          <ul v-if="childItem.children" class="deep-menu-children menu">
            <li v-for="(deepChildItem,j) in childItem.children" :key="'childItem'+j" class="child-item-wrapper">
              <NuxtLink 
                class="deep-child-menu-title p6"
                :to="deepChildItem.route"
                activeClass="active-child-route">
                {{ deepChildItem.title }}
              </NuxtLink>
            </li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.menu-wrapper{
  @include d-flex(row,space-around,center);
  border-bottom: 1px solid $gray1;
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
    
    .menu-title{
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
    .menu{
      position: absolute;
      background-color: $white2;
      padding: 6px 0;
      display: none;
      width: 100%;
      @media screen and (max-width:768px) {
        height: 0;
        overflow: hidden;
        display: block;
        padding: 0;
        border-top: none!important;
        background-color: $white1;
        position: relative;
      }
      .active-child-route{
        background-color: $dark1;
        .child-menu-title{
          color: $white2;
        }
      }
    }
    .menu-children{
      @extend .menu;
      border-top: 1px solid $gray1;
      left: 0;
      top: 100%;
      @media screen and (max-width:768px){
        top: unset;
        left: unset;
        border-radius: 0px;
      }
      .child-item-wrapper{
        text-align: left;
        position: relative;
        @media screen and (max-width:768px){
          border-radius: 0px;
        }
        @media (hover: hover) {
          &:hover{
            background-color: $dark1;
            .child-menu-title{
              color: $white2;
            }
            .deep-menu-children{
              @media screen and (max-width:768px){
                height: fit-content;
              }
              display: block;
            }
          }
        }
        .child-menu-title{
          height: 100%;
          cursor: pointer;
          color: $dark15;
          display: block;
          @include d-flex(row,space-between,center);
          @media screen and (max-width:768px){
            padding-left: 18px;
          }
        }
        .deep-menu-children{
          @extend .menu;
          top: -6px;
          &:not(:last-child){
            left: 100%;
          }
          &:last-child{
            right: 100%;
          }
          @media screen and (max-width:768px){
            top: unset!important;
            left: unset!important;
            right: unset!important;
            border-radius: 0px;
          }
          .active-deep-child-route{
            background-color: $gray4;
            .child-menu-title{
              color: $white2;
            }
          }
          .deep-child-menu-title{
            height: 100%;
            cursor: pointer;
            color: $dark15;
            display: block;
            &:hover{
              background-color: $gray4;
              color: $white2;
            }
            @media screen and (max-width:768px){
              padding-left: 28px;
            }
          }
        }
      }
    }
  }
}
</style>