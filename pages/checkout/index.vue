<script setup>
  import {ref,watch} from 'vue'
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

  const continueToPayment = () =>{
    console.log('aaaaaa')
  }
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

    </div>
  </div>
</template>

<style lang="scss">
.checkout-wrapper{
  @include d-flex(row,flex-start,flex-start);
  gap: 15px;
  .delivery-infos{
    flex: 2 0 1px;
    @include d-flex(column,flex-start,stretch);
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
    border: 1px solid red;
    @include d-flex(column,flex-start,stretch);
  }
}
</style>