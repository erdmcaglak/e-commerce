<script setup>
  import {kebabToCapitalize,getCategoryProducts} from '@/utils/utils'
  import {getBrandFilterItems,getPriceFilterItems} from '@/utils/functions'
  import {sortByItems} from '@/enums/enum'
  import {ref} from 'vue'

  const route = useRoute()
  const {mainCategory,category,childCategory} = route.params;
  const breadCrumbArr = [mainCategory,category,childCategory].filter(e=>e);
  const _category = ['mens','womens'].includes(category) && childCategory ? category + '-' + childCategory : breadCrumbArr.at(-1)

  const categoryProducts = await getCategoryProducts(_category)
  const selectedSortItem = ref('');
  const filteredCategoryProducts = ref([...categoryProducts || []])
  const productHolder = ref([...categoryProducts || []])
  const activeFiltersList = ref([])
  const includedFilters = ref([]);

  const filtersArray = [
    {title:'Brand',value:'brand',children:getBrandFilterItems(categoryProducts,'brand')},
    {title:'Price',value:'price',children:getPriceFilterItems(categoryProducts,5)},
  ]

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
    filteredCategoryProducts.value = [...productHolder.value];
  }

  const setDefaultProducts = () =>{
    filteredCategoryProducts.value = [...categoryProducts];
  }

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
    return item?.images[item?.randomImageIndex || 0] || ''
  }
 
  const openFilter = (item) =>{
    if(activeFiltersList.value.includes(item.value)){
      activeFiltersList.value.splice(activeFiltersList.value.indexOf(item.value),1);
    }
    else{
      activeFiltersList.value.push(item.value);
    }
  }

  const applyFilter = (filter) =>{
    if(Object.prototype.hasOwnProperty.call(filter,'min')){
      return categoryProducts.filter(e=>e.price>filter.min && e.price<=filter.max)
    }
    else{
      return categoryProducts.filter(e=>e.brand === filter.value)
    }
  }

  const applyAllFilter = () =>{
    filteredCategoryProducts.value.splice(0);
    for(let filter of includedFilters.value){
      let filteredArr = applyFilter(filter);
      filteredCategoryProducts.value.push(...filteredArr)
    }
    if(includedFilters.value.length === 0){
      setDefaultProducts();
    }
    productHolder.value = filteredCategoryProducts.value;
  }

  const addFilter = (filter,item,i) =>{
    if(!!includedFilters.value.find(e=>e.title === filter.title)){
      includedFilters.value.splice(includedFilters.value.findIndex(e=>e.title === filter.title),1);
      item.children.splice(i,1);
      item.children.find(e=>e.title === filter.title).checkBoxHolder = false;  
    }else{
      filter.checkBoxHolder = true;
      let temp = {...filter}
      temp.isFake = true;
      includedFilters.value.push(filter);
      item.children.unshift(temp);
    }
    applyAllFilter()
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
          <div class="sticky-filter">
            <p class="filter-header">
              Filter By
            </p>
            <div class="filters">
              <div v-for="(item,i) in filtersArray" :key="'filterItems'+i" class="filter-item-wrapper">
                <div @click="openFilter(item)" class="filter-item-header">
                  <span>{{ item.title }}</span>
                  <Icon :class="['filter-item-header-arrow',activeFiltersList.includes(item.value) ? 'rotate-arrow' : '']" name="mdi:menu-right" size="20"/>
                </div>
                <div :class="['filter-item-children-wrapper',activeFiltersList.includes(item.value) ? 'open' : '']">
                  <template v-for="(filter,k) in item.children" :key="'filterChild'+k+i">
                    <div :class="['filter-item-children',includedFilters.find(e=>e.title === filter.title) ? 'included':'',filter.checkBoxHolder && !filter.isFake ? 'hide' : '']" @change="addFilter(filter,item,k)">
                      <input v-model="filter.checkBoxHolder" class="filter-checkbox" type="checkbox" :id="'filterCheckbox'+k+i">
                      <label :class="filter.checkBoxHolder ? 'selected-checkbox' : ''" :for="'filterCheckbox'+k+i">
                        <span class="filter-title name">{{ filter.title }}</span>
                        <span class="filter-title">({{ filter.count }})</span>
                      </label>
                    </div>
                  </template>
                  
                </div>
              </div>
            </div>
          </div>
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
        .sticky-filter{
          padding-top: 20px;
          width: 100%;
          position: sticky;
          top: 120px;
          .filter-header{
            color: $dark5;
            font-size: 20px;
            font-weight: 500;
          }
          .filters{
            @include d-flex(column,flex-start,flex-start);
            padding-top: 10px;
            .filter-item-wrapper{
              width: 100%;
              position: relative;
              .filter-item-header{
                border-top: 1px solid $gray1;
                width: 100%;
                padding: 8px 6px;
                font-size: 14px;
                font-weight: 700;
                background-color: $white2;
                color: $dark3;
                user-select: none;
                cursor: pointer;
                transition: all .2s ease;
                @include d-flex(row,space-between,center);
                &:hover{
                  color: $red5;
                  background-color: $white1;
                  .filter-item-header-arrow{
                    color: $red5;
                  }
                }
                .filter-item-header-arrow{
                  transition: all .2s ease;
                }
                .rotate-arrow{
                  transform: rotate(90deg);
                }
              }
              .open{
                height: 250px!important;
                opacity: 1!important;
                overflow-y: auto!important;
                border-top: 1px solid $gray1!important;
                padding: 4px 0!important;
              }
              .filter-item-children-wrapper{
                @include d-flex(column,flex-start,stretch);
                width:100%;
                max-height: 250px;
                height: 0;
                opacity: 0;
                transition: all .2s ease;
                overflow-y: hidden;
                .filter-item-children{
                  cursor: pointer;
                  @include d-flex(row,flex-start,center);
                  padding: 4px;
                  position: relative;
                  transition: all .2s ease;
                  &:hover{
                    background-color: $white2;
                  }
                  
                  .name{
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    width: inherit;
                    display: block;
                    -webkit-text-size-adjust: none;
                    // max-width: 100px;
                  }
                  .filter-checkbox{
                    padding: 0;
                    height: initial;
                    width: initial;
                    margin-bottom: 0;
                    display: none;
                    cursor: pointer;
                  }
                  label {
                      user-select: none;
                      position: relative;
                      width: 100%;
                      cursor: pointer;
                      font-size: 12px;
                      @include d-flex(row,flex-start,center);
                      &::before{
                        content:'';
                        background-color: transparent;
                        border: 1px solid $gray3;
                        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05);
                        padding: 8px;
                        display: block;
                        position: relative;
                        cursor: pointer;
                        margin-right: 5px;
                      }
                    }
                }
                .included{
                  .selected-checkbox{
                    color: $red5!important;
                    &:after {
                      content: '';
                      display: block;
                      position: absolute;
                      top: 50%;
                      left: -1px;
                      width: 4px;
                      height: 8px;
                      border: solid $red5;
                      border-width: 0 2px 2px 0;
                      transform: rotate(45deg) translateY(-100%);
                    }
                  }
                }
              }
            }
          }
        }
        
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