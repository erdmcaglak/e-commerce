<script setup>
  import {kebabToCapitalize} from '@/utils/utils'

  const route = useRoute()
  const {mainCategory,category,childCategory} = route.params;
  const breadCrumbArr = [mainCategory,category,childCategory].filter(e=>e);

  
</script>

<template>
  <div class="category-wrapper">
    <div class="category-container container-main">
      <Breadcrumb/>
      <h1 class="category-name">
        {{ kebabToCapitalize(breadCrumbArr.at(-1)) }}
      </h1>
      <div class="category-products-wrapper">
        <div class="filter-wrapper">
          
        </div>
        <div class="category-products">
          <div class="category-products-sort">

          </div>
          <div class="category-products-content">

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.category-wrapper{
  height: 10000px;
  .category-container{
    @include d-flex(column,flex-start,stretch);
    .category-name{
      border-top: 1px solid $dark5;
      border-bottom: 1px solid $dark5;
      text-align: left;
      padding: 10px 0;
      margin: 10px 0;
    }
    .category-products-wrapper{
      @include d-flex(row,flex-start,stretch);
      .filter-wrapper{
        flex: 1.5 0 auto;
        @include d-flex(column,flex-start,flex-start);
        border: 1px solid red;
        height: 400px;
      }
      .category-products{
        @include d-flex(column,flex-start,stretch);
        flex: 8.5 0 auto;
        .category-products-sort{
          height: 30px;
          border: 1px solid red;
        }
        .category-products-content{

        }
      }
    }
  }
}
</style>