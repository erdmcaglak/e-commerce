<script setup>
  import {ref,watch,computed} from 'vue'
  import {priceFixer,customHttp,generateTaxId} from "@/utils/utils"

  const { alert, setAlert } = inject('alert')
  const router = useRouter();
  const models = ref({
    name:'',
    lastName:'',
    phone:'',
    address:'',
    city:'',
    country:'',
    mail:'',
    note:''
  })
  const cartItems = ref([])

  const deliveryInputs = [
    [
      {title:'First Name',model:'name',require:true},
      {title:'Last Name',model:'lastName',require:true},
    ],
    {title:'Phone',model:'phone',require:true},
    {title:'Address',model:'address',type:'textField',require:true},
    {title:'Country',model:'country',require:true},
    {title:'Town/City',model:'city',require:true},
  ] 

  const additionalInputs = [
    {title:'E-mail',model:'mail'},
    {title:'Note',model:'note'},
  ]

  onMounted(()=>{
    cartItems.value = JSON.parse(window.localStorage.getItem('basket-items'))
  })

  const checkRequireInputs = (inputs) =>{
    let isNotEmpty = true;
    for(let item of inputs){
      if(Array.isArray(item)){
        isNotEmpty = checkRequireInputs(item);
      }
      else if(!models.value[item.model]){
        isNotEmpty = false;
      }
    }
    return isNotEmpty;
  }

  const getTotalItems = () =>{
    return cartItems.value.reduce((a,b)=> a+b.quantity ,0)
  }

  const continueToPayment = async () =>{
    if(!checkRequireInputs(deliveryInputs)){
      setAlert({title:"Please Fill In The Mandatory Fields",type:'warning'});
      return;
    }
    
    await customHttp(200);

    localStorage.setItem('taxId',JSON.stringify(generateTaxId(16)));

    router.push('/checkout/confirmation');
  }
  const getImage = (item) =>{
    return item?.images[item?.randomImageIndex || 0] || ''
  }

  const getSubTotal = computed(() => {
    return cartItems.value.reduce((a,b) => a + parseFloat((b.quantity * b.item.price).toFixed(2)) ,0)
  })

  const calculateDelivery = computed(()=>{
    let totalOldPrice = cartItems.value.reduce((a,b) => a + parseFloat(b.item.oldPrice) ,0)
    let totalPrice = cartItems.value.reduce((a,b) => a + parseFloat(b.item.price) ,0)

    return parseFloat(((totalOldPrice - totalPrice) / (cartItems.value.length + 1)).toFixed(2))
  })

  const getGrandTotal = computed(()=>{
    return (getSubTotal.value + calculateDelivery.value)
  })
</script>

<template>
  <div class="checkout-wrapper container-main">
    <!-- //TODO kod tekrarından kurtul -->
    <div class="delivery-infos">
      <h3 class="delivery-header">Delivery Details</h3>
      <Divider/>
      <div class="delivery-inputs-wrapper">
        <template v-for="(item,i) in deliveryInputs" :key="'deliveryInputs'+i">
          <Input
            :inputId="'deliveryInputs'+i"
            class="delivery-input"
            v-if="!Array.isArray(item)"
            :type="item.type"
            rounded
            :label="item.title"
            v-model:model="models[item.model]"
            :required="item.require"
          />
          <div v-else class="row-inputs">
            <Input
              :inputId="'rowInput'+k"
              class="delivery-input"
              v-for="(rowInput,k) in item"
              :key="'rowInput'+k"
              :type="rowInput.type"
              rounded
              :label="rowInput.title"
              v-model:model="models[rowInput.model]"
              :required="rowInput.require"
            />
          </div>
        </template>
      </div>
      <h3 class="delivery-header">Delivery Details</h3>
      <Divider/>
      <div class="delivery-inputs-wrapper">
        <template v-for="(item,i) in additionalInputs" :key="'deliveryInputs'+i">
          <Input
            :inputId="'deliveryInputs'+i"
            class="delivery-input"
            v-if="!Array.isArray(item)"
            :type="item.type"
            rounded
            :label="item.title"
            v-model:model="models[item.model]"
            :required="item.require"
          />
          <div v-else class="row-inputs">
            <Input
              :inputId="'rowInput'+k"
              class="delivery-input"
              v-for="(rowInput,k) in item"
              :key="'rowInput'+k"
              :type="rowInput.type"
              rounded
              :label="rowInput.title"
              v-model:model="models[rowInput.model]"
              :required="rowInput.require"
            />
          </div>
        </template>
      </div>
      <Button
        title="Proceed to Payment"
        rounded
        padding="10px 0"
        @clickTrigger="continueToPayment"
      />
    </div>
    <div class="product-infos">
      <div class="info-area-header">
        <h3>Your Order Info</h3> <span class="count-info">{{getTotalItems()}} items</span>
      </div>
      <Cart
        v-for="(item,i) in cartItems"
        :key="'checkoutItem'+i + item.id"
        row
        hideEdit
        :image="getImage(item.item)"
        :brand="item.item.brand || ''"
        :title="item.item.title"
        :price="item.item.price"
        :quantity="item.quantity"
        :oldPrice="item.item.oldPrice || 0"
        :discount="item.item.discountPercentage || 1"
        :productId="item.item.id.toString()"
      />
      <div class="summary-info">
        <div class="sub-total price-info">
          <span class="title">Sub Total</span>
          <span class="price">{{priceFixer(getSubTotal)}}</span>
        </div>
        <div class="delivery-total price-info">
          <span class="title">Delivery</span>
          <span class="price">{{priceFixer(calculateDelivery)}}</span>
        </div>
        <div class="grand-total price-info">
          <span class="title">Total</span>
          <span class="price">{{priceFixer(getGrandTotal)}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.checkout-wrapper{
  @include d-flex(row,flex-start,flex-start);
  gap: 25px;
  @media screen and (max-width:768px) {
    flex-direction: column-reverse;
  }
  .delivery-infos{
    flex: 2 0 1px;
    @include d-flex(column,flex-start,stretch);
    @media screen and (max-width:768px) {
      width: 100%;
    }
    .delivery-header{
      color: $dark13;
      font-size: 18px;
      font-weight: 500;
      margin-top: 20px;
    }
    .delivery-inputs-wrapper{
      padding: 20px 0;
      @include d-flex(column,flex-start,stretch);
      gap: 15px;
      .row-inputs{
        gap: 15px;
        @include d-flex(row,flex-start,center);
      }
    }
  }
  .product-infos{
    flex: 1 0 1px;
    @include d-flex(column,flex-start,stretch);
    @media screen and (max-width:768px) {
      width: 100%;
    }
    .info-area-header{
      padding: 8px 0;
      border-bottom: 1px solid $white3;
      @include d-flex(row,space-between,center);
      .count-info{
        padding: 8px 0;
        font-size: 12px;
        font-weight: 500;
      }
    }
    
    .summary-info{
      border-top: 1px solid $white3;
      @include d-flex(column,flex-start,stretch);
      padding: 8px 0;
      .price-info{
        @include d-flex(row,space-between,center);
        padding: 8px 5px;
        .title{
          font-weight: 700;
          color: $dark13;
          font-size: 16px;
        }
        .price{
          font-size: 16px;
          font-weight: 500;
          color: $dark6;
        }
      }
      .grand-total{
        .title{
          font-weight: 700;
          color: $dark13;
          font-size: 22px;
        }
        .price{
          font-size: 22px;
          font-weight: 700;
          color: $dark10;
        }
      }
    }
  }
}
</style>