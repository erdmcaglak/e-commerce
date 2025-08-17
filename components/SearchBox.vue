<script setup>
  import {getProductCategory,getCategoryProducts} from '@/utils/utils'
  import {ref} from 'vue';
  const router = useRouter();

  const props = defineProps({
    products:{type:Object,default:()=>{return {}}},
    categories:{type:Array,default:()=>[]}
  })

  const categories = ref([]);
  const activeCat = ref('');
  const searchInp = ref(null);
  const emit = defineEmits(['close']);

  const fillCategories = () =>{
    activeCat.value = '';
    const arr = [];
    for(let cat of props.categories){
      arr.push({
        title:getProductCategory(cat,true).categoryArr.filter(e=>e).at(-1),
        route:getProductCategory(cat).categoryArr.join('/'),
        category: getProductCategory(cat).categoryArr.filter(e=>e).join('||'),
      })
    }

    categories.value = arr.splice(0,6);
  }

  watch(()=>props.categories, (newValue, oldValue) => {
    fillCategories();
  },{
    immediate:true,
    deep:true
  });

  onMounted(() => {
    fillCategories();
  });

  const goToRoute = (category) =>{
    router.push('/category'+category.route);
    emit('close');
  }

</script>
<template>
  <div class="search-box-wrapper" @click.stop>
    <div class="cancel-and-search">
      <div class="search-input-wrapper">
        <Icon name="mdi:magnify" color="black" size="24"/>
        <slot ref="searchInp" name="search-input"></slot>
        <Icon name="mdi:magnify" color="black" size="24"/>
      </div>
      <div class="cancel" @click="()=>{emit('close')}">
        Cancel
      </div>
    </div>
    <template v-if="props.products[activeCat || 'random']?.length !== 0">
      <div class="search-box-categories">
        <div class="category-header">
          <span>Categories</span>
          <Icon v-if="activeCat" @click="activeCat = ''" style="cursor:pointer" name="mdi:undo-variant" color="black" size="18"/>
        </div>
        <Divider/>
        <div :class="['category-item',activeCat===category.category ? 'active' : '']" v-for="(category,i) in categories" :key="'category'+i" @mouseenter="activeCat=category.category" @click="goToRoute(category)">
          {{ category.title }}
        </div>
        <div class="search-artisan-logo">
          <img src="/logo.png" alt="Artisan">
        </div>
      </div>
      <div class="search-box-products">
        <Cart
          small
          v-for="(item,i) in (props.products[activeCat || 'random'])" 
          :key="'searcboxCart'+i + item.id"
          :image="item.images[0]"
          :brand="item.brand || ''"
          :title="item.title"
          :price="item.price"
          :oldPrice="item.oldPrice || 0"
          :discount="item.discountPercentage || 1"
          :productId="item.id.toString()"
          :class="'search-box-cart-item'"
          @click="$emit('close')"
        />
      </div>
    </template>
    <template v-else>
      <div class="empty-search-wrapper">
        <div class="search-icon-wrapper">
          <Icon name="mdi:magnify" color="#6D6D6D" size="64"/>
        </div>
        <div class="empty-search-text">No products found</div>
        <div class="empty-search-text">Try searching for something else</div>
        <div class="search-box-products">
          <Cart
            small
            v-for="(item,i) in (props.products['empty'])" 
            :key="'emptySearch'+i + item.id"
            :image="item.images[0]"
            :brand="item.brand || ''"
            :title="item.title"
            :price="item.price"
            :oldPrice="item.oldPrice || 0"
            :discount="item.discountPercentage || 1"
            :productId="item.id.toString()"
            :class="'search-box-cart-item'"
          />
        </div>
      </div>
      
    </template>
  </div>
</template>


<style lang="scss">
.search-box-wrapper{
  padding: 8px;
  border-radius: 4px;
  position: absolute;
  left: 50%;
  top: calc(100% + 1px);
  transform: translateX(-50%);
  min-width: 900px;
  min-height: 300px;
  z-index: 9999;
  background-color: #fff;
  @include box-shadow(0,2px,8px,-4px,rgba(0,0,0));
  @include d-flex(row,flex-start,stretch);
  @media screen and (max-width:1024px) {
    min-width: unset;
    max-width: unset;
    width: 100%;
  }
  @media screen and (max-width:768px) {
    display: block;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    transform: unset;
    border-radius: 0;
    overflow: auto;
  }
  .cancel-and-search{
    display: none;
    gap: 4px;
    margin-bottom: 8px;
    @media screen and (max-width:768px) {
      width: 100%;
      @include d-flex(row,flex-start,center);
    }
    .search-input-wrapper{
      flex: 1;
      @include d-flex(row,flex-start,center);
      background-color: $white1;
      gap: 6px;
      height: fit-content;
      transition: all .2s ease;
      border: 1px solid $gray5;
      border-radius: 4px;
      padding-left: 6px;
      input{
        flex: 1 0 1px;
        outline: none;
        border: none;
        font-size: 16px;
        height: 100%;
        padding: 10px 6px;
        border-radius: 4px;
      }
    }
    .cancel{
      padding: 0 4px;
      flex: 0;
      cursor: pointer;
      color: $primary_blue;
      font-size: 16px;
      font-weight: 600;
    }
  }
  .empty-search-wrapper{
    @include d-flex(column,flex-start,stretch);
    gap: 8px;
    width: 100%;
    .empty-search-text{
      text-align: center;
      font-size: 16px;
      color: $gray12;
      font-weight: 600;
    }
    .empty-search-text:nth-child(2){
      color: $gray11;
      font-size: 14px;
    }
    .search-icon-wrapper{
      @include d-flex-center;
    }
  }
  .search-box-categories{
    position: relative;
    min-width: 200px;
    flex: 2;
    @include d-flex(column,flex-start,stretch);
    gap: 4px;
    position: relative;
    border-right: 1px solid $white3;
    @media screen and (max-width:768px) {
      min-width:unset;
      width: 100%;
      border-right: unset;
    }
    .category-header{
      @include d-flex(row,space-between,center);
      padding: 4px 4px 0px;
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
    .search-artisan-logo{
      position: absolute;
      bottom: 20px;
      left: 0;
      width: 100%;
      @include d-flex-center;
      img{
        width: 100%;
        height: auto;
        max-width: 120px;
        max-height: 50px;
      }
      @media screen and (max-width:768px) {
        display: none;
      }
    }
  }
  .search-box-products{
    overflow: hidden;
    padding: 4px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-column-gap: 8px;
    grid-row-gap: 8px;
    flex: 5;
    min-width: 500px;
    @media screen and (max-width:768px) {
      grid-template-columns: repeat(2, 1fr);
      min-width: unset;
    }
    .search-box-cart-item{
      transition: all .2s ease; 
      &:hover{
        transform: scale(1.02);
        @include box-shadow(0,2px,16px,-8px,rgba(0,0,0));
      }
    }
  }
}
</style>