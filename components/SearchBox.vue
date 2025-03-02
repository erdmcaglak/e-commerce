<script setup>
  import {getProductCategory,getCategoryProducts} from '@/utils/utils'
  import {ref} from 'vue';

  const props = defineProps({
    products:{type:Object,default:()=>{return {}}},
    categories:{type:Array,default:()=>[]}
  }) 

  const categories = ref([]);
  const activeCat = ref('');

  for(let cat of props.categories){
    categories.value.push({
      title:getProductCategory(cat,true).categoryArr.filter(e=>e).at(-1),
      route:getProductCategory(cat).categoryArr.join('/'),
      category: getProductCategory(cat).categoryArr.filter(e=>e).join('||'),
    })
  }

  const getItem = () =>{
    let key = Object.keys(props.products)[0];
    return props.products[key][0];
  }

</script>
<template>
  <div class="search-box-wrapper">
    <div class="search-box-categories">
      <div class="category-header">
        Categories
      </div>
      <div :class="['category-item',activeCat===category.category ? 'active' : '']" v-for="(category,i) in categories" :key="'category'+i" @mouseenter="activeCat=category.category">
        {{ category.title }}
      </div>
    </div>
    <div class="search-box-products">
      <div class="search-box-cart" v-for="(item,i) in props.products[activeCat || 'random']" :key="'searcboxCart'+i">
        {{ item.title }}
      </div>
    </div>
  </div>
</template>


<style lang="scss">
.search-box-wrapper{
  border-radius: 4px;
  position: absolute;
  left: 50%;
  top: calc(100% + 1px);
  transform: translateX(-50%);
  min-width: 700px;
  min-height: 300px;
  z-index: 999;
  background-color: #fff;
  @include box-shadow(0,2px,8px,-4px,rgba(0,0,0));
  @include d-flex(row,flex-start,stretch);
  .search-box-categories{
    min-width: 200px;
    flex: 2;
    @include d-flex(column,flex-start,stretch);
    gap: 4px;
    position: relative;
    padding: 4px;
    border-right: 1px solid $white3;
    .category-header{
      padding: 2px 4px 8px;
      font-weight: 600;
      color: $dark6;
      font-size: 16px;
    }
    .category-item{
      font-size: 14px;
      color: $gray12;
      user-select: none;
      cursor: pointer;
      padding: 2px 4px;
      border-radius: 3px;
      transition: all .1s ease;
      &:hover{
        background-color: $white2;
      }
    }
    .active{
      background-color: $white2;
    }
  }
  .search-box-products{
    padding: 4px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-column-gap: 4px;
    grid-row-gap: 4px;
    flex: 5;
    min-width: 500px;
    .search-box-cart{
      border: 1px solid red;
      width: 100px;
      height: 100px;
    }
  }
}
</style>