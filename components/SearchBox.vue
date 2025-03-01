<script setup>
  import {getProductCategory} from '@/utils/utils'

  const props = defineProps({
    products:{type:Object,default:()=>{return {}}},
    categories:{type:Array,default:()=>[]}
  })
</script>
<template>
  <div class="search-box-wrapper">
    <div class="search-box-categories">
      <div class="category-item" v-for="(category,i) in props.categories" :key="'category'+i">
        {{getProductCategory(category).categoryArr.join('>')}}  
      </div>
    </div>
    <div class="search-box-products">

    </div>
  </div>
</template>


<style lang="scss">
.search-box-wrapper{
  position: absolute;
  left: 50%;
  top: calc(100% + 1px);
  transform: translateX(-50%);
  min-width: 700px;
  min-height: 500px;
  z-index: 999;
  background-color: #fff;
  @include box-shadow(0,2px,8px,-4px,rgba(0,0,0));
  @include d-flex(row,flex-start,stretch);
  .search-box-categories{
    border: 1px solid red;
    flex: 1;
    @include d-flex(column,flex-start,flex-start);
    gap: 4px;
    position: relative;
  }
  .search-box-products{
    border: 1px solid blue;
    flex: 3;
  }
}
</style>