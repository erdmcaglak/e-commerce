<script setup>
import {ref} from 'vue';

definePageMeta({
  layout: false,
});


const { alert, setAlert } = inject('alert')
const router = useRouter();
const {setBasketItemCount} = inject('basketItemCount');

const taxId = ref('');


onMounted(()=>{
  if(!localStorage.getItem('taxId')){
    const tryTexts = [
      'Nope!',
      'You Are Funny',
      'Please Dont! Bilader',
      'Komik Değil DONT DO IT',
      'If You Do That Again, Bad Things Will Happen'
    ]
    let tryCount =0;
    if(localStorage.getItem('tryCount')){
      tryCount = parseInt(JSON.parse(localStorage.getItem('tryCount')))
    }
    if(tryTexts[tryCount]){
      setAlert({title:tryTexts[tryCount],type: tryCount === 3 ? 'danger' : 'warning'})
    }
    else{
      setAlert({title:tryTexts[0],type:'warning'})
      tryCount = 0;
      
    }
    tryCount++;
    localStorage.setItem('tryCount',JSON.stringify(tryCount))
    setTimeout(()=>{
      router.push('/');
    },1e3);
  }
  else{
    taxId.value = '#'+JSON.parse(localStorage.getItem('taxId'))
    localStorage.removeItem('taxId');
    localStorage.removeItem('tryCount');
    localStorage.removeItem('basket-items')
    setBasketItemCount();
  }
})

</script>

<template>
  <NuxtLayout name="confirm">
    <div class="confirm-page" v-if="taxId">
      <div class="thanks">
        <span class="big">Thank you!</span>
        <span>Your order has been successfully received.</span> 
        <span>{{taxId}}</span>
      </div>
      <div class="details">
        Your order details and tracking information have been sent to your registered email address. Please check your email for a comprehensive breakdown of your purchase, including itemized costs, shipping method, and expected delivery date. If you do not see the email in your inbox, please be sure to check your spam or junk folder.
      </div>
    </div>
  </NuxtLayout>
</template>

<style lang="scss">
.confirm-page{
  @include d-flex(column,flex-start,center);
  max-width: 700px;
  margin: 0 auto;
  gap: 30px;
  .thanks{
    font-size: 24px;
    font-weight: 700;
    text-align: center;
    @include d-flex(column,flex-start,center);
    .big{
      font-size: 36px;
    }
  }
  .details{
    font-size: 16px;
    font-weight: 500;
    text-align: center;
    color: $gray11;
  }
}
</style>