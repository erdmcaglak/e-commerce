<script setup>
  import {getRandomCategories,getProducts,searchProd} from '@/utils/utils'
  import {ref,inject} from 'vue';
  const props = defineProps({
    modeCheckout:{type:Boolean,default:false}
  })

  const isClickedHamMenu = ref(false);
  const isOpenedSearch = ref(false);
  const {basketItemCount} = inject('basketItemCount')

  const searchBoxCategories = ref([]);  
  const searchBoxCatProds = ref({});
  const search = ref('');
  const searchProds = ref([]);

  const _debounce = ref();

  const router = useRouter();
  const route = useRoute();

  const openSearch = () =>{
    isOpenedSearch.value = true;
  }

  const toggleMenu = () =>{
    isClickedHamMenu.value = !isClickedHamMenu.value
    let menu = document.querySelector('.menu-wrapper');

    if(isClickedHamMenu.value){
      menu.classList.add('slide-menu-ttb');
      if(menu.classList.contains('slide-menu-btt')){       
        menu.classList.remove('slide-menu-btt')
      }
    }
    else{
      menu.classList.add('slide-menu-btt');
      if(menu.classList.contains('slide-menu-ttb')){
        menu.classList.remove('slide-menu-ttb')
      }
      setTimeout(()=>{
        menu.classList.remove('slide-menu-btt');
      },150)
    }     
  }

  const getControlledProds = (category,limit,arr) =>{
    return new Promise(async (resolve,reject)=>{
      if(!arr){
        let temp = await getCategoryProducts(category,limit);
        resolve(temp);
      }
      else{
        let temp = arr.filter(e=>e.category == category).slice(0,limit);
        resolve(temp);
      }
    })
  }

  const goToSearchPage = (e) =>{
    if(search.value){
      router.push('/search?q='+search.value);
      search.value = '';
      setTimeout(()=>{
        isOpenedSearch.value = false;
      })
    }
  }

  const generateCategories = async (arr,prods) =>{
    searchBoxCategories.value = arr;
    searchBoxCatProds.value = {};
    for(let item of searchBoxCategories.value){
      let key = getProductCategory(item).categoryArr.filter(e=>e).join('||');
      let data = await getControlledProds(key.split('||').at(-1),8,prods);
      searchBoxCatProds.value[key] = data;
    }
  }

  const generateRandom =async () =>{
    const temp = await getRandomCategories(4);
    generateCategories(temp);
    searchBoxCatProds.value['random'] = await getProducts(8);
  }
  
  onMounted(async () => {
    generateRandom();
    window.addEventListener('click',()=>{
      isOpenedSearch.value && (isOpenedSearch.value = false);
    })
  })

  watch(search, (newValue, oldValue) => {
    if(_debounce.value){
      clearTimeout(_debounce.value);
    }

    if(!isOpenedSearch.value){
      isOpenedSearch.value = true;
    }

    if(!newValue){
      generateRandom();
      return;
    }

    _debounce.value = setTimeout(async ()=>{
      searchProds.value = await searchProd(newValue);
      generateCategories(Array.from(new Set(searchProds.value.map(e=>e.category))),searchProds.value);
      searchBoxCatProds.value['random'] = searchProds.value.slice(0,8);
      if(searchProds.value.length === 0){
        searchBoxCatProds.value['empty'] = await getProducts(8);
      }
      else if(Object.prototype.hasOwnProperty.call(searchBoxCatProds.value,'empty')){
        delete searchBoxCatProds.value['empty'];
      }
    },300)
  });

  watch(() => route.path,
    (newPath) => {
      if (newPath !== '/search' && search.value) {
        search.value = '';
      }
    }
  )
</script>
<template>
  <div class="container">
    <div class="app-bar-wrapper p10">
      <NuxtLink class="logo-wrapper" to="/">
        <img src="/logo.png" alt="Artisan">
      </NuxtLink>
      <div class="search-area">
        <div v-if="!props.modeCheckout" class="search-wrapper" @click.stop>
          <Icon name="mdi:magnify" color="black" size="24"/>
          <input ref="searchInp1" @focus="openSearch" @keypress.enter="goToSearchPage" v-model="search" type="search" autocomplete="off" spellcheck="false" placeholder="Search">
        </div>
        <transition name="fade"> 
          <SearchBox v-if="isOpenedSearch" :categories="searchBoxCategories" :products="searchBoxCatProds" @close="isOpenedSearch=false">
            <template v-slot:search-input>
              <input ref="searchInp2" @keypress.enter="goToSearchPage" v-model="search" type="search" autocomplete="off" spellcheck="false" placeholder="Search">
            </template>
          </SearchBox>
        </transition>
      </div>
      
      <div class="app-bar-actions">
        <div v-if="!props.modeCheckout" :class="['hamburger-wrapper', isClickedHamMenu ? 'close' : '']" @click="toggleMenu">
          <span class="child-1"></span>
          <span class="child-2"></span>
          <span class="child-3"></span>
        </div>
        <!-- <div class="icon-wrapper">
          <Button
            icon="mdi:account"
            fontSize="24px"
            fontColor="#000"
            text
            hoveredBackground="transparent"
            background="transparent"
            hoveredColor="#000"
            padding="0"
          />
        </div> -->
        <NuxtLink to="/cart" class="icon-wrapper">
          <Button
            icon="mdi:cart-outline"
            fontSize="24px"
            fontColor="#000"
            text
            hoveredBackground="transparent"
            background="transparent"
            hoveredColor="#000"
            padding="0"
          />
          <div  v-if="basketItemCount>0" class="cart-item-count">
            {{basketItemCount}}
          </div>
        </NuxtLink>
        <div class="icon-wrapper search" @click.stop>
          <Button
            @clickTrigger="openSearch"
            icon="mdi:search"
            fontSize="24px"
            fontColor="#000"
            text
            hoveredBackground="transparent"
            background="transparent"
            hoveredColor="#000"
            padding="0"
          />
        </div>
      </div>
    </div>
    <Menu v-if="!props.modeCheckout" @toggleMenu="toggleMenu"/>
  </div>
</template>
<style lang="scss" scoped>
.container{
  @include d-flex(column,flex-start,stretch);
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 999;
  @media screen and (max-width:768px){
    position: relative;
  }
  .app-bar-wrapper{
    border-bottom: 1px solid $gray1;
    position: relative;
    width: 100%;
    @include d-flex(row,space-between,center);
    transition: all .2s ease;
    z-index: 3;
    background-color: $white1;
    @media screen and (max-width:768px) {
      @include d-flex(column,flex-start,stretch);
      padding-bottom: 0;
    }
    .hide{
      height: 0!important;
      overflow: hidden;
      opacity: 0;
    }
    .logo-wrapper{
      cursor: pointer;
      user-select: none;
      @include d-flex-center;
      padding: 4px;
      position: relative;
      @media screen and (max-width:768px) {
        width:100%;
      }
    }
    .search-area{
      position: relative;
      width: 35%;
      @media screen and (max-width:1024px) {
        position: unset;
      }
      @media screen and (max-width:768px) {
        position: unset;
      }
      .search-wrapper{
        background-color: $white1;
        gap: 6px;
        height: fit-content;
        transition: all .2s ease;
        @include d-flex(row,flex-start,center);
        border: 1px solid $gray5;
        border-radius: 4px;
        padding-left: 6px;
        @media screen and (max-width:768px) {
          width: 100%;
          display: none;
        }
        input{
          flex: 1 0 1px;
          outline: none;
          border: none;
          font-size: 16px;
          height: 100%;
          padding: 10px 6px;
          border-radius: 4px;
          @media screen and (max-width:768px) {
            display: none;
          }
        }
      }
    }
    .app-bar-actions{
      @include d-flex-center;
      gap: 4px;
      padding: 0 10px;
      @media screen and (max-width:768px) {
        padding: 10px;
        @include d-flex(row,space-around,center);
      }
      .icon-wrapper{
        position: relative;
        transition: all .2s ease;
        padding: 6px;
        border-radius: 99px;
        cursor: pointer;
        @media (hover: hover) {
          &:hover{
            background-color: $white3;
          }
        }
        .cart-item-count{
          position: absolute;
          right: 0;
          top: 0;
          background-color: $red12;
          width: 15px;
          height: 15px;
          border-radius: 999px;
          font-weight: 700;
          font-size: 8px;
          color: #fff;
          @include d-flex-center;
          line-height: 1;
          padding-bottom: 1px;
        }
      }
      .search{
        display: none;
        @media screen and (max-width:768px) {
          display: block;
        }
      }
      .hamburger-wrapper{
        @media screen and (max-width:768px) {
          display: block;
        }
        display: none;
        padding: 6px;
        cursor: pointer;
        user-select: none;
        width: 24px;
        height: 12px;
        position: relative;
        .child-1{
          transition: all .2s ease;
          position: absolute;
          left: 0;
          top: 0;
          height: 2px;
          width: 100%;
          background-color: $dark1;
          border-radius: 99px;
        }
        .child-2{
          transition: all .2s ease;
          position: absolute;
          left: 0;
          top: 50%;
          height: 2px;
          width: 100%;
          background-color: $dark1;
          border-radius: 99px;
        }
        .child-3{
          transition: all .2s ease;
          position: absolute;
          left: 0;
          top: 100%;
          height: 2px;
          width: 100%;
          background-color: $dark1;
          border-radius: 99px;
        }
      }
      .close{
        height:17px;
        .child-1{
          transform: rotate(45deg);
          transform-origin: left;
        }
        .child-2{
          opacity: 0;
        }
        .child-3{
          transform: rotate(-45deg);
          transform-origin: left;
        }
      }
    }
  }
  .slide-menu-ttb{
    transform: translate(0,0);
    animation: .2s 1 alternate slideTtb;
    display: flex!important;
  }
  .slide-menu-btt{
    animation: .2s 1 alternate slideBtt;
    display: flex!important;
  }
}

@keyframes slideTtb {
  from{
    transform: translate(0, -100%);
    opacity: 0;
  }
  to{
    transform: translate(0, 0);
    opacity: 1;
  }
}

@keyframes slideBtt {
  from{
    transform: translate(0, 0);
    opacity: 1;
  }
  to{
    transform: translate(0, -100%);
    opacity: 1;
  }
}

</style>