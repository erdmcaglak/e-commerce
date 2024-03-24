<script setup>
import {menuItems,socialMedias,footerMenuItems} from '@/enums/enum'
import playStoreImage from '@/assets/images/google_play.svg'
import appStoreImage from '@/assets/images/app_store.svg'

const footerItems = menuItems.filter(e=>e.value!=='sale');

const getAppList = [
  {title:'App Store',value:'app-store',img:appStoreImage,src:'https://github.com/erdmcaglak'},
  {title:'Play Store',value:'play-store',img:playStoreImage,src:'https://www.linkedin.com/in/erdemcaglak/'},
]
</script>

<template>
  <div class="footer-main">
    <div class="footer-wrapper container-main">
      <div class="footer-items-wrapper" v-for="(item,i) in footerItems" :key="'footerItemsWrapper'+i">
        <template v-if="Object.prototype.hasOwnProperty.call(item,'children')">
          <NuxtLink :to="item.route" class="footer-item-header generic-footer-headers">
            {{ item.title }}
          </NuxtLink>
          <template v-for="(mainChildItem,k) in item.children" :key="'mainChildItem'+k">
            <NuxtLink :to="mainChildItem.route" v-if="!Object.prototype.hasOwnProperty.call(mainChildItem,'children')" class="footer-item">
              {{ mainChildItem.title }}
            </NuxtLink>
            <template v-else>
              <template v-for="(childItem,j) in mainChildItem.children" :key="'childItem'+j">
                <NuxtLink :to="childItem.route" class="footer-item" v-if="j<3">
                  {{mainChildItem.title}} - {{ childItem.title }}
                </NuxtLink>
              </template>
            </template>
          </template>
        </template>
      </div>
      <div class="get-app-area">
        <div class="app-buttons">
          <div class="get-app-header generic-footer-headers">
            Get the App
          </div>
          <NuxtLink target="_blank" :to="item.src" class="store-image-wrapper" v-for="(item,i) in getAppList" :key="'storeImages'+i">
            <img :src="item.img" :alt="item.title">
          </NuxtLink>
        </div>
        <div class="social-medias">
          <div class="social-media-header generic-footer-headers">
            Follow Us
          </div>
          <div class="social-media-items-wrapper">
            <NuxtLink target="_blank" :to="item.src" class="social-media-item" v-for="(item,i) in socialMedias" :key="'socialMedias'+i">
              <Icon :name="item.icon" size="24"/>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    <div class="terms container-main">
      <div class="copyright">
        Copyright © ArtisanZen & <span class="my-name">Erdem Çağlak</span>
      </div>
      <div class="footer-menus-wrapper">
        <NuxtLink :to="item.src" target="_blank" v-for="(item,i) in footerMenuItems" :key="'fotterMenu'+i" class="footer-menu-items">
          {{item.title}}
        </NuxtLink>  
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .footer-main{
    width: 100%;
    background-color: $dark14;
    padding: 30px;
    .footer-wrapper{
      @include d-flex(row,space-between,stretch);
      border-bottom: 1px solid $white15;
      padding-bottom: 20px;
      gap: 10px;
      @media screen and (max-width:768px) {
        flex-wrap: wrap;
      }
      @media screen and (max-width:480px) {
        flex-direction: column;
      }
      .footer-items-wrapper{
        @media screen and (max-width:480px) {
          flex: 1 0 1px;
        }
        @include d-flex(column,flex-start,flex-start);
        .footer-item{
          padding: 10px 0;
          cursor: pointer;
          color: $white7;
          font-size: 16px;
          @media (hover: hover) {
            &:hover{
              text-decoration: underline;
              color: $white4;
            }
          }
        }
        .footer-item-header{
          @extend .footer-item;          
        }
      }
      .get-app-area{
        gap: 30px;
        @media screen and (max-width:768px){
          align-content: flex-end;
        }
        @media screen and (max-width:480px) {
          flex: 1 0 1px;
        }
        @include d-flex(column,space-between,flex-start);
        .app-buttons{
          @include d-flex(column,flex-start,flex-start);
          gap: 10px;
          .store-image-wrapper{
            cursor: pointer;
            img{
              user-select: none;
              pointer-events: none;
            }
          }
        }
        .social-medias{
          @include d-flex(column,flex-start,flex-start);
          .social-media-items-wrapper{
            @include d-flex(row,flex-start,center);
            gap: 4px;
            @media (hover: hover) {
              &:hover{
                .social-media-item{
                  color: $white9!important;
                }
              }
            }
            .social-media-item{
              padding: 4px;
              color: $white1!important;
              transition: all .2s ease;
              &:hover{
                color: $white1!important;
                transform: scale(1.1);
              }
            }
          }
        }
      }
    }
    .terms{
      @include d-flex(row,space-between,center);
      width: 100%;
      padding: 20px 0;
      
      @media screen and (max-width:480px) {
        flex-direction: column;
        font-size: 14px;
        gap: 10px;
      }
      .copyright{
        color: $white4;
        .my-name{
          color: $dark_pink;
          font-weight: 700;
        }
      }
      .footer-menus-wrapper{
        @include d-flex(row,flex-start,center);
        gap: 20px;
        .footer-menu-items{
          text-align: center;
          color: $white4;
          user-select: none;
          cursor: pointer;
        }
      }
    }
  }
  .generic-footer-headers{
    color: $white1!important;
    font-weight: 700;
    padding: 10px 0;
    cursor: pointer;
    font-size: 16px;
  }
</style>