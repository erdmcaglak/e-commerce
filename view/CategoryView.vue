<script setup>
  import {kebabToCapitalize,getCategoryProducts} from '@/utils/utils'
  import {getBrandFilterItems,getPriceFilterItems} from '@/utils/functions'
  import {sortByItems} from '@/enums/enum'
  import {ref,computed} from 'vue'

  const props = defineProps({
    products:{type:Array,default:()=>[]},
    title:{type:String,default:''},
    hideBreadcrump:{type:Boolean,default:false},
  })


  //TODO searchProducts'a göre search sayfası veya category sayfası açılacak.

  const route = useRoute()
  const {mainCategory,category,childCategory} = route.params;
  const breadCrumbArr = [mainCategory,category,childCategory].filter(e=>e);
  const _category = ['mens','womens'].includes(category) && childCategory ? category + '-' + childCategory : breadCrumbArr.at(-1)
  const multiplyItems = ref([1,2,3,4]);
  const activeMultiplyItem = ref(1);
  const isSettingsOpen = ref(false);
  const perPage = ref(12);
  const page = ref(1);
  const categoryProducts = ref([]);
  const filteredCategoryProducts = ref([])
  const productHolder = ref([])
  const selectedSortItem = ref('');
  const activeFiltersList = ref([])
  const includedFilters = ref([]);
  const filtersArray = ref([
    // {title:'Brand',value:'brand',children:getBrandFilterItems(categoryProducts,'brand')},
    // {title:'Price',value:'price',children:getPriceFilterItems(categoryProducts,5)},
  ])
  const isProdctsFetched = ref(false);


  const changeActiveMultiply = (item) =>{
    activeMultiplyItem.value = item;
    window.localStorage.setItem('multiplyBy',JSON.stringify(item));
  }

  const generateProducts = async () =>{
    isProdctsFetched.value = false;
    categoryProducts.value = await getCategoryProducts(_category);
    filteredCategoryProducts.value = [...categoryProducts.value];
    productHolder.value = [...categoryProducts.value];
    isProdctsFetched.value = true;
  }

  onMounted(async () => {
    if(window.localStorage.getItem('multiplyBy')){
      activeMultiplyItem.value = JSON.parse(window.localStorage.getItem('multiplyBy'));
    }
    else{
      window.localStorage.setItem('multiplyBy',JSON.stringify(1));
    }

    generateProducts();
  })

  const getCurrentPageProdLastIndex = computed(() => {
    return filteredCategoryProducts.value.length === 0 ? perPage.value : filteredCategoryProducts.value.length < ((page.value+1) * perPage.value) ? ((filteredCategoryProducts.value.length % perPage.value)) : perPage.value
  })

  const getTotalPage = computed(() => {
    return Math.ceil(filteredCategoryProducts.value.length/perPage.value)
  })

  
  


  const productsSort = (key,type) =>{
    filteredCategoryProducts.value.sort((a,b)=>{
      if(type === 'asc'){
        if(typeof a[key] === 'string'){
          return b[key].localeCompare(a[key]);
        }
        return a[key] - b[key]
      }
      else{
        if(typeof a[key] === 'string'){
          return a[key].localeCompare(b[key]);
        }
        return b[key]- a[key]
      }
    })
  }

  const clearSort = () => {
    filteredCategoryProducts.value = [...productHolder.value];
  }

  const setDefaultProducts = () =>{
    filteredCategoryProducts.value = [...categoryProducts];
    productHolder.value = [...categoryProducts]
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

  const applyAllFilter = () =>{
    let filterControl = includedFilters.value.map(e=>e.val).filter(e=>e);
    let uniq = [...new Set(filterControl)].filter(e=>e);
    let grouppedArr = [];
    filteredCategoryProducts.value.splice(0);
    productHolder.value = [...categoryProducts]

    for(let filterItem of uniq){
      let tempArr = []
      for(let filter of includedFilters.value){
        if(filter.val === filterItem){
          tempArr.push(filter);
        }
      }
      grouppedArr.push(tempArr);
    }

    const connectWithOr = (filterArr,secondArr) =>{
      let tempArr = []
      for(let item of filterArr){
        if(Object.prototype.hasOwnProperty.call(item.filter,'min')){
          tempArr.push(...secondArr.filter(e=>e.price>item.filter.min && e.price<=item.filter.max))
        }
        else{
          tempArr.push(...secondArr.filter(e=>e.brand === item.filter.value))
        }
      }
      return tempArr;
    }

    for(let filterArr of grouppedArr){
      productHolder.value = connectWithOr(filterArr,productHolder.value);
    }

    filteredCategoryProducts.value = productHolder.value

    if(grouppedArr.length === 0){
      setDefaultProducts();
    }

    sortAllProducts();
  }

  const addFilter = (filter,item,i) =>{
    if(!!includedFilters.value.find(e=>e.filter.title === filter.title)){
      includedFilters.value.splice(includedFilters.value.findIndex(e=>e.filter.title === filter.title),1);
      item.children.splice(i,1);
      item.children.find(e=>e.title === filter.title).checkBoxHolder = false;  
    }else{
      filter.checkBoxHolder = true;
      let temp = {...filter}
      temp.isFake = true;
      includedFilters.value.push({val:item.value,filter});
      item.children.unshift(temp);
    }
    applyAllFilter()
  }
  
</script>

<template>
  <div class="category-container container-main">
      <Breadcrumb
        v-if="!hideBreadcrump"
        :categoryArr="breadCrumbArr"
      />
      <div class="view-header">
        <h1 class="category-name">
          {{ props.title || kebabToCapitalize(breadCrumbArr.at(-1)) }}
        </h1>
        <!-- <div class="view-settings">
          <div class="settings-icon" @click="isSettingsOpen = !isSettingsOpen">
            <Icon name="mdi:settings" size="24" color="#000000"/>
          </div>
          <div v-if="isSettingsOpen" class="settings-box">
            <div class="box-haeder">
              Multiply the products by
            </div>
            <div class="settings-items">
              <div 
                v-for="(item,i) in multiplyItems" 
                :key="'multiplyBy'+i" 
                :class="['settings-item', activeMultiplyItem === item ? 'active-settings-item' : '']"
                @click="changeActiveMultiply(item)"
              >
              {{item}}
              </div>
            </div>
          </div>
        </div> -->
      </div>
      
      <div class="category-products-wrapper">
        <div class="filter-wrapper">
          <div class="sticky-filter">
            <!-- <p class="filter-header">
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
                    <div v-if="filter.count" :class="['filter-item-children',includedFilters.find(e=>e.filter.title === filter.title) ? 'included':'',filter.checkBoxHolder && !filter.isFake ? 'hide' : '']" @change="addFilter(filter,item,k)">
                      <input v-model="filter.checkBoxHolder" class="filter-checkbox" type="checkbox" :id="'filterCheckbox'+k+i">
                      <label :class="filter.checkBoxHolder ? 'selected-checkbox' : ''" :for="'filterCheckbox'+k+i">
                        <span class="filter-title name">{{ filter.title }}</span>
                        <span class="filter-title">({{ filter.count }})</span>
                      </label>
                    </div>
                  </template>
                </div>
              </div>
            </div> -->
          </div>
        </div>
        <div class="category-products">
          <!-- <div class="category-products-sort p10">
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
          </div> -->
          <div class="pagination">
            <LoadingSkeleton v-if="!getTotalPage" style="height:40px;width:35%"/>
            <CustomPagination v-else v-model:page="page" :totalPages="getTotalPage"/>
          </div>
          <div class="category-products-content">
            <template v-if="isProdctsFetched && filteredCategoryProducts.length === 0">
              <div class="no-data-found">
                There are no products available.
              </div>
            </template>
            <template v-else>
              <template v-for="i in getCurrentPageProdLastIndex" :key="i">
                <SkeletonCart v-if="!filteredCategoryProducts[(i + ((page-1)*perPage))-1]"/>
                <Cart
                  v-else
                  :image="getImage(filteredCategoryProducts[(i + ((page-1)*perPage))-1])"
                  :brand="filteredCategoryProducts[(i + ((page-1)*perPage))-1].brand || ''"
                  :title="filteredCategoryProducts[(i + ((page-1)*perPage))-1].title"
                  :price="filteredCategoryProducts[(i + ((page-1)*perPage))-1].price"
                  :oldPrice="filteredCategoryProducts[(i + ((page-1)*perPage))-1].oldPrice || 0"
                  :discount="filteredCategoryProducts[(i + ((page-1)*perPage))-1].discountPercentage || 1"
                  :productId="filteredCategoryProducts[(i + ((page-1)*perPage))-1].id.toString()"
                />
              </template>
            </template>
          </div>
          <div class="pagination">
            <CustomPagination v-model:page="page" :totalPages="getTotalPage"/>
          </div>
        </div>
      </div>
  </div>
</template>

<style lang="scss">
.category-container{
    @include d-flex(column,flex-start,stretch);
    .view-header{
      @include d-flex(row,space-between,center);
       border-top: 1px solid $dark5;
        border-bottom: 1px solid $dark5;
      .category-name{
        text-align: left;
        padding: 10px 0;
        margin: 10px 0;
      }
      .view-settings{
        @include d-flex-center;
        position: relative;
        .settings-icon{
          cursor: pointer;
          @include d-flex-center;
          padding: 8px;
          border-radius: 999px;
          transition: all .2s ease;
          &:hover{
            background-color: $white3;
          }
        }
        .settings-box{
          @include d-flex(column,flex-start,stretch);
          position: absolute;
          z-index: 999;
          top: 0;
          left: 0;
          transform: translateX(-110%);
          width: 200px;
          border-radius: 6px;
          padding: 8px;
          background-color: $white1;
          @include box-shadow(0,2px,8px,-4px,rgba(0,0,0));
          gap: 8px;
          @media screen and (max-width:480px) {
            top: 110%;
            left: unset;
            right: 0;
            transform: unset;
          }
          .box-haeder{
            padding: 8px;
            font-size: 14px;
            font-weight: 500;
            color: $dark5;
            text-align: center
          }
          .settings-items{
            @include d-flex(row,space-around,center);
            .settings-item{
              padding: 4px 3px;
              border-radius: 4px;
              font-size: 14px;
              color: $dark5;
              width: 25px;
              height: 25px;
              @include d-flex-center;
              cursor: pointer;
              transition: all .2s ease;
              &:hover{
                background-color: $white3;
              }
            }
            .active-settings-item{
              background-color: $white3;
            }
          }
        }
      }
    }
    .category-products-wrapper{
      @include d-flex(row,flex-start,stretch);
      @media screen and (max-width:1024px) {
        flex-direction: column;
      }
      .filter-wrapper{
        flex: 1.5 0 1px;
        @media screen and (max-width:1600px) {
          flex: 2 0 1px;
        }
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
                @media (hover: hover){
                  &:hover{
                    color: $red5;
                    background-color: $white1;
                    .filter-item-header-arrow{
                      color: $red5;
                    }
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
                  @media (hover: hover){
                    &:hover{
                      background-color: $white2;
                    }
                  }
                  
                  .name{
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    width: inherit;
                    display: block;
                    -webkit-text-size-adjust: none;
                    max-width: 100px;
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
        @media screen and (max-width:1600px) {
          flex: 8 0 1px;
        }
        .category-products-sort{
          @include d-flex(row,space-between,center);
          @media screen and (max-width:1024px) {
            padding-left: 0;
            padding-right: 0;
          }
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
        .pagination{
          padding: 10px;
          @include d-flex(row,flex-end,center);
        }
        .category-products-content{
          min-height: 400px;
          position: relative;
          padding: 10px;
          width: 100%;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
          @media screen and (max-width: 1600px) {
            grid-template-columns: repeat(3, 1fr);
          }
          @media screen and (max-width:1024px) {
            padding-left: 0;
            padding-right: 0;
          }
          @media screen and (max-width:768px) {
            grid-template-columns: repeat(2, 1fr);
          }
          @media screen and (max-width:480px){
            grid-template-columns: repeat(1, 1fr);
          }
          .no-data-found{
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            font-size: 24px;
            font-weight: 500;
            color: $gray10;
          }
        }
      }
    }
}
</style>