<script setup>
  import {ref,watch} from 'vue'
  import {getProductDetail,getProductCategory,getCategoryProducts} from "@/utils/utils"  
  
  const { alert, setAlert } = inject('alert')
  const route = useRoute()
  const {productId} = route.params;

  const currentProd = await getProductDetail(productId)
  const activeProdImage = ref(currentProd.images[0])
  const selectedOptions = ref({
    color:'',
    size:''
  })
  const quantity = ref(1)
  const prodCategory = getProductCategory(currentProd.category);
  const pdpWidgetProds = await getCategoryProducts(currentProd.category,15)

  watch(quantity, async (newVal, oldVal) => {
    if(newVal < 1){
      quantity.value = 1;
    }
    else if(newVal > currentProd.stock){
      quantity.value = currentProd.stock
    }
  })

  const changeImage = (image) =>{
    activeProdImage.value = image;
  }

  const decreaseQuantity = () =>{
    quantity.value--;
  }
  const increaseQuantity = () =>{
    quantity.value++;
  }

  const updateOptions = (option)=>{
    if(option.type==='color'){
      selectedOptions.value.color = option.item
    }
    else{
      selectedOptions.value.size = option.item
    }
  }

  const addToBasket = () =>{
    //TODO size ve renk seçim kontrol yapılacak
    let basketItems = [];
    let isCanAdd = true;

    if(prodCategory.categoryObj?.options?.length >1){
      if(!selectedOptions.value.color || !selectedOptions.value.size){
        isCanAdd=false;
      }
    }
    else if(prodCategory.categoryObj?.options?.length === 1){
      if(!selectedOptions.value.color && !selectedOptions.value.size){
        isCanAdd=false;
      }
    }

    if(isCanAdd){
      if(window.localStorage.getItem('basket-items')){
        basketItems = JSON.parse(window.localStorage.getItem('basket-items'));
      }
      let currentProdInBasket = basketItems.find(e=>e.item.id === currentProd.id && JSON.stringify(e.options) === JSON.stringify(selectedOptions.value));
      
      if(currentProdInBasket && JSON.stringify(currentProdInBasket.options) === JSON.stringify(selectedOptions.value)){
        if(currentProdInBasket.quantity + quantity.value > currentProd.stock){
          setAlert({title:"You Have Maximum Quantity",type:'warning'});
          return
        }
        currentProdInBasket.quantity += quantity.value
      }
      else{
        basketItems.push({
          options:selectedOptions.value,
          item:currentProd,
          quantity:quantity.value
        })
      }

      setAlert({title:"Product Added To Basket",type:'success'})

      window.localStorage.setItem('basket-items',JSON.stringify(basketItems));
    }
    else{
      let alertTitle = "";
      if(!selectedOptions.value.color){
        alertTitle = "Please Select a Color"
      }
      else if(!selectedOptions.value.size){
        alertTitle = "Please Select a Size"
      }
      setAlert({title:alertTitle,type:'warning'})
    }
    
  }

</script>

<template>
  <div class="product-page-main container-main">
    <div class="breadcrumb">
      <Breadcrumb
      :categoryArr="prodCategory?.categoryArr || []"
    />
    </div>
    <div class="product-details">
      <div class="product-image-area">
        <div class="main-image">
          <img :src="activeProdImage" :alt="currentProd.thumbnail">
        </div>
        <div class="product-images-wrapper">
          <div class="product-images">
            <template v-for="index in 5" :key="'image'+index">
              <div @click="changeImage(currentProd.images[index-1])" :class="['small-image-wrapper',currentProd.images[index-1] === activeProdImage ? 'active-small-image' : '']">
                <img class="small-image" v-if="currentProd.images[index-1]" :src="currentProd.images[index-1]" :alt="currentProd.title">
              </div>
            </template>
          </div>
        </div>
        
      </div>
      <div class="product-info-area">
        <div class="names-area">
          <div class="prod-brand">
            {{currentProd.brand}}
          </div>
          <div class="prod-title">
            {{currentProd.title}}
          </div>
          <div class="prod-desc">
            {{currentProd.description}}
          </div>
        </div>
        <div class="price-and-rating-area">
          <div class="rating-wrapper">
            <div class="stars">
              <div class="rating-container">
                <svg v-for="index in 5" :key="'star'+index" fill="none" focusable="false" width="14" height="14" viewBox="0 0 14 13">
                  <path d="M7 0L8.6458 4.73475L13.6574 4.83688L9.66296 7.86525L11.1145 12.6631L7 9.8L2.8855 12.6631L4.33704 7.86525L0.342604 4.83688L5.3542 4.73475L7 0Z" fill="transparent"></path>
                </svg>
              </div>
              <div :style="{width:((currentProd.rating)*20)+'%'}" class="filled">
                <div class="rating-container">
                  <svg v-for="index in 5" :key="'star'+index" fill="none" focusable="false" width="14" height="14" viewBox="0 0 14 13">
                    <path d="M7 0L8.6458 4.73475L13.6574 4.83688L9.66296 7.86525L11.1145 12.6631L7 9.8L2.8855 12.6631L4.33704 7.86525L0.342604 4.83688L5.3542 4.73475L7 0Z" fill="#000"></path>
                  </svg>
                </div>
              </div>
            </div>
            <div class="rating-count">
              ({{currentProd.rating}})
            </div>
          </div>
          <div class="price-wrapper">
            <div v-if="currentProd.oldPrice" class="old-price">
              ${{currentProd.oldPrice}}
            </div>
            <div :class="['price', currentProd.oldPrice ? 'color-red' : '']">
              ${{currentProd.price}}
            </div>
          </div>
        </div>
        <template v-if="prodCategory.categoryObj?.options">
          <Sizes
            v-for="(item,i) in prodCategory.categoryObj?.options"
            :key="'prodSize'+i"
            :sizeType="item"
            :excludeList="currentProd.id%5"
            @selectTrigger="updateOptions"
          />
        </template>
        <div class="add-to-basket-area">
          <div class="quantity-wrapper">
            <Button
              icon="mdi:minus"
              @clickTrigger="decreaseQuantity"
            />
            <input @input="stockControl" v-model="quantity" :min="1" :max="currentProd.stock" class="quantity-input" type="number">
            <Button
              icon="mdi:plus"
              @clickTrigger="increaseQuantity"
            />
          </div>
          <Button
            class="add-to-basket-btn"
            icon="mdi:plus"
            title="Add To Basket"
            @clickTrigger="addToBasket"
          />
        </div>
      </div>
    </div>
    <Slider
      sliderTitle="Similar Products"
      :sliderList= "pdpWidgetProds"
    />
  </div>
</template>

<style lang="scss">
.product-page-main{
  @include d-flex(column,flex-start,stretch);
  gap: 20px;
  .breadcrumb{
    padding: 10px 0;
  }
  .product-details{
    @include d-flex(row,flex-start,flex-start);
    gap: 20px;
    @media screen and (max-width:768px) {
      @include d-flex(column,flex-start,stretch);
    }
    .product-image-area{
      flex: 1 0 1px;
      @include d-flex(column,flex-start,flex-start);
      gap: 10px;
      .main-image{
        width: 100%;
        object-fit: contain;
        height: 600px;
        overflow: hidden;
        @include d-flex-center;
        @media screen and (max-width:480px) {
          height: 450px;
        }
        @media screen and (max-width:390px) {
          height: 350px;
        }
        img{
          object-fit: contain;
          width: 100%;
        }
      }
      .product-images-wrapper{
        overflow: auto;
        width: 100%;
        .product-images{
          @include d-flex(row,flex-start,flex-start);
          padding: 10px 0;
          gap: 10px;
          min-width: 460px;
          .small-image-wrapper{
            width: 75px;
            height: 75px;
            cursor: pointer;
            transition: all .1s ease;
            overflow: hidden;
            @include d-flex-center;
            filter: grayscale(.8);
            border: 2px solid transparent;
            .small-image{
              width: 100%;
              object-fit: contain;
            }
          }
          .active-small-image{
            filter: none;
            border: 2px solid $red3;
          }
        }
      }
      
    }
    .product-info-area{
      position: sticky;
      top: 130px;
      flex: 1 0 1px;
      @include d-flex(column,flex-start,flex-start);
      gap: 10px;
      padding: 20px 10px;
      .names-area{
         @include d-flex(column,flex-start,flex-start);
         gap: 6px;
        .prod-brand{
          color: $dark15;
          font-weight: 700;
          font-size: 18px;
          text-transform: capitalize;
        }
        .prod-title{
          text-transform: capitalize;
          font-size: 22px;
          color: $dark10;
        }
        .prod-desc{
          @include d-flex(row,flex-start,center);
          text-align: left;
          font-size: 14px;
          color: $gray10;
        }
      }
      .price-and-rating-area{
        @include d-flex(column,flex-start,flex-start);
        gap: 10px;
        .price-wrapper{
          @include d-flex(row,flex-start,center);
          font-size: 24px;
          gap: 6px;
          .old-price{
            color: $gray8;
            position: relative;
            &::before{
              content: "";
              position: absolute;
              left: 0;
              top: 50%;
              transform: translateY(-50%);
              height: 3px;
              border-radius: 999px;
              z-index: 1;
              background-color: $gray8;
              width: 100%;
            }
          }
          .price{
            color: $dark7;
            font-weight: 700;
          }
          .color-red{
            color: $red12!important;
          }
        }
        .rating-wrapper{
          @include d-flex(row,flex-start,center);
          position: relative;
          gap: 8px;
          .stars{
            position: relative;
            .rating-container{
              position: relative;
              left: 0;
              @include d-flex(row,flex-start,center);
              gap: 4px;
              svg{
                stroke: $dark15;
              }
            }
            .filled{
              position: absolute;
              left: 0;
              @extend .rating-container;
              top: 50%;
              transform-origin:right ;
              transform: translateY(-50%);
              overflow: hidden;
            }
          }
          
          .rating-count{
            font-size: 16px;
            color: $dark6;
          }
        }
      }
      .add-to-basket-area{
        @include d-flex(row,flex-start,stretch);
        gap: 10px;
        width: 100%;
        @media screen and (max-width:480px) {
          @include d-flex(column,flex-start,stretch);
        }
        .quantity-wrapper{
          flex: 0 0 auto;
          @include d-flex(row,flex-start,stretch);
          gap: 4px;
          .quantity-input{
            max-width: 50px;
            padding: 6px 10px;
            border-radius: 0;
            font-size: 16px;
            outline: none;
            border: 1px solid $gray3;
            text-align: center;
            &::-webkit-outer-spin-button,
            &::-webkit-inner-spin-button {
              -webkit-appearance: none;
              margin: 0;
            }
            @media screen and (max-width:480px) {
              flex: 1 0 1px;
              max-width: 100%;
            }
          }
        }
        .add-to-basket-btn{
          flex: 1 0 1px;
          color: $white1;
          background-color: $dark13;
          border: 1px solid $dark13;
          &:hover{
            background-color: transparent;
            color: $dark13;
          }
        }
      }
    }
  }
}
</style>