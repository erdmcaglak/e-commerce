<script setup>
  import {ref} from 'vue';
  import {computed} from 'vue';

  const props = defineProps({
    totalPages:{type:Number,default:1},
  })

  const page = defineModel('page');

  const emit = defineEmits(['update:page'])

  const goNext = () =>{
    if(page.value < props.totalPages){
      page.value++
    }
  }

  const goPrev = () =>{
    if(page.value > 1){
      page.value--
    }
  }

  const goToPage = (_page) =>{
    if(_page > 0 && _page <= props.totalPages){
      page.value = _page
    }
  }

  const getpaginationItemViewCondition = (i) =>{
    const rightDiff = page.value- 3 < 0 ? (2 + Math.abs(page.value -3)) : 2;
    const leftDiff = page.value +2 >= props.totalPages ? (2 + Math.abs(page.value +2 - props.totalPages)) : 2;

    return page.value-leftDiff<=i && page.value+rightDiff >= i;
  }

</script>


<template>
  <div class="pagination-wrapper">
    <div @click="goPrev" v-if="page !== 1 && props.totalPages" class="prev pagination-item">
      <Icon name="mdi:keyboard-arrow-left" size="28" color="#6D6D6D"/>
    </div>
    <div class="pagination-pages">
      <template v-for="i in props.totalPages" :key="'paginationItem'+i">
        <div v-if="getpaginationItemViewCondition(i)" :class="['pagination-item', page === i ? 'selected-pagination-item' : '']" @click="goToPage(i)">
          {{i}}
        </div>
      </template>
    </div>
    <div @click="goNext" v-if="props.totalPages!== 1" class="next pagination-item">
      <Icon name="mdi:keyboard-arrow-right" size="28" color="#6D6D6D"/>
    </div>
  </div>
</template>

<style lang="scss">
  .pagination-wrapper{
    @include d-flex-center;
    gap: 10px;
    .prev,.next{
      &:hover{
        background-color: transparent!important;
        box-shadow: 0 0 4px $gray11;
      }
    }
    .pagination-item{
      border: 1px solid $gray11;
      color: $gray15;
      border-radius: 4px;
      font-weight: 600;
      width:35px;
      height: 35px;
      @include d-flex-center;
      user-select: none;
      cursor: pointer;
      position: relative;
      &:hover{
        background-color: $gray11;
        color: $white1;
        box-shadow: 0 0 4px $gray11;
      }
    }
    .selected-pagination-item{
      background-color: $gray11;
      color: $white1;
      box-shadow: 0 0 4px $gray11;
    }
    .pagination-pages{
      @include d-flex-center;
      gap: 10px;
    }
  }
</style>