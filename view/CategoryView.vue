<script setup>
  import {kebabToCapitalize,getCategoryProducts,searchProd} from '@/utils/utils'
  import {getBrandFilterItems,getPriceFilterItems} from '@/utils/functions'
  import {sortByItems} from '@/enums/enum'
  import {ref,computed} from 'vue'

  const props = defineProps({
    products:{type:Array,default:()=>[]},
    title:{type:String,default:''},
    hideBreadcrump:{type:Boolean,default:false},
    sQuery:{type:String,default:''},
  })

  const route = useRoute()
  const router = useRouter()
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
  const prodHolderForFilters = ref([])
  const selectedSortItem = ref('');
  const activeFiltersList = ref([])
  const includedFilters = ref([]);
  const filtersArray = ref([
    {title:'Brand',value:'brand'},
    {title:'Price',value:'price'},
  ])
  const firstAppliedFilter = ref('');
  const isProdctsFetched = ref(false);


  const changeActiveMultiply = (item) =>{
    if(activeMultiplyItem.value === item) return;
    activeMultiplyItem.value = item;
    window.localStorage.setItem('multiplyBy',JSON.stringify(item));
    isSettingsOpen.value = false;
    generateProducts();
  }

  const clearDatas = () =>{
    page.value = 1;
    categoryProducts.value = [];
    filteredCategoryProducts.value = [];
    productHolder.value = [];
    selectedSortItem.value = '';
    activeFiltersList.value = [];
    includedFilters.value = [];
    firstAppliedFilter.value = '';
  }

  const generateProducts = async () =>{
    clearDatas();
    isProdctsFetched.value = false;
    categoryProducts.value = props.sQuery ? await searchProd(props.sQuery) : await getCategoryProducts(_category,null,activeMultiplyItem.value);
    filteredCategoryProducts.value =[...categoryProducts.value];
    productHolder.value = [...categoryProducts.value];
    prodHolderForFilters.value = [...categoryProducts.value];
    isProdctsFetched.value = true;
  }

  const getCurrentPageProdLastIndex = computed(() => {
    return filteredCategoryProducts.value.length === 0 ? perPage.value : filteredCategoryProducts.value.length < (page.value * perPage.value) ? ((filteredCategoryProducts.value.length % perPage.value)) : perPage.value
  })

  const getTotalPage = computed(() => {
    return Math.ceil(filteredCategoryProducts.value.length/perPage.value)
  })

  const filterChilds = computed(() => {
    return {
      'brand': getBrandFilterItems(firstAppliedFilter.value !== 'brand' ? prodHolderForFilters.value : categoryProducts.value,'brand'),
      'price': getPriceFilterItems(firstAppliedFilter.value !== 'price' ? prodHolderForFilters.value : categoryProducts.value,5),
    }
  })

  const openFilter = (item) =>{
    if(activeFiltersList.value.includes(item.value)){
      activeFiltersList.value.splice(activeFiltersList.value.indexOf(item.value),1);
    }
    else{
      activeFiltersList.value.push(item.value);
    }
  }

  const addToFilter = (filter,val) =>{
    if(!!includedFilters.value.find(e=>e.filter.title === filter.title)){
      includedFilters.value.splice(includedFilters.value.findIndex(e=>e.filter.title === filter.title),1);
    }else{
      filter.checkBoxHolder = true;
      includedFilters.value.push({val,filter});
    }

    if(firstAppliedFilter.value === val){
      let indexHolder = [];
      for(let i=0;i<includedFilters.value.length;i++){
        if(includedFilters.value[i].val !== val){
          indexHolder.push(i);
        }
      }

      for(let i=0;i< indexHolder.length;i++){
        includedFilters.value.splice(indexHolder[i]-i,1)
      }
    }

    applyFilter();

    if(val === firstAppliedFilter.value){
      prodHolderForFilters.value = [...filteredCategoryProducts.value];
    }
  }

  const applyFilter = () => {
    let filterKeys = [...new Set(includedFilters.value.map(e=>e.val).filter(e=>e))].filter(e=>e);
    let activeProds = [...categoryProducts.value];

    const filterQueryHolder = {};
    const includedFiltersMap = {};
    for(let included of includedFilters.value){
      if(!Object.prototype.hasOwnProperty.call(includedFiltersMap,included.val)){
        includedFiltersMap[included.val] = []
      }
      includedFiltersMap[included.val].push(included.filter);
    }

    for(let key in includedFiltersMap){
      let res = [];
      for(let filt of includedFiltersMap[key]){
        for(let item of activeProds){
          if(key === 'price'){
            if((item[key] > filt.min && item[key] <= filt.max) || item[key] === filt.max){
              res.push(item);
            }
          }
          else{
            if(item[key] === filt.value){
              res.push(item);
            }
          }
        }
        if(!Object.prototype.hasOwnProperty.call(filterQueryHolder,key)){
          filterQueryHolder[key] = []
        }

        filterQueryHolder[key].push(filt.value);
      }
      activeProds = res;
    }

    filteredCategoryProducts.value = activeProds;
    productHolder.value = [...filteredCategoryProducts.value];

    if(!firstAppliedFilter.value || !filterKeys.includes(firstAppliedFilter.value)){
      firstAppliedFilter.value = filterKeys[0] ?? '';
      prodHolderForFilters.value = [...filteredCategoryProducts.value];
    }

    let filterQuery = Object.keys(filterQueryHolder).map(e=>{
      return `${firstAppliedFilter.value === e ? `f_${e}` : e}=${filterQueryHolder[e].join(',')}`
    }).join('&');

    let queryPath = `${route.path}?${filterQuery}`;
    router.push(queryPath);
    if(filterKeys.length === 0){
      firstAppliedFilter.value = '';
      prodHolderForFilters.value = [...filteredCategoryProducts.value];
    }

    sortProducts();
  }

  const sortProducts = () =>{
    if(selectedSortItem.value){
      let sortItem = sortByItems.find(e=>e.value === selectedSortItem.value)
      productsSort(sortItem.sortKey,sortItem.type)
    }
    else{
      clearSort();
    }
  }

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

  const getImage = (item) =>{
    return item?.images[item?.randomImageIndex || 0] || ''
  }

  const addToFilterFromQuery = () =>{
    let queryFilters = {};
    for(let key in route.query){
      if(key.includes('f_')){
        firstAppliedFilter.value = key.replace('f_','');
      }
      queryFilters[key.replace('f_','')] = route.query[key]?.split(',')?.map(e=>e.trim()) || [];
    }

    if(firstAppliedFilter.value){
      let filters = filterChilds.value[firstAppliedFilter.value]?.filter(e=>queryFilters[firstAppliedFilter.value]?.includes(e.value)) || [];
      for(let filter of filters){
        addToFilter(filter,firstAppliedFilter.value);
      }
      delete queryFilters[firstAppliedFilter.value];
    }

    for(let key in queryFilters){
      let filters = filterChilds.value[key]?.filter(e=>queryFilters[key]?.includes(e.value)) || [];
      for(let filter of filters){
        addToFilter(filter,key);
      }
    }
  }

  onMounted(async () => {
    if(window.localStorage.getItem('multiplyBy')){
      activeMultiplyItem.value = JSON.parse(window.localStorage.getItem('multiplyBy'));
    }
    else{
      window.localStorage.setItem('multiplyBy',JSON.stringify(1));
    }

    await generateProducts();

    if(Object.keys(route.query).length > 0){
      addToFilterFromQuery();
    }
  })

  useHead({
    title: `${kebabToCapitalize(breadCrumbArr.at(-1))}`,
    meta: [
      { name: 'description', content: `Discover the most popular products in the ${kebabToCapitalize(breadCrumbArr.at(-1))} category with Artisan.` },

      // Open Graph
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: `${kebabToCapitalize(breadCrumbArr.at(-1))} | Artisan` },
      { property: 'og:description', content: `Explore trending products in the ${kebabToCapitalize(breadCrumbArr.at(-1))} category.` },
      { property: 'og:image', content: 'https://artisanzen.vercel.app/logo.png' },
      { property: 'og:url', content: `https://artisanzen.vercel.app/category/${kebabToCapitalize(breadCrumbArr.at(-1))}` },

      // Twitter
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: `${kebabToCapitalize(breadCrumbArr.at(-1))} | Artisan` },
      { name: 'twitter:description', content: `Explore trending products in the ${kebabToCapitalize(breadCrumbArr.at(-1))} category.` },
      { name: 'twitter:image', content: 'https://artisanzen.vercel.app/logo.png' }
    ]
  })
  
</script>

<template>
  <div class="category-container container-main">
      <Breadcrumb
        v-if="!hideBreadcrump"
        :categoryArr="breadCrumbArr"
      />
      <div class="view-header">
        <h1 class="category-name" v-if="!props.sQuery">
          {{ props.title || kebabToCapitalize(breadCrumbArr.at(-1)) }}
        </h1>
        <div class="category-name search-name" v-else>
          <span>Search results for </span>{{ props.sQuery }}
        </div>
        <div class="view-settings" v-if="false">
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
        </div>
      </div>
      
      <div class="category-products-wrapper">
        <div class="filter-wrapper" v-if="!(isProdctsFetched && categoryProducts.length === 0)">
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
                  <template v-for="(included,t) in includedFilters" :key="'included'+t+i">
                    <div v-if="included.val === item.value" class="filter-item-children included" @change="addToFilter(included.filter,item.value)">
                      <input v-model="included.filter.checkBoxHolder" class="filter-checkbox" type="checkbox" :id="'includedfilterCheckbox'+t+i">
                      <label :class="included.filter.checkBoxHolder ? 'selected-checkbox' : ''" :for="'includedfilterCheckbox'+t+i">
                        <span class="filter-title name">{{ included.filter.title }}</span>
                        <span class="filter-title">({{ included.filter.count }})</span>
                      </label>
                    </div>
                  </template>
                  <template v-for="(filter,k) in (filterChilds[item?.value] || [])" :key="'filterChild'+k+i">
                    <div v-if="filter.count" :class="['filter-item-children',!!includedFilters.find(e=>e.filter.title === filter.title) ? 'hide' : '']" @change="addToFilter(filter,item.value)">
                      <input class="filter-checkbox" type="checkbox" :id="'filterCheckbox'+k+i">
                      <label :for="'filterCheckbox'+k+i">
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
          <div class="category-products-sort p10" v-if="!(isProdctsFetched && filteredCategoryProducts.length === 0)">
            <select name="sortBy" v-model="selectedSortItem" @change="sortProducts" class="sort-select-box">
              <option selected value="">Sort By</option>
              <option v-for="(sortItem,i) in sortByItems" :key="'sortItems'+i" :value="sortItem.value">{{ sortItem.title }}</option>
            </select>
            <div class="category-items-info">
              <div class="total-count">
                <span>{{ filteredCategoryProducts.length }}</span> products
              </div>
              <div class="view-per-page">
                View <span>{{ perPage }}</span> per page
              </div>
            </div>
          </div>
          <div class="pagination">
            <LoadingSkeleton v-if="!getTotalPage && !(isProdctsFetched && filteredCategoryProducts.length === 0)" style="height:35px;width:35%"/>
            <CustomPagination v-else-if="!(isProdctsFetched && filteredCategoryProducts.length === 0)" v-model:page="page" :totalPages="getTotalPage"/>
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
            <LoadingSkeleton v-if="!getTotalPage && !(isProdctsFetched && filteredCategoryProducts.length === 0)" style="height35px;width:35%"/>
            <CustomPagination v-else-if="!(isProdctsFetched && filteredCategoryProducts.length === 0)" v-model:page="page" :totalPages="getTotalPage"/>
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
      .search-name{
        font-size: 18px;
        font-weight: 500;
        color: $dark5;
        span{
          font-size: 16px;
          color: $gray9;
          font-weight: 400;
          margin-left: 4px;
        }
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