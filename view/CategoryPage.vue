<script setup>
  import {kebabToCapitalize,getCategoryProducts} from '@/utils/utils'
  import {ref} from 'vue'

  const route = useRoute()
  const {mainCategory,category,childCategory} = route.params;
  const breadCrumbArr = [mainCategory,category,childCategory].filter(e=>e);
  const categoryProducts = await getCategoryProducts(breadCrumbArr.at(-1))
  const selectedSortItem = ref('');
  const filteredCategoryProducts = ref([...categoryProducts])

  const productsSort = (key,type) =>{
    filteredCategoryProducts.value.sort((a,b)=>{
      if(type === 'asc'){
        if(typeof a[key] === 'string'){
          return a[key].localeCompare(b[key]);
        }
        return a[key]-b[key]
      }
      else{
        if(typeof a[key] === 'string'){
          return b[key].localeCompare(a[key]);
        }
        return b[key]-a[key]
      }
    })
  }

  const clearSort = () => {
    filteredCategoryProducts.value = [...categoryProducts];
  }

  const sortByItems = [
    {title:'Popularity',value:'popularity',sortKey:'rating',type:'desc'},
    {title:'Price Low to High',value:'price-low-to-high',sortKey:'price',type:'asc'},
    {title:'Price High to Low',value:'price-high-to-low',sortKey:'price',type:'desc'},
    {title:'Name A-Z',value:'name-a-z',sortKey:'title',type:'asc'},
    {title:'Name Z-A',value:'name-z-a',sortKey:'title',type:'desc'},
  ]

  const sortAllProducts = () =>{
    if(selectedSortItem.value){
      let sortItem = sortByItems.find(e=>e.value === selectedSortItem.value)
      productsSort(sortItem.sortKey,sortItem.type)
    }
    else{
      clearSort();
    }
  }

  const getImage = (item) =>{
    return item.images[item.randomImageIndex]
  }
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
          <div class="category-products-sort p10">
              <select name="sortBy" v-model="selectedSortItem" @change="sortAllProducts" class="sort-select-box">
                <option selected value="">Sort By</option>
                <option v-for="(sortItem,i) in sortByItems" :key="'sortItems'+i" :value="sortItem.value">{{ sortItem.title }}</option>
            </select>
            <div class="category-items-info">
              <div class="total-count">
                <span>{{ filteredCategoryProducts.length }}</span> items
              </div>
              <div class="view-per-page">
                View <span>{{ filteredCategoryProducts.length }}</span> per page
              </div>
            </div>
          </div>
          <div class="category-products-content">
            <template v-for="(item,i) in filteredCategoryProducts" :key="'categoryProds'+i">
              <Cart
                :image="getImage(item)"
                :secondImage="item.images[1] || ''"
                :brand="item.brand || ''"
                :title="item.title"
                :price="item.price"
                :oldPrice="item.oldPrice || 0"
                :discount="item.discountPercentage || 1"
                :productId="item.id.toString()"
              />
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.category-wrapper{
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
        flex: 1.5 0 1px;
        @include d-flex(column,flex-start,flex-start);
        border: 1px solid red;
      }
      .category-products{
        @include d-flex(column,flex-start,stretch);
        flex: 8.5 0 1px;
        .category-products-sort{
          @include d-flex(row,space-between,center);
          .sort-select-box{
            padding: 6px 4px;
            font-size: 12px;
            border: 1px solid $gray3;
            outline: none;
          }
          .category-items-info{
            color: $gray9;
            font-size: 14px;
            @include d-flex-center;
            .total-count{
              padding: 4px;
              border-right: 1px solid $gray2;
              span{
                color: $gray14;
                font-weight: 700
              }
            }
            .view-per-page{
              @extend .total-count;
              border-right: none!important;
            }
          }
        }
        .category-products-content{
          padding: 10px;
          width: 100%;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
          @media screen and (max-width: 1600px) {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      }
    }
  }
}
</style>