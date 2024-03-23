<script setup>
  import {getRoute,kebabToCapitalize} from '@/utils/utils'
  const route = useRoute()
  
  const {mainCategory,category,childCategory} = route.params
  const breadCrumbArr = [mainCategory,category,childCategory].filter(e=>e)
  
</script>


<template>
  <ul class="bread-crumb">
    <li v-if="!breadCrumbArr.every(e=>!e)">
      <span class="bread-crumb-child">Home</span> <span class="bread-crumb-pipe">|</span>
    </li>
    <li v-for="(item,i) in breadCrumbArr" :key="'breadCrumb'+i">
      <span class="bread-crumb-pipe" v-if="i!==0">|</span> <NuxtLink :to="getRoute(i,breadCrumbArr)" class="bread-crumb-child">{{ kebabToCapitalize(item) }}</NuxtLink>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
  .bread-crumb{
    @include d-flex(row,flex-start,center);
    gap: 4px;
    li{
      font-size: 12px;
      @include d-flex(row,flex-start,center);
      gap: 4px;
      &:last-child{
        user-select: none;
        pointer-events: none!important;
        .bread-crumb-child{
          color: $gray13!important;
        }
      }
      .bread-crumb-child{
        color: $dark13!important;
        cursor: pointer;
        @media (hover: hover) {
          &:hover{
            text-decoration: underline;
          }
        }
        
      }
      .bread-crumb-pipe{
        user-select: none;
        pointer-events: none;
        font-size: 14px;
      }
    }
  }
</style>